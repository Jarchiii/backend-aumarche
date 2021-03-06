const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    seller : {
        type : Schema.Types.ObjectId,
        ref : "Seller"
    },
    foodType : {
        type : String,
        enum : ["Fruit", "Légume"], 
        required: true,

    },
    description :  {
        type: String,
        required : true
    },
    price :  {
        type: Number,
        required : true
    },
});
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
