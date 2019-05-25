import * as User from './user';
import * as Order from './order';
import * as Product from './product';
import * as Category from './category';
import * as  Game from './game';
import * as  City from './city';
import * as Ground from './ground';

export const MutationDefinition =`

    type Mutations {
        ${User.mutations}
        ${Order.mutations}
        ${Product.mutations}
        ${Category.mutations}
        ${Game.mutations}
        ${City.mutations}
        ${Ground.mutations}
    }
`;

export default {
    User,
    Order,
    Product,
    Category,
    Game,
    City,
    Ground
};