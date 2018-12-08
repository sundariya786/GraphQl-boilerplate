import * as db from './../../models/index';

export const schema = `

    # All category  information 
    type Product {
        id: String,
        name: String,
        image: String,
        price: Int,
        discount: Int,
        categoryId: String,
        createdAt: String,
        createdBy: String,
    }
`;

export const resolvers = {
    Product: {
        id: ({ _id }) => _id,
        // categoryId: ({ category_id }) => category_id,
    }
}