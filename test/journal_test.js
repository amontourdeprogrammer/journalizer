var assert = require('assert');
var fs = require('fs');
var J = require('../lib/journalizer');

describe("Création d'un journal", function () {
  describe("dans le système de fichier", function () {
    it("avec un fichier nommé selon le slug", function () {
      var journal = J.create_journal({date: "2017-04-23", author: "Sarah", activity: "Bain de code"});
      assert.doesNotThrow(function () {
        fs.statSync(J.dataDir() + journal.slug);
      });
    });
  });

  it("a une date, une auteure, une activité, un texte", function () {
    journal = J.create_journal({
      date: "2014-03-23",
      author: "Émilie",
      activity: "Bain de Code",
      content: "Il était une fois l'histoire de la programmation"});
    assert.equal("2014-03-23", journal.date);
    assert.equal("Émilie", journal.author);
    assert.equal("Bain de Code", journal.activity);
    assert.equal("Il était une fois l'histoire de la programmation", journal.content);
  });


  describe('a un slug', function() {
    it('avec une date, un(e) auteur, et l\'activité', function() {
      var journal = J.create_journal({date: "2017-04-23", author: "Sarah", activity: "Bain de code"});
      assert.equal('2017-04-23-sarah-bain-de-code', journal.slug);
    });
  });

  describe('a un titre', function() {
    it('avec une date, un(e) auteur, et l\'activité', function() {
      var journal = J.create_journal({date: "2017-04-23", author: "Sarah", activity: "Bain de code"});
      assert.equal('Bain de code de Sarah [2017-04-23]', journal.title);
    });
  });

  afterEach(function () {
    fs.readdirSync(J.dataDir()).map(function (e) {
      fs.unlinkSync(J.dataDir() + e)
    });
  });

});

