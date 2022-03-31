const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");

const app = express();
mongoose.connect('mongodb+srv://pranav121:Niggatiger%40123@cluster0.oz2lx.mongodb.net/todolistDB')
const itemSchema=mongoose.Schema(
  {name: String}
)
const Item=mongoose.model("item",itemSchema)
// const item=new Item(
//   {name:"Hello"}
//   )
// const item1=new Item(
//   {name:"World"}
//   )
// const defaultItem=[item,item1]


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res) {
Item.find({},(err,items)=>{
  
  if(err){
    console.log(err);
  }
  else{
    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
  }
})

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  item3=new Item({
    name:itemName
  })
  item3.save()
  res.redirect("/")
});
app.post("/delete",(req,res)=>{
  const itemId=req.body.checkbox;
  Item.deleteOne({_id:itemId},(err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("successfully deleted");
    }
  })
  res.redirect("/")
})

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

// app.get("/about", function(req, res){
//   res.render("about");
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
