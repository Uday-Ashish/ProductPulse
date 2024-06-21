const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title:{
        type : String,
        required:true
    },
    subhead:{
        type: String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    pictureLink:{
        type: String,
        required:true
    }
} , {timestamps : true } );

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;


