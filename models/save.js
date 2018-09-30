// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var SaveSchema = new Schema({
  // title is a required string
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

// Create the Save model with the SaveSchema
var Save = mongoose.model("Save", SaveSchema);

// Export the model
module.exports = Save;