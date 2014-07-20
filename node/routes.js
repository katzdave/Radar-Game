var createEvent = require('./createEvent');
var sql = require('./sql');

exports.home = function(req, res) {
  console.log(req.user);  // FTW!
  res.render('index.html', {user: 'Alpha'});
};

exports.geo = function(req, res) {
  res.render('geo.html', {uId: '1' , user: req.user});
};

exports.create = function(req, res) {
   createEvent.createNewEvent(req, res);
};

exports.facebook = function(req, res) {
  res.render('facebook.html');
};

exports.game = function(req, res) {
  res.render('game.html');
};

exports.getRootGroups = function(req, res) {
   sql.getRootGroups(function(err,rows) {
       response = {err: err,rows: rows};
       res.send(response);
   }, req.body.uId);
};
