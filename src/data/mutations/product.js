import * as db from './../../models/index';
import {pubsub} from '../../pubsub';
// import { Types as SubscriptionTypes } from '../subscriptions/subs';


export const mutations = `
    #### A mutation for  add Product
    addProduct(name: String!, imageURL: String!, description: String, inStock: Boolean, popular: Boolean, price: Int!, discount: Int, categoryId: String!, createdAt: String, createdBy: String ): Product

    #### A mutation to update the Product
    updateProduct(id: String!, name: String, imageURL: String!, description: String, inStock: Boolean, popular: Boolean, price: Int, discount: Int, categoryId: String, createdAt: String, createdBy: String ): Product

    #### A mutation to delete the Product
    # pass the Product id  of the Product 
    #
    # **id**: *Product id  to be delete*,
    deleteProduct(id: String!): Product

`;

export const resolvers = {
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
}