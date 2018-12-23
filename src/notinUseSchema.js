import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';

import resolvers from './resolvers';
const typeDefs = `
    type Query {
      ### Query to  find all the user
      allUsers: [User]
      ### Query to find specific user
      user(_id: String): [User]
      ### Query to find  all the user
      allOrders: [Order]
    }
    type Mutation {
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

      #### A mutation for  add Product
      addProduct(name: String!, imageURL: String!, description: String, inStock: Boolean, popular: Boolean, price: Int!, discount: Int, categoryId: String!, createdAt: String, createdBy: String ): Product

      #### A mutation to update the Product
      updateProduct(id: String!, name: String, imageURL: String!, description: String, inStock: Boolean, popular: Boolean, price: Int, discount: Int, categoryId: String, createdAt: String, createdBy: String ): Product

      #### A mutation to delete the Product
      # pass the Product id  of the Product 
      #
      # **id**: *Product id  to be delete*,
      deleteProduct(id: String!): Product

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
    }
    type Subscription {
      liveProduct: Product
    }
    type User {
        _id: String,
        name: String,
        surname: String
    }
    type Order {
      id: String,
      orderId: String,
      amount: String,
      createdAt: String,
      createdBy: String,
      Product: [Product]
    }
    type Product {
      id: String,
      name: String,
      imageURL: String,
      description: String,
      price: Int,
      discount: Int,
      inStock: Boolean,
      popular: Boolean,
      categoryId: String,
      category: Category,
      createdAt: String,
      createdBy: String,
    }
    type Category {
      id: String,
      categoryId: String,
      categoryName: String,
      createdAt: String,
      createdBy: String,
      Product: [Product]
    }
`;

// console.log(',erge schema is  the  : ', MergedSchema);
// console.log(',erge resolver  is  the  : ', MergedResolvers);
// import {MergedSchema, MergedResolvers} from './data';

const schema = makeExecutableSchema({
  typeDefs, 
  resolvers,
});

// const schema = makeExecutableSchema({
//   typeDefs: MergedSchema, 
//   resolvers: MergedResolvers,
// });
export default schema;
