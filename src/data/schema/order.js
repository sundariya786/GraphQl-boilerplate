import * as db from './../../models/index';
import InputType from './inputTypes';

export const schema = `

    # All user  information 
    type Order {
        id: String,
        orderId: String,
        amount: String,
        productId: String,
        createdAt: String,
        createdBy: String,
        product: [Product]
    }
`;

export const resolvers = {
    Order: {
        id: ({ _id }) => _id,
        async product({productId}){
            const product =  await db.Product.find({_id: productId});
            return product;
        }
    }
}
