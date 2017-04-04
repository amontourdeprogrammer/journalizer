var assert = require('assert');
var J = require('../lib/journalizer');

describe('buildSlugFrom request', function() {
  it('should return date in string', function() {
    var request = {moment: "2017-04-23"};
    assert.equal('2017-04-23', J.buildSlugFrom(request));
  });

  it('should return author after date in string', function() {
    var request = {moment: "2017-04-23", author: "Sarah"};
    assert.equal('2017-04-23-sarah', J.buildSlugFrom(request));
  });

  it('should return activity after date-author in string', function() {
    var request = {moment: "2017-04-23", author: "Sarah", activity: "Bain de code"};
    assert.equal('2017-04-23-sarah-bain-de-code', J.buildSlugFrom(request));
  });
});


describe('buildTitleFrom request', function() {
  it('should return date in string', function() {
    var request = {moment: "2017-04-23"};
    assert.equal('[2017-04-23]', J.buildTitleFrom(request));
  });

  it('should return author after date in string', function() {
    var request = {moment: "2017-04-23", author: "Sarah"};
    assert.equal('Sarah [2017-04-23]', J.buildTitleFrom(request));
  });

  it('should return activity after date-author in string', function() {
    var request = {moment: "2017-04-23", author: "Sarah", activity: "Bain de code"};
    assert.equal('Bain de code Sarah [2017-04-23]', J.buildTitleFrom(request));
  });
});

