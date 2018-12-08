import * as db from './../../models/index';

export const mutations = `

    #### A mutation for  add Category.
    # Here are the list of parameters:
    #
    # ** categoryName ** : * Name of the category *,
    #
    # ** createdAt **: * createdAt *
    #
    # ** createdBy **: * createdBy *
    addCategory(categoryName: String!, categoryId: String!, createdAt: String!, createdBy: String! ): Category

    #### A mutation to update the user
    # Pass the  user  id to  update  the user 
    #
    # **id**: *Unique user  id  of the Category*,
    #
    # ** categoryName **: * name of the category *,
    #
    # ** createdAt ** : * created at of  category *,
    # 
    # ** createdBy ** : * createdBy of the category *,
    updateCategory(id: String!, categoryName: String,categoryId: String, createdAt: String, createdBy: String): Category

    #### A mutation to delete the user
    # pass the user id  of the user 
    #
    # **id**: *category id  to be delete*,
    deleteCategory(id: String!): Category

`;

export const resolvers = {
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
}