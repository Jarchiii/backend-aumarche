const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
        firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      mail: {
        type: String,
        required: true
      },
      password : {
          type : String,
          required : true
      },
      admin : {
          type : Boolean,
          default : true
      },
      avatar : {
          type: String
      },
      birthDate : {
          type : Date,
          required : true
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
      panier : {
          type : [Schema.Types.ObjectId],
          ref : "Product"
      },
      pastOrders : {
        type : [Schema.Types.ObjectId],
        ref : "Order"
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;