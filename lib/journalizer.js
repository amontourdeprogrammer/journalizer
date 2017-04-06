var fs = require('fs');

var DATA_DIR = process.env['DATADIR'] || 'data';

var dataDir = function () {
  try {
    fs.statSync(DATA_DIR);
  } catch(e) {
    fs.mkdirSync(DATA_DIR);
  }
  return DATA_DIR + '/';
}

var create_journal = function (params) {
  var journal = buildJournal(params);
  save(journal);
  return journal;
}

buildJournal = function (params) {
  return {
    date: params.date,
    activity: params.activity,
    author: params.author,
    content: params.content,
    slug: buildSlug(params),
    title: buildTitle(params)
  }
}

buildTitle = function (params) {
  return params.activity + " de "
    + params.author + " "
    + "[" + params.date + "]";
}

buildSlug = function (params) {
  return params.date + "-"
    + params.author.toLowerCase() + "-"
    + params.activity.toLowerCase().replace(/\W+/g, '-');
}

save = function (journal) {
  fs.writeFileSync(dataDir() + journal.slug, JSON.stringify(journal));
}

module.exports.dataDir = dataDir;
module.exports.create_journal = create_journal;
