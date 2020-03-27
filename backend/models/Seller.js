const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
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
    coverPic : {
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
    description : {
        type : String,
        required : true
    },
    ranking : {
        type : [Number],
    },
    availableProduct : {
       type : [Schema.Types.ObjectId],
        ref : "Product"
    }
});
const sellerModel = mongoose.model("Seller", sellerSchema);

module.exports = sellerModel;