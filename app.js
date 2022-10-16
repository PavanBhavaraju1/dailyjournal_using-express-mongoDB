
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const app = express();
const homeStartingContent = "This is where we can express our views on different topics.Share our ideologies,help each other,Getting Better!";
const aboutContent = "This is where we can express our views on different topics.Share our ideologies,help each other,Getting Better!";
const contactContent = "It is here!"

var post ="";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://PavanBhavaraju:pass@cluster0.5ys8h.mongodb.net/dailyjournal?retryWrites=true&w=majority");

const composeSchema = new mongoose.Schema({
  title : String,
  body : String
});

const Post = mongoose.model("Post",composeSchema);




app.get("/", function(req,res){
    Post.find({}, function(err, founditems) {
      if(!err){

        res.render("home",{HomeStartContent:homeStartingContent,Posts:founditems});
      }
});
});


app.get("/contact", function(req,res){
  res.render("contact",{ContactContent:contactContent});
})

app.get("/about", function(req,res){
  res.render("about",{AboutContent:aboutContent});
})
app.get("/Compose", function(req,res){
  res.render("compose");
})

app.get("/posts/:postName", function(req,res){
var requestedtitle= req.params.postName;

  Post.find({_id:requestedtitle}, function(err, founditems) {
if (!err){
  founditems.forEach(function(post){
res.render("post",{StoredTitle:post.title, StoredBody:post.body});

  });
}

  })

});


app.post("/compose",function(req,res){

 post = new Post(
  {
  title:req.body.postTitle,
  body:req.body.postBody
  }
);

post.save(function(err){
  if(!err){
    res.redirect("/");
  }
});

});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
