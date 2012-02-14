
var io = require('socket.io');
var express = require('express');
var app = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());var	express = require('express'),
		app 		= express.createServer(),
		sio 		= require('socket.io');

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat"}));
app.listen(3000, "localhost");
var io = sio.listen(app);

io.configure(function () {
  function auth (data, fn) {
  	console.log(data.headers.cookie);
    fn(null, true);
  };

  io.set('authorization', auth);
});

io.sockets.on('connection', function (socket) {
	socket.send('hi');
});

  app.use(app.router);
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/views/index.html');
});

var port = process.env.PORT || 3000;

app.listen(port, function() 	
{
  console.log("Listening on " + port);
});

var sio = io.listen(app);

var self = this;

sio.sockets.on('connection', function (socket) 
{
	//
	// Events the server listens to
	//
	res.end('SendGrid');
	socket.on('registration', function (data) 
  	{
  	  	socket.emit('Reg_success', Registration);
  	  	/*
  		email.send(
  		{
		  	host: "smtp.sendgrid.net",
		  	port : "25",
	  		domain: "smtp.sendgrid.net",
		  	authentication: "login",
		  	username: (new Buffer("myAccountName")).toString("base64"),
	  		password: (new Buffer("myPassword")).toString("base64"),
		  	to : "khaliq.taimur@gmail.com",
		  	from : "test@mydomain.com",
  			subject : "node_mailer test email",
		  	body : "hello this a test email from the node_mailer",
		}
		*/
	});
  
  	socket.on('login', function (data)
  	{
  		console.log(data);
  	});
  	
  	socket.on('getQuestions', function (data)
  	{
  	
  	});
  	
  	socket.on('postQuestion', function (data)
  	{
  	
  	});
  	
  	socket.on('comment', function (data)
  	{
  	
  	});
  	
  	/*
  		Add a link to click
  		
  	*/
  	
});





