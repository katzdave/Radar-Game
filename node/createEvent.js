//js for first creation of event.
var sql = require('./sql');

exports.createNewEvent = function(req, res){
  console.log(req.user);
  if(!req.user){
    res.render('facebook.html');
  }
  //should have a session and profile object.
  else{
    //generate new game: for now just load up current game
    var fbid;
    var uid;
    var gid;
    sql.getUserFromFbid(getUid, req.user.facebook.id);
    function getUid(err, rows){
        //take the rows and grab
        if(err){
            console.log(err);
        }
        uid = rows[0];
    }
    sql.getGroupsFromUid(getGid, uid);
    function getGid(err, rows){
        if(err){
            console.log(err);
        }
        gid = rows[0];
    }
    res.redirect('/game/'+gid);
  }
};


