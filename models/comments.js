var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Article = require("./article");


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

var Note = mongoose.model('Note', CommentSchema);

module.exports = comments;
