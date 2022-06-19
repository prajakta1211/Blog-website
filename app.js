const express = require("express");
const Article = require("./models/article");
const articleRouter = require("./routes/articles.js");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
app.get("/",async (req,res) => {
    const articles = await Article.find().sort({createdAt:"desc"});
    res.render("articles/index",{articles: articles});
});
app.use("/articles",articleRouter);
app.listen(3000, () => {
    console.log("Server is up and running on port 3000");
});