var express = require("express");
var bodyParser = require("body-parser");
var J = require("./lib/journalizer");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");

var journaux = [];

app.get("/", function (request, response) {
  response.render("index", { journaux: J.journal_list() }, function (err, html) {
    if (err) { response.send(err); }
    response.send(html);
  });
});

app.get("/ajouter-journal", function (request, response) {
  response.render("ajouter-journal", {}, function (err, html) {
    if (err) { response.send(err); }
    response.send(html);
  });
});

app.get("/:slug", function (request, response) {
  response.send("journal demandé : " + request.params.slug);
});

app.post("/journal", function (request, response) {
  var journal = J.create_journal({
    author: request.body.author,
    date: request.body.date,
    activity: request.body.activity,
    content: request.body.learn});

  journaux.push(journal);

  response.redirect("/");
});

app.listen(3000, function () { });
