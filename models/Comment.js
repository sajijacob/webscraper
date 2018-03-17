// require Mongoose

var mongoose = require('mongoose');
//create schema

var Schema = mongoose.Schema;

//create comment Schema


var CommentSchema = new Schema({
    // Authors name
    author: {
        type: String
    },
    contenet: {
        type: String
    }
});

var Comment = mongoose.model('Comment', CommentSchema);
// export the model

module.exports = Comment;