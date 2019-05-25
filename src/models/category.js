let mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    id: String,
    categoryId: String,
    categoryName: String,
    createdAt: String,
    createdBy: String,
});

const Category = mongoose.model('categories', CategorySchema);
export default Category;