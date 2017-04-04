
module.exports.buildSlugFrom = function (request) {
  var slug = "";
  slug += request.moment;
  if(request.author) {
    slug += "-" + request.author.toLowerCase();
  }
  if(request.activity) {
    slug += "-" + request.activity.toLowerCase().replace(/\W+/g, '-');
  }
  return slug;
}

