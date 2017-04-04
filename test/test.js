var assert = require('assert');
var Journalizer = require('../lib/journalizer');

describe('buildSlugFrom request', function() {
  it('should return date in string', function() {
    var request = {moment: "2017-04-23"};
    assert.equal('2017-04-23', Journalizer.buildSlugFrom(request));
  });

  it('should return author after date in string', function() {
    var request = {moment: "2017-04-23", author: "Sarah"};
    assert.equal('2017-04-23-sarah', Journalizer.buildSlugFrom(request));
  });

  it('should return activity after date-author in string', function() {
    var request = {moment: "2017-04-23", author: "Sarah", activity: "Bain de code"};
    assert.equal('2017-04-23-sarah-bain-de-code', Journalizer.buildSlugFrom(request));
  });
});

