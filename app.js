
var express = require('express');
var session = require('express-session');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var loginfn = require('./login.js');
var registerfn = require('./register.js');
const cookieParser = require("cookie-parser");

var MemoryStore = session.MemoryStore;
var app = express();

app.use(express.static(__dirname + '/views/imgs'));
app.use(cookieParser());

// Sessions, Login and Registration

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// For Handlebars

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Rendering of pages by Express-Handlebars

app.get('/', function (req, res) {
	global.homereq = {...req};
    res.render('index', { name: checkUserSession(req.session) });
});

var checkUserSession = function(session){
	if(session) {
		return session.name;
	} else {
		return "Tobi";
	}
};

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/register', function (req, res) {
    res.render('register');
});



app.post('/auth',  loginfn );

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.post('/submit-registration', registerfn );

app.listen(3000);

