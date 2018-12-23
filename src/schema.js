import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';
import {MergedSchema, MergedResolvers} from './data';
// import resolvers from './resolvers';
// const typeDefs = `
//     type Query {
//       ### Query to  find all the user
//       allUsers: [User]
//       ### Query to find specific user
//       user(_id: String): [User]
//       ### Query to find  all the user
//       allOrders: [Order]
//       ### Query to find all category
//       allCategorys: [Category]
//       ### Query to find  all the product
//       allProducts: [Product]

//     }
//     type Mutation {
//       # A mutation to add a new user
//       addUser(name: String!, surname: String!): User,
//       # a mutation to delete user
//       deleteUser(id: String!): User,
//       # a mutation to update a user 
//       updateUser(id: String!, name: String, surname: String): User

//       # A mutation to create order update order
//       addOrder(orderId: String!, amount: String, createdAt: String!, createdBy: String): Order,
//       # A mutation to update the  order
//       updateOrder(id: String!, orderId: String, amount: String, createAt: String, createdBy: String): Order,
//       # A mutation to delete order
//       deleteOrder(id: String!): Order,

//       #### A mutation for  add Product
//       addProduct(name: String!, imageURL: String!, description: String, inStock: Boolean, popular: Boolean, price: Int!, discount: Int, categoryId: String!, createdAt: String, createdBy: String ): Product

//       #### A mutation to update the Product
//       updateProduct(id: String!, name: String, imageURL: String!, description: String, inStock: Boolean, popular: Boolean, price: Int, discount: Int, categoryId: String, createdAt: String, createdBy: String ): Product

//       #### A mutation to delete the Product
//       # pass the Product id  of the Product 
//       #
//       # **id**: *Product id  to be delete*,
//       deleteProduct(id: String!): Product
//     }
//     type Subscription {
//       liveProduct: Product
//     }
//     type User {
//         _id: String,
//         name: String,
//         surname: String
//     }
//     type Order {
//       id: String,
//       orderId: String,
//       amount: String,
//       createdAt: String,
//       createdBy: String,
//       users: [User]
//     }
//     type Product {
//       id: String,
//       name: String,
//       imageURL: String,
//       description: String,
//       price: Int,
//       discount: Int,
//       inStock: Boolean,
//       popular: Boolean,
//       categoryId: String,
//       createdAt: String,
//       createdBy: String,
//     }
//     type Category {
//       id: String,
//       categoryId: String,
//       categoryName: String,
//       createdAt: String,
//       createdBy: String,
//     }
// `;

// console.log(',erge schema is  the  : ', MergedSchema);
// console.log(',erge resolver  is  the  : ', MergedResolvers);

const schema = makeExecutableSchema({
  typeDefs: MergedSchema, 
  resolvers: MergedResolvers,
});
// const schema = makeExecutableSchema({
//   typeDefs, 
//   resolvers,
// });
export default schema;
