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

var journal_list = function () {
  return fs.readdirSync(dataDir()).map(function (e) {
    return buildJournal(unslug(e));
  });
}

var buildJournal = function (params) {
  return {
    date: params.date,
    activity: params.activity,
    author: params.author,
    content: params.content,
    slug: buildSlug(params),
    title: buildTitle(params)
  }
}

var buildTitle = function (params) {
  return params.activity + " de "
    + params.author + " "
    + "[" + params.date + "]";
}

var buildSlug = function (params) {
  return params.date.replace(/-/g, '') + "-"
    + params.author.toLowerCase() + "-"
    + params.activity.toLowerCase().replace(/\W+/g, '_');
}

var save = function (journal) {
  fs.writeFileSync(dataDir() + journal.slug, JSON.stringify(journal));
}

var unslug = function (slug) {
  var splittedSlug = slug.split('-');
  return {
    date: unSlugDate(splittedSlug[0]),
    author: unSlugAuthor(splittedSlug[1]),
    activity: unSlugActivity(splittedSlug[2])
  }
}

var unSlugDate = function (slugDate) {
  return slugDate.slice(0, 4) + '-'
    + slugDate.slice(4, 6) + '-' +
    + slugDate.slice(6, 8);
}

var unSlugAuthor = function (slugAuthor) {
  return slugAuthor.slice(0, 1).toUpperCase() + slugAuthor.slice(1);
}

var unSlugActivity = function (slugActivity) {
  var splittedActivity = slugActivity.split('_');
  splittedActivity[0] = splittedActivity[0].slice(0,1).toUpperCase()
    + splittedActivity[0].slice(1);
  return splittedActivity.join(' ');
}

module.exports.dataDir = dataDir;
module.exports.create_journal = create_journal;
module.exports.journal_list = journal_list;
module.exports.unslug = unslug;
