	var sys = require('util');
	
	/*
		var passport = require('passport');
		var	LocalStrategy = require('passport-local').Strategy;
	*/
	
	var	express = require('express'),
			app 		= express.createServer(),
			sio 		= require('socket.io');
			
	var mysql = require('mysql');
	var TEST_DATABASE = 'mysql';
	var TEST_TABLE = 'TESTTABLE';
	
	app.configure(function() 
	{
	  app.use(express.cookieParser());
	  app.use(express.bodyParser());
	  app.use(express.session({ secret: 'keyboard cat' }));
	  app.use(app.router);
	  app.use(express.static(__dirname + '/../../public'));
	});
	
	app.listen(3000, "localhost");
	
	/*
		Create table commands
	*/
	
	var io = sio.listen(app);
		
	io.configure(function () 
	{
		function auth (data, fn) 
		{
	  		console.log(data.headers.cookie);
	    	fn(null, true);
	  	};

	  	io.set('authorization', auth);
	});
	
	var client = mysql.createClient(
    {
        user: 'root',
        password: 'root',
        host: '127.0.0.1',
        port: '3306',
        database: 'mysql'
    });
    
	var self = this;
	
	io.sockets.on('connection', function (socket) 
	{
		// who is connected? output that too
	    console.log("CONNECTED");
	
		socket.on("addQuestion", function (data)
		{
			console.log("DATA FOR QUESTION IS");
			console.log(data);
			var question = data.Q;
			var answer = data.Answer;
			
			client.query
			(
				'INSERT into mysql.QuestionsAndComments (qText, answer) VALUES(?, ?)',
				[question, answer],
				function insertCb(err, results)
				{
					if (err)
					{
						throw err;
					}
					socket.emit("questionAdded", data);
				}
			);
		})
	
		socket.on('getQuestions', function (data)
		{
			client.query
			(
				'Select * from QuestionsAndComments',
				function selectCb(err, results)
				{
					if (err)
					{
						throw err;
					}
					
					socket.emit("questionList", results);
				}
			);
		});
    	
	    socket.on('registration', function (data)
	    {
			//
			// First verify that registration CAN happen?
			// Email verification? Think about how to authenticate the address? Blind trust?
			// Logical sequence: Verify -> Insert -> Response
		
			// put the registration code here...shit
			client.query
		    (
		            'INSERT into mysql.Users firstname = ? and password = ? ',
		            [data.username, data.password],
		            function selectCb(err, results, fields) 
		            {
		                if (err) 
		                {
		                    throw err;
		                }
		                self.res = results;
		                console.log(results);
		                socket.emit('Reg_success', data);
		            }
		    );
		
	        //socket.emit('Reg_success', data);
	    });
    
	    socket.on('login', function (data)
	    {
	        console.log("LOGIN REQUETS RECEIVED");
	        client.query('USE mysql');
	        var res;
	        var self = this;
	        client.query
	        (
	            'SELECT Users.firstname from mysql.Users where Users.firstname=? and Users.password =?',
	            [data.username, data.password],
	            function selectCb(err, results, fields) 
	            {
	                if (err) 
	                {
	                    throw err;
	                }
	                self.res = results;
	                console.log(results);
	                socket.emit('Login_Success', data);
	            }
	        );
	    });
	
		socket.on("getComments", function (data)
		{
			client.query
			(
				'SELECT * from mysql.Comments',
				function selectCb(err, results)
				{
					if (err)
						throw err;
						
					socket.emit("commentList", results);
				}
			);
		});
		
		socket.on('addComment', function (data)
		{

			client.query
			(
				'INSERT into mysql.Comments (user_id, question_ID, comment_text) VALUES(?, ?, ?)',
				[data.user, data.questionId, data.value],
				function fn(err, result)
				{
					if (err)
					{
						throw err;
					}	
					socket.emit("commentAdded", data);
				}
			);
		});
	});
	
