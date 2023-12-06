import mongoose, { Schema } from "mongoose";

mongoose.pluralize(null);

const collection = "products";

const schema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: false },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: false},
    code: { type: String, require: true },
    stock: { type: Number, require: true },

});

export default mongoose.model(collection, schema);