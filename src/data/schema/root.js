import * as db from './../../models/index';
import InputType from './inputTypes';

export const schema = `

    # Root queries to  head the information 
    type Query {
        ### Query to  find all the user
        allUsers: [User]

        ### Query to find specific user
        user(_id: String): [User]

        ### Query to find  all the user
        allOrders: [Order]

        ### Query to find  all the product
        allProducts: [Product]

        ### Query to find all category
        allCategorys: [Category]
    }
`;

export const resolvers = {
    Query: {
        async allUsers( _, args) {
            return await db.User.find({});
        },

        async user(_, args) {
            const user = await db.User.findById({_id: args._id});
            return [user];
        },

        async allOrders(_, args) {
            const orders = await db.Order.find();
            return orders;
        },

        async allProducts(_, args) {
            const products = await db.Product.find();
            return products;
        },

        async allCategorys(_, args){
            const categories = await db.Category.find();
            return categories; 
        }
    },
};
