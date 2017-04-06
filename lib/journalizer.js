buildTitle = function () {
  return this.activity + " de "
    + this.author + " "
    + "[" + this.date + "]";
}

buildSlug = function () {
  return this.date + "-"
    + this.author.toLowerCase() + "-"
    + this.activity.toLowerCase().replace(/\W+/g, '-');
}

module.exports.new_journal = function (params) {
  return {
    date: params.date,
    activity: params.activity,
    author: params.author,
    content: params.content,
    slug: buildSlug,
    title: buildTitle
  }
}
