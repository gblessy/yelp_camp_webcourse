var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm9.staticflickr.com/8525/8581057667_a8bb0983b3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at egestas ipsum, sed suscipit metus. Sed justo libero, tempor in ultricies id, ornare a neque. Vivamus lacinia facilisis urna, id laoreet ligula vulputate eu. Maecenas lacinia tellus eget pretium dictum. Pellentesque non mauris ut nunc eleifend condimentum a nec massa. Proin vestibulum dolor eu arcu fringilla, nec tempor est lobortis. Nunc interdum, nulla ut laoreet semper, arcu sapien lacinia ligula, imperdiet efficitur diam erat et est. Etiam eu dolor sit amet felis aliquet ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius felis sed leo egestas, eget eleifend dolor convallis. Donec dignissim justo nec risus tincidunt dictum. Etiam vel nunc leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas laoreet placerat ligula ullamcorper dictum. Fusce pharetra nibh sed arcu aliquet, a eleifend nunc pellentesque. "
    },
    {
        name: "Vlads's Rest",
        image: "https://farm9.staticflickr.com/8870/27998209364_612a74976f.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at egestas ipsum, sed suscipit metus. Sed justo libero, tempor in ultricies id, ornare a neque. Vivamus lacinia facilisis urna, id laoreet ligula vulputate eu. Maecenas lacinia tellus eget pretium dictum. Pellentesque non mauris ut nunc eleifend condimentum a nec massa. Proin vestibulum dolor eu arcu fringilla, nec tempor est lobortis. Nunc interdum, nulla ut laoreet semper, arcu sapien lacinia ligula, imperdiet efficitur diam erat et est. Etiam eu dolor sit amet felis aliquet ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius felis sed leo egestas, eget eleifend dolor convallis. Donec dignissim justo nec risus tincidunt dictum. Etiam vel nunc leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas laoreet placerat ligula ullamcorper dictum. Fusce pharetra nibh sed arcu aliquet, a eleifend nunc pellentesque. "
    },
    {
        name: "Zhannas's Rest",
        image: "https://farm5.staticflickr.com/4130/5093997019_988e291be2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at egestas ipsum, sed suscipit metus. Sed justo libero, tempor in ultricies id, ornare a neque. Vivamus lacinia facilisis urna, id laoreet ligula vulputate eu. Maecenas lacinia tellus eget pretium dictum. Pellentesque non mauris ut nunc eleifend condimentum a nec massa. Proin vestibulum dolor eu arcu fringilla, nec tempor est lobortis. Nunc interdum, nulla ut laoreet semper, arcu sapien lacinia ligula, imperdiet efficitur diam erat et est. Etiam eu dolor sit amet felis aliquet ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius felis sed leo egestas, eget eleifend dolor convallis. Donec dignissim justo nec risus tincidunt dictum. Etiam vel nunc leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas laoreet placerat ligula ullamcorper dictum. Fusce pharetra nibh sed arcu aliquet, a eleifend nunc pellentesque. "
    }
]

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
        Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("Removed Campgrounds");
            //ADD FEW CAMPGROUNDS
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added Campgound!");
                    //ADD FEW COMMENTS
                    Comment.create(
                        {
                            text: "This place is great but I wish there would be an internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new Comment!")
                            }
                        });
                }
            });    
        })
        }
    })  
    
    
    
    
}

module.exports = seedDB;