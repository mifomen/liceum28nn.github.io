const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

mongoose
  .connect("mongodb+srv://gVAa3ZEnKYm3caKk:Mu2ueghB0vr5B1FbRKnOPT@cluster0fortest.zmiomxd.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true, })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

//create a data schema

const notesSchema = {
  title:String,
  content: String
}

const Note = mongoose.model("Note", notesSchema)

app.get("/", function(req, res) {
  res. sendFile(__dirname + "/index.html")
})


app.post("/", function(req, res) {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  newNote.save();
  // res.redirect('/');
})

app.listen(3000, function() {
  console.log("server is running on 3000")
})
