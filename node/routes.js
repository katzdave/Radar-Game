exports.home = function(req, res) {
  res.render('index.html', {user: 'Alpha'});
};
