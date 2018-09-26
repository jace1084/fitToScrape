var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var comments = require("./Comments");

console.log('Running mongoose version: ', mongoose.version);
 
const ArticleSchema = mongoose.Schema({
    
    headline: {
        type: String,
    },
    link: {
        type: String,
    },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comments' }],
    date:   {  
        type: Date, 
        default: Date.now  
    },
    location: {
        type: String,
    }
});


console.log('ArticleSchema created!');

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
