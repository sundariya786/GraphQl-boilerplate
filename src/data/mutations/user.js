import * as db from './../../models/index';
import { User } from '../../methods';
// import InputType from './inputTypes';
export const mutations = `

    #### A mutation for  add user.
    # Here are the list of parameters:
    #
    # ** name ** : * Name of the user *,
    #
    # ** surname **: * Surname of the user *
    addUser(firstName: String!, lastName: String, city: String, zip: Int!, games: [String], followers: [String], password: String!, mobileNum: Int, userName: String!, email: String, roles: [String], status: String, online: Boolean!, disabled: Boolean!): User

    #### A mutation to update the user
    # Pass the  user  id to  update  the user 
    #
    # **id**: *Unique user  id  of the user*,
    updateUser(id: String!, name: String, surname: String): User

    #### A mutation to delete the user
    # pass the user id  of the user 
    #
    # **id**: *user id  to be delete*,
    deleteUser(id: String!): String

    #### A mutation to login the user
    # pass the user username or  email  of the user 
    #
    # **userName**: *user name  of  user*
    # **password**: *password  of  user*
    login(userName: String!, password: String!): User

`;

export const resolvers = {
    async addUser(root, {firstName, lastName, city, zip, games, followers, password, mobileNum, userName, email, roles, status, online, disabled}) {
        return await User.add({firstName, lastName, city, zip, games, followers, password, mobileNum, userName, email, roles, status, online, disabled});
    },
    async deleteUser(_, args) {
        await db.User.deleteOne({_id: args.id});
        return "user  successfully  deleted "
    },
    async updateUser(_, args) {
        let _tempUser = Object.assign({}, args);
        delete _tempUser.id;
        return await db.User.updateOne({_id: args.id},{$set: _tempUser});
    },

    async login(_, {userName, password }){
        return User.login({userName, password})
    }
}