var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var User = require("./models/user")
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");

//Requring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");


//DB Settings
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://vlad:q1w2e3r4t5@ds127949.mlab.com:27949/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// Seed the database
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Zhanna is my love",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//sending user data to all the templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//Custom Stylesheets settings
app.use(express.static(__dirname+"/public"))

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//Start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp server is running");
});