var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    author: {
     id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
     },  
     username: String
    },
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
