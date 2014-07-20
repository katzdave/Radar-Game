var express = require('express');
var http = require('http');
var routes = require('./routes');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(obj, done){
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: 1476041929304242,
    clientSecret: "56fee07fc45d24c2662538660693aef8",
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      return done(null, profile);
    });
  }
));

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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.home);
app.get('/geo', routes.geo);
app.get('/create', routes.create);
app.post('/getRootGroups', routes.getRootGroups);
app.post('/getSubGroups', routes.getSubGroups);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/create', failureRedirect: '/create' }));
app.get('/game/:gId', routes.game);

app.post('/listgroupusers', routes.listgroupusers);
app.post('/listsubgroups', routes.listsubgroups);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
