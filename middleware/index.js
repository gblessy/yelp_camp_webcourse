//All the middleware goes here
var middlewareObj ={};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //does user own campground.
            Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("errror", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                   next()
                } else {
                    req.flash("You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do this")
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //does user own campground.
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                   next()
                } else {
                    req.flash("error", "You don't have a permission to do that")
                    res.redirect("back");
                }
                
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do this");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;