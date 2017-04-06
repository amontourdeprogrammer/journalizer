var express = require('express');
var bodyParser = require('body-parser');

var PouchDB = require('pouchdb');

var J = require('./lib/journalizer');

var app = express();
var db = new PouchDB('journalizr.db');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')


var journaux = []

app.get("/", function (request, response) {
  db.allDocs().then(function(r){console.log(r)} ).catch(function(e){console.log(e);});
  response.render('index', { journaux: journaux }, function(err, html) {
    console.log(err);
    response.send(html);
  });
});

app.get("/ajouter-journal", function (request, response) {
  console.log('dans ajouter journal');
  response.render('ajouter-journal', {}, function(err, html) {
    console.log(err);
    response.send(html);
  });
});

app.get('/:slug', function (request, response) {
  console.log(request.params.slug);

  db.query('something', {slug: request.params.slug})
    .then(function (response) {
      console.log(response);
    })
  .catch(function (err) {
    console.log("ERROR: ", err);
  });

  response.send("ok");
});


app.post("/journal", function (request, response) {
  console.log(request.body);
  var journal = J.new_journal({
    author: request.body.author,
    date: request.body.date,
    activity: request.body.activity,
    content: request.body.learn})

  db.post(journal).then(function (response) {
    console.log(response);
  }).catch(function (err) {
    console.log(err);
  });;

  journaux.push(journal);

  response.redirect("/");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


