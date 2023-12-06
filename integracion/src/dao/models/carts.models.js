import mongoose, { Schema } from "mongoose";

mongoose.pluralize(null);

const collection = "carts";

const schema = new Schema({
    products:[]
});

export default mongoose.model(collection, schema);