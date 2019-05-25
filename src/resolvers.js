// import {User} from './models/users';
import * as db from './models/index'
import {pubsub} from './pubsub';

const resolvers = {
    Order: {
        id: ({ _id }) => _id,
        async users({}){
            return await db.User.find();
        }
    },
    Query: {
        allUsers() {
          return db.User.find({});
        },
        async user(_, args){
            const user = await db.User.findById({_id: args._id});
            return [user];
        },

        async allOrders() {
            const orders = await db.Order.find();
            return orders;
        },
        async allCategorys(_, args){
            const categories = await db.Category.find();
            console.log('categoty ', categories);
            return categories; 
        },
        async allProducts(_, args) {
            const products = await db.Product.find();
            return products;
        },

    },
    Mutation: {
        async addUser(_, args) {
            console.log('args', args);
            const insertStatement = {
                name: args.name,
                surname: args.surname,
            };
            const user = await db.User.create(insertStatement)
            return user;
        },
        deleteUser(_, args) {
            return User.deleteOne({_id: args.id});
        },
        updateUser(_, args) {
            let _tempUser = Object.assign({}, args);
            delete _tempUser.id;
            return User.updateOne({_id: args.id},{$set: _tempUser});
        },
        async addOrder(_, args) {
            const insertStatement = {
                orderId: args.orderId,
                amount: args.amount,
                createdAt: args.createdAt,
                createdBy: args.createdBy,
            };
            const orders = await db.Order.create(insertStatement)
            return orders;
        },
        async addProduct(_, args) {
            let tempProduct = Object.assign({}, args);
            const product = await db.Product.create(tempProduct);
            pubsub.publish(
                'NEW_PRODUCT_ADDED',
                {liveProduct: product});
                // { liveProduct: { type: 'ADDED_PRODUCT', product: product } });
            return product;
        },
        async deleteProduct(_, args) {
            return await db.Product.deleteOne({_id: args.id});
        },
        async updateProduct(_, args) {
            let _tempCategory = Object.assign({}, args);
            delete _tempUser.id;
            return await db.Product.updateOne({_id: args.id},{$set: _tempCategory});
        },
    },
    Subscription : {
        liveProduct: {
            subscribe: () => pubsub.asyncIterator('NEW_PRODUCT_ADDED')
            // subscribe: withFilter(() => pubsub.asyncIterator(Types.NEW_PRODUCT_ADDED), (payload, vars, context) => {
            //     console.log( 'subscription');
            //     console.log('payload', payload);
    
            // }),
        },
    }
    

};

export default resolvers;