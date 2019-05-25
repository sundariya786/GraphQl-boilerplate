import * as db from './../../models/index';

export const schema = `

    # All category  information 
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
  
`;

export const resolvers = {
    Product: {
        id: ({ _id }) => _id,
        async category({categoryId}){
            const category =  await db.Category.findOne({ categoryId: categoryId });
            console.log('categotr y', category);
            return category;
        }
        // categoryId: ({ category_id }) => category_id,
    }
}