var assert = require('assert');
var fs = require('fs');
var J = require('../lib/journalizer');


describe("Liste de journaux", function () {
  it("par rapport au répertoire $DATADIR", function () {
    assert.equal(J.journal_list().length, 0);
    journal = J.create_journal({
      date: "2014-03-23",
      author: "Émilie",
      activity: "Bain de code",
      content: "Il était une fois l'histoire de la programmation"});
    assert.equal(J.journal_list().length, 1);
    assert.equal(J.journal_list()[0], journal);
  });

  afterEach(function () {
    fs.readdirSync(J.dataDir()).map(function (e) {
      fs.unlinkSync(J.dataDir() + e)
    });
  });

});

describe("unslug journal", function () {

  it("extrait la date", function () {
    assert.equal(J.unslug('20140323-émilie-bain_de_code').date, '2014-03-23');
  });

  it("extrait l'auteure", function () {
    assert.equal(J.unslug('20140323-émilie-bain_de_code').author, 'Émilie');
  });

  it("extrait l'activité", function () {
    assert.equal(J.unslug('20140323-émilie-bain_de_code').activity, 'Bain de code');
  });

});
