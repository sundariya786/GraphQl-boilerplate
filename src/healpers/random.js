// We use cryptographically strong PRNGs (crypto.getRandomBytes() on the server,
// window.crypto.getRandomValues() in the browser) when available. If these
// PRNGs fail, we fall back to the Alea PRNG, which is not cryptographically
// strong, and we seed it with various sources such as the date, Math.random,
// and window size on the client.  When using crypto.getRandomValues(), our
// primitive is hexString(), from which we construct fraction(). When using
// window.crypto.getRandomValues() or alea, the primitive is fraction and we use
// that to construct hex string.

const nodeCrypto = require('crypto');

// see http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
// for a full discussion and Alea implementation.
const Alea = function () {
    function Mash() {
        let n = 0xefc8249d;

        const mash = function (data) {
            data = data.toString();
            for (var i = 0; i < data.length; i++) {
                n += data.charCodeAt(i);
                let h = 0.02519603282416938 * n;
                n     = h >>> 0;
                h -= n;
                h *= n;
                n     = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };

        mash.version = 'Mash 0.9';
        return mash;
    }

    return (function (args) {
        let s0 = 0;
        let s1 = 0;
        let s2 = 0;
        let c  = 1;

        if (args.length == 0) {
            args = [+new Date()];
        }
        let mash = Mash();
        s0       = mash(' ');
        s1       = mash(' ');
        s2       = mash(' ');

        for (var i = 0; i < args.length; i++) {
            s0 -= mash(args[i]);
            if (s0 < 0) {
                s0 += 1;
            }
            s1 -= mash(args[i]);
            if (s1 < 0) {
                s1 += 1;
            }
            s2 -= mash(args[i]);
            if (s2 < 0) {
                s2 += 1;
            }
        }
        mash = null;

        const random     = function () {
            const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
            s0    = s1;
            s1    = s2;
            return s2 = t - (c = t | 0);
        };
        random.uint32  = function () {
            return random() * 0x100000000; // 2^32
        };
        random.fract53 = function () {
            return random() +
                   (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
        };
        random.version = 'Alea 0.9';
        random.args    = args;
        return random;
    }(Array.prototype.slice.call(arguments)));
};

const UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';
const BASE64_CHARS       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                         '0123456789-_';

// If seeds are provided, then the alea PRNG will be used, since cryptographic
// PRNGs (Node crypto and window.crypto.getRandomValues) don't allow us to
// specify seeds. The caller is responsible for making sure to provide a seed
// for alea if a csprng is not available.
class RandomGenerator {
    constructor(seedArray = undefined) {
        if (seedArray !== undefined) this.alea = Alea(...seedArray);
        this.fraction      = this.fraction.bind(this);
        this.hexString     = this.hexString.bind(this);
        this._randomString = this._randomString.bind(this);
        this.id            = this.id.bind(this);
        this.secret        = this.secret.bind(this);
        this.choice        = this.choice.bind(this);
    }

    fraction() {
        if (this.alea) {
            return this.alea();
        } else if (nodeCrypto) {
            const numerator = parseInt(this.hexString(8), 16);
            return numerator * 2.3283064365386963e-10; // 2^-32
        } else if (typeof window !== 'undefined' && window.crypto &&
                   window.crypto.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] * 2.3283064365386963e-10; // 2^-32
        } throw new Error('No random generator available');
    }

    hexString(digits) {
        if (nodeCrypto && !this.alea) {
            const numBytes = Math.ceil(digits / 2);
            let bytes;
            // Try to get cryptographically strong randomness. Fall back to
            // non-cryptographically strong if not available.
            try {
                bytes = nodeCrypto.randomBytes(numBytes);
            } catch (e) {
                // XXX should re-throw any error except insufficient entropy
                bytes = nodeCrypto.pseudoRandomBytes(numBytes);
            }
            const result = bytes.toString('hex');
            // If the number of digits is odd, we'll have generated an extra 4 bits
            // of randomness, so we need to trim the last digit.
            return result.substring(0, digits);
        }
        const hexDigits = [];
        for (var i = 0; i < digits; ++i) {
            hexDigits.push(this.choice('0123456789abcdef'));
        }
        return hexDigits.join('');
    }

    _randomString(charsCount, alphabet) {
        const self   = this;
        const digits = [];
        for (var i = 0; i < charsCount; i++) {
            digits[i] = self.choice(alphabet);
        }
        return digits.join('');
    }

    id(charsCount) {
        const self = this;
        // 17 characters is around 96 bits of entropy, which is the amount of
        // state in the Alea PRNG.
        if (charsCount === undefined)            { charsCount = 17; }

        return this._randomString(charsCount, UNMISTAKABLE_CHARS);
    }

    secret(charsCount) {
        const self = this;
        // Default to 256 bits of entropy, or 43 characters at 6 bits per
        // character.
        if (charsCount === undefined)            { charsCount = 43; }
        return self._randomString(charsCount, BASE64_CHARS);
    }

    choice(arrayOrString) {
        const index = Math.floor(this.fraction() * arrayOrString.length);
        if (typeof arrayOrString === 'string')            { return arrayOrString.substr(index, 1); }
        return arrayOrString[index];
    }
}

// instantiate RNG.  Heuristically collect entropy from various sources when a
// cryptographic PRNG isn't available.

// client sources
const height = (typeof window !== 'undefined' && window.innerHeight) ||
             (typeof document !== 'undefined'
              && document.documentElement
              && document.documentElement.clientHeight) ||
             (typeof document !== 'undefined'
              && document.body
              && document.body.clientHeight) ||
             1;

const width = (typeof window !== 'undefined' && window.innerWidth) ||
            (typeof document !== 'undefined'
             && document.documentElement
             && document.documentElement.clientWidth) ||
            (typeof document !== 'undefined'
             && document.body
             && document.body.clientWidth) ||
            1;

const agent = (typeof navigator !== 'undefined' && navigator.userAgent) || '';

if (nodeCrypto ||
    (typeof window !== 'undefined' &&
     window.crypto && window.crypto.getRandomValues))    { module.exports = new RandomGenerator(); } else    { module.exports = new RandomGenerator([new Date(), height, width, agent, Math.random()]); }

module.exports.createWithSeeds = function () {
    if (arguments.length === 0) {
        throw new Error('No seeds were provided');
    }
    return new RandomGenerator(arguments);
};
