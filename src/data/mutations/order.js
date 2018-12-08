import * as db from './../../models/index';
// import InputType from './inputTypes';
export const mutations = `

    #### A mutation for  add order.
    # Here are the list of parameters:
    #
    # ** orderId ** : * orderid *,
    #
    # ** amount **: * amount *
    #
    # ** createdAt **: * createdAt *
    #
    # ** createdBy **: * createdBy *
    addOrder(orderId: String!, amount: String, productId: String!, createdAt: String!, createdBy: String): Order,

    #### A mutation to update the order
    # Here are the list of parameters:
    #
    # ** id ** : * id *,
    #
    # ** orderId ** : * orderid *,
    #
    # ** amount **: * amount *
    #
    # ** createdAt **: * createdAt *
    #
    # ** createdBy **: * createdBy *
    updateOrder(id: String!, orderId: String, amount: String, productId: String, createAt: String, createdBy: String): Order

    #### A mutation to delete the order
    # pass the order id  of the order 
    #
    # **id**: *order id  to be delete*
    deleteOrder(id: String!): Order

`;

export const resolvers = {
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
};