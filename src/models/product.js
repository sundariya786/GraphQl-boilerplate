let mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    discount: Number,
    categoryId: String,
    createdAt: String,
    createdBy: String,
});

const Product = mongoose.model('products', ProductSchema);
export default Product;