var express = require('express');
var http = require('http');
var routes = require('./routes');
var sql = require('./sql');
var everyauth = require('everyauth');

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByFbId = {};
everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });
 // Step 1 code goes here
everyauth.facebook
  .appId('1476041929304242')
  .appSecret('56fee07fc45d24c2662538660693aef8')
  .handleAuthCallbackError( function (req, res) {
    // If a user denies your app, Facebook will redirect the user to
    // /auth/facebook/callback?error_reason=user_denied&error=access_denied&error_description=The+user+denied+your+request.
    // This configurable route handler defines how you want to respond to
    // that.
    // If you do not configure this, everyauth renders a default fallback
    // view notifying the user that their authentication failed and why.
    })
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    // find or create user logic goes here      
    return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
  })
  .redirectPath('/');
 // Step 2 code
var app = express();
// all environments


app.set('port', '8080');
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(express.cookieParser());
app.use(express.logger('dev'));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(express.session({ secret: 'SECRET' }));
app.use(everyauth.middleware());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home);
app.get('/join', routes.join);
app.get('/create', routes.create);
app.post('/getRootGroups', routes.getRootGroups);
app.get('/game', routes.game);
app.get('/game/:gId', routes.game);
app.get('/geo', routes.geo);
app.get('/geo/:uId', routes.geo);

app.post('/listgroupusers', routes.listgroupusers);
app.post('/listsubgroups', routes.listsubgroups);
app.post('/addusertogroup', routes.addusertogroup);
app.post('/getsubgroups', routes.getSubGroups);
app.post('/setposition', routes.setPosition);
app.post('/getcoloredsubgroups', routes.getcoloredusersinsubgroups);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
