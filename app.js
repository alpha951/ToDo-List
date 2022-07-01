const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//! we can push data in const arrays but can't assign any other array
const task_list = ["buy food", "cook food"];
const workItems = [];
app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: day, task: task_list });
});

app.post("/", function (req, res) {
  let task = req.body.task;
  if (req.body.list == "Work") {
    workItems.push(task);
    res.redirect("/work");
  } else {
    task_list.push(task);
    console.log(task);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", task: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
