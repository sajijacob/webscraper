var moment = require("moment");

var mongoose = require('mongoose');

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Article Schema
var ArticleSchema = new Schema({
    //Title of Article
    title:{
        type: String,
        required: true
    },

    // Link to the article

    link:{
        type: String,
        require: true
    },

    //Summary of Article
    summary:{
        type: String,
        required: true
    },
    // Date of the article

    updated: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm A')
    },

    // Create a relation with the Comment

    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

//create the article modal with Mongoose

var Article = mongoose.modelNames('Article', ArticleSchema)

//export the Modal

module.exports = Article;
