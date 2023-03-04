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
const notesSchema = new mongoose.Schema({
  title:String,
  fio:String,
  content: String
});

const Note = mongoose.model("Note", notesSchema)
app.get("/", function(req, res) {
  // res. sendFile("/index.html")
  res. sendFile(__dirname + "/index.html")
})

app.get("/style.css", function(req, res) {
  // res. sendFile("/index.html")
  res. sendFile(__dirname + "/style.css")
})

app.get("/api.js", function(req, res) {
  // res. sendFile("/index.html")
  res. sendFile(__dirname + "/api.js")
})

app.get("/utils.js", function(req, res) {
  // res. sendFile("/index.html")
  res. sendFile(__dirname + "/utils.js")
})

app.get("/questions1.json", function(req, res) {
  // res. sendFile("/index.html")
  res. sendFile(__dirname + "/questions1.json")
})


app.get("/questions2.json", function(req, res) {
  // res. sendFile("/index.html")
  res. sendFile(__dirname + "/questions2.json")
})

app.post("/", function(req, res) {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    fio: req.body.fio,
  });
  newNote.save();
  // res.redirect('/');
})

app.listen(3000, function() {
  console.log("server is running on 3000")
})
