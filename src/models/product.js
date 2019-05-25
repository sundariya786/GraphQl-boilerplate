let mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    imageURL: String,
    price: Number,
    description: String,
    inStock: Boolean,
    popular: Boolean,
    discount: Number,
    categoryId: String,
    createdAt: String,
    createdBy: String,
});

const Product = mongoose.model('products', ProductSchema);
export default Product;