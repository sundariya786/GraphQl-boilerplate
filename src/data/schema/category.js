import * as db from './../../models/index';

export const schema = `

    # All category  information 
    type Category {
        id: String,
        categoryId: String,
        categoryName: String,
        createdAt: String,
        createdBy: String,
        Product: [Product]
    }
`;

export const resolvers = {
    Category: {
        id: ({ _id }) => _id,
        async Product({categoryId}){
            const product =  await db.Product.find({categoryId: categoryId});
            return product
        }
    }
}