const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyer : {
        type : Schema.Types.ObjectId],
        ref : "User"
    },
    buyer : {
        type : Schema.Types.ObjectId],
        ref : "Seller"
    },
  purchasedProduct : {
        type : [Schema.Types.ObjectId],
        ref : "Product"
    },
    Price : {
        type : Number,
    },
    city : {
        type : String,
        enum : ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Lille", "Nantes"],
        required : true
    },
    street : {
        type : String,
        required : true
    },
    streetNb: {
        type : String,
        required : true
    },
    dayHour: {
        type: Date,
        required: true
    },
    status : {
        Type : String,
        enum : ["Dans le panier", "En cours de préparation","A récuperer", "Livré"],
        required : true,
        default : "Dans le panier"
    }
});

const orderModel = mongoose.model("Order", userSchema);

module.exports = orderModel;


    