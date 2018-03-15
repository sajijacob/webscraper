// require Mongoose

var require = require('mongoose');
//create schema

var schema = Mongoose.Schema;

//create comment Schema

var CommentSchema = new schema({
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