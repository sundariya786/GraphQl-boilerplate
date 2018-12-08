import * as db from './../../models/index';

export const mutations = `
    #### A mutation for  add Product
    addProduct(name: String!, image: String!, price: Int!, discount: Int, categoryId: String!, createdAt: String, createdBy: String ): Product

    #### A mutation to update the Product
    updateProduct(id: String!, name: String, image: String, price: Int, discount: Int, categoryId: String, createdAt: String, createdBy: String ): Product

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