exports.home = function(req, res) {
  res.render('index.html', {user: 'Alpha'});
};

exports.geo = function(req, res) {
  res.render('geo.html', {user: 'Alpha'});
};

exports.create = function(req, res) {
   createEvent.createNewEvent(req, res);
};

exports.facebook = function(req, res) {
  res.render('facebook.html');
};
