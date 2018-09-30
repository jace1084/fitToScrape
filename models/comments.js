var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var article = require("./Article");


console.log('Running Mongoose Version: ', mongoose.version);
 
const CommentSchema = mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    article: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    date: {
        type: Date
    }
});


console.log('CommentSchema created!');

var Comments = mongoose.model('Note', CommentSchema);

module.exports = Comments;
