var assert = require('assert');
var J = require('../lib/journalizer');

describe("Un journal", function () {

  it("a une date", function () {
    journal = J.new_journal({date: "2014-03-23"});
    assert.equal("2014-03-23", journal.date);
  });

  it("a une activité", function () {
    journal = J.new_journal({activity: "Bain de Code"});
    assert.equal("Bain de Code", journal.activity);
  });

  it("a une auteure", function () {
    journal = J.new_journal({author: "Émilie"});
    assert.equal("Émilie", journal.author);
  });

  it("a un texte", function () {
    journal = J.new_journal({content: "Il était une fois l'histoire de la programmation"});
    assert.equal("Il était une fois l'histoire de la programmation", journal.content);
  });


  describe('a un slug', function() {
    it('avec une date, un(e) auteur, et l\'activité', function() {
      var journal = J.new_journal({date: "2017-04-23", author: "Sarah", activity: "Bain de code"});
      assert.equal('2017-04-23-sarah-bain-de-code', journal.slug());
    });
  });

  describe('a un titre', function() {
    it('avec une date, un(e) auteur, et l\'activité', function() {
      var journal = J.new_journal({date: "2017-04-23", author: "Sarah", activity: "Bain de code"});
      assert.equal('Bain de code de Sarah [2017-04-23]', journal.title());
    });
  });



});
