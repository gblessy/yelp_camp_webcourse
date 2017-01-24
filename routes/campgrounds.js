var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", function (req, res) {
    //Get Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds});  
        }
    })
})


//CREATE ROUTE
router.post("/", middleware.isLoggedIn,function(req, res){
    //get data from form and add to campgrounds array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: req.body.name,
        price: req.body.price,
        image:req.body.image,
        description:req.body.description,
        author: author
        
    }
    //Create new campground and add it to db
    Campground.create(newCampground, function(err, newlyCampground){
        if(err){
            console.log(err);
        } else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");        
        }
    })
})

//NEW ROUTE
router.get("/new", middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
})

//SHOW ROUTE
router.get("/:id", function(req, res) {
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            //render template with this campground
            res.render("campgrounds/show", {campground: foundCampground});
            }
        })
    })
    
    
    
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res) {
            Campground.findById(req.params.id, function(err, foundCampground){
                
                    res.render("campgrounds/edit", {campground: foundCampground});
        })
  
    
    //otherwise redirect
    //if no, redirect
    
})

//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req, res){
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/")
        } else {
             //redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
   
})


//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})


module.exports = router;