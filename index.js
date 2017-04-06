var express = require('express');
var bodyParser = require('body-parser');
var J = require('./lib/journalizer');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')


var journaux = []

app.get("/", function (request, response) {
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
  response.send("journal demandé : " + request.params.slug);
});


app.post("/journal", function (request, response) {
  console.log(request.body);
  var journal = J.create_journal({
    author: request.body.author,
    date: request.body.date,
    activity: request.body.activity,
    content: request.body.learn})

  journaux.push(journal);

  response.redirect("/");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


