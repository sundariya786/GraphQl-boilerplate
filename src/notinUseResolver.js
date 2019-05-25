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
    Order: {
        id: ({ _id }) => _id,
        async product({productId}){
            const product =  await db.Product.find({_id: productId});
            return product;
        }
    },
    Category: {
        id: ({ _id }) => _id,
        async Product({categoryId}){
            const product =  await db.Product.find({categoryId: categoryId});
            return product
        }
    },
    Product: {
        id: ({ _id }) => _id,
        async category({categoryId}){
            const category =  await db.Category.findOne({ categoryId: categoryId });
            console.log('categotr y', category);
            return category;
        }
        // categoryId: ({ category_id }) => category_id,
    },
    User: {
        id: ({ _id }) => _id,
    },

    Query: {
        async allUsers( _, args, {}) {
            return await db.User.find({});
        },

        async user(_, args, {}) {
            const user = await db.User.findById({_id: args._id});
            return [user];
        },

        async allOrders(_, args, {}) {
            const orders = await db.Order.find();
            return orders;
        },

        async allProducts(_, args, {}) {
            const products = await db.Product.find();
            return products;
        },

        async allCategorys(_, args, {}){
            const categories = await db.Category.find();
            return categories; 
        }
    },
    Mutation: {
        async addUser(_, args) {
            const insertStatement = {
                name: args.name,
                surname: args.surname,
            };
            const user = await db.User.create(insertStatement)
            return user;
        },
        async deleteUser(_, args) {
            return await db.User.deleteOne({_id: args.id});
        },
        async updateUser(_, args) {
            let _tempUser = Object.assign({}, args);
            delete _tempUser.id;
            return await db.User.updateOne({_id: args.id},{$set: _tempUser});
        },

        async addOrder(_, args) {
            let tempOrder = Object.assign({}, args);
            const orders = await db.Order.create(tempOrder)
            return orders;
        },
    
        async deleteOrder(_, args) {
            return await db.Order.deleteOne({_id: args.id});
        },
        async updateOrder(_, args) {
            let _tempUser = Object.assign({}, args);
            delete _tempUser.id;
            return await db.Order.updateOne({_id: args.id},{$set: _tempUser});
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

        async addCategory(_, args) {
            let tempCategory = Object.assign({}, args);
          
            const category = await db.Category.create(tempCategory);
            return category;
        },
        async deleteCategory(_, args) {
            return await db.Category.deleteOne({_id: args.id});
        },
        async updateCategory(_, args) {
            let _tempCategory = Object.assign({}, args);
            delete _tempUser.id;
            return await db.User.updateOne({_id: args.id},{$set: _tempCategory});
        },
    },
    Subscription: {
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