var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for pars
app.set('view engine', 'pug')


var journaux = []

app.get("/", function (request, response) {
  response.render('index', { journaux: journaux }, function(err, html) {
    console.log(err)
      response.send(html);
  });
});

app.get("/ajouter-journal", function (request, response) {
  console.log('dans ajouter journal');
  response.render('ajouter-journal', {}, function(err, html) {
    console.log(err)
      response.send(html);
  });
});

app.post("/journal", function (request, response) {
  var journal = {content: request.body, title: "something"}
  journaux.push(journal);
  response.redirect("/");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


