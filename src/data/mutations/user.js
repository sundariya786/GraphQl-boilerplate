import * as db from './../../models/index';
// import InputType from './inputTypes';
export const mutations = `

    #### A mutation for  add user.
    # Here are the list of parameters:
    #
    # ** name ** : * Name of the user *,
    #
    # ** surname **: * Surname of the user *
    addUser(name: String!, surname: String!): User

    #### A mutation to update the user
    # Pass the  user  id to  update  the user 
    #
    # **id**: *Unique user  id  of the user*,
    updateUser(id: String!, name: String, surname: String): User

    #### A mutation to delete the user
    # pass the user id  of the user 
    #
    # **id**: *user id  to be delete*,
    deleteUser(id: String!): User

`;

export const resolvers = {
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
}