var createEvent = require('./createEvent');
var sql = require('./sql');

exports.home = function(req, res) {
  console.log(req.user);  // FTW!
  res.render('index.html', {user: 'Alpha'});
};

exports.geo = function(req, res) {
  //if(req.params.gId != ''){
  //  sql.getGroup(function(err, group) {
  //    if (err || group.length == 0) {
  //     res.redirect('/');
  //    } else {
  //      res.render('geo.html', {user: 'Alpha', gId: group[0].gId, name: group[0].Groupname});
  //    }
  //  }, req.params.gId);
  //} else{
    res.render('geo.html', {uId: req.params.uId , user: JSON.stringify(req.user)});
  //}
};

exports.create = function(req, res) {
   createEvent.createNewEvent(req, res);
};

exports.join = function(req, res) {
   createEvent.joinEvent(req, res);
};

exports.facebook = function(req, res) {
  res.render('facebook.html');
};

exports.makerule = function(req, res) {
  res.render('makerule.html', {message: ''});
}

exports.postmakerule = function(req, res) {
  var hvz = require('./xmlparse/hvz.js');
  hvz.doSomething(req.body.game);
  res.render('makerule.html', {message: 'Rule file submitted.'});
}

exports.game = function(req, res) {
  sql.getGroup(function(err, group) {
    if (err || group.length == 0) {
      res.redirect('/');
    } else {
      res.render('game.html', {user: 'Alpha', gId: group[0].gId, name: group[0].Groupname});
    }
  }, req.params.gId);
};


exports.getRootGroups = function(req, res) {
   sql.getRootGroups(function(err,rows) {
       response = {err: err,rows: rows};
       res.send(response);
   }, req.body.uId);
};

exports.getSubGroups = function(req, res) {
   sql.getSubgroupsFromUser(function(err,rows) {
       response = {err: err,rows: rows};
       res.send(response);
   }, req.body.uId, req.body.gId);
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

exports.addusertogroup = function(req, res) {
  sql.addUserToGroup(function(err) {
    res.json({});
  }, req.body.uId, req.body.gId, 0);
}

exports.setPosition = function(req, res) {
  sql.setPosition(function(err) {
    res.json({});
  }, req.body.uId, req.body.lat, req.body.lng, 1);
}

exports.getcoloredusersinsubgroups = function(req, res) {
  sql.getColoredUsersInSubgroups(function(err, obj) {
    res.json({rows: obj});
  }, req.body.gId);
}

