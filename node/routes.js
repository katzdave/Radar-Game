var createEvent = require('./createEvent');
var sql = require('./sql');

exports.home = function(req, res) {
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
  sql.getGroup(function(err, group) {
    if (err || group.length == 0) {
      res.redirect('/');
    } else {
      res.render('game.html', {user: 'Alpha', gId: group[0].gId, name: group[0].GroupName});
    }
  }, req.params.gId);
};


exports.getRootGroups = function(req, res) {
   sql.getRootGroups(function(err,rows) {
       response = {err: err,rows: rows};
       res.send(response);
   }, req.body.uId);
};

exports.listgroupusers = function(req, res) {
  sql.getUsersFromGroup(function(err, users) {
    res.json({result: users});
  }, req.body.gId);
}

exports.listsubgroups = function(req, res) {
  sql.getGroupTree(function(err, groups) {
    res.json({result: groups});
  }, req.body.gId);
}

