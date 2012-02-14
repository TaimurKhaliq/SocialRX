(function ()
{
	//
	// cModule contains a collection of Questions and UserInfo
	// Questions contain: All questions, with their answers and comments
	//
	applicationModel = Backbone.Model.extend(
	{
		defaults:
		{
			
		},
		
		dataModel : '',
		user: '',
		comments: '',
		selected: '',
		question: '',
		
		initialize: function ()
		{
			this.question = new QuestionAndAnswer();
			this.dataModel = new cModule();
			this.user = new User();
			this.comments = new CommentsCollection();
			this.selected = new selectedMod();
			this.populateModel();
			this.bind();
		},
		
		bind : function ()
		{
			this.dataModel.bind("add", function (model)
			{
				console.log("ADDING TO COLLECTION");
				console.log(model);
			});
		
			this.dataModel.bind("change:selected", function (d)
			{
				this.trigger("questionSelected", d);
			});
		
			this.dataModel.bind("change:selected", function(m)
			{
				console.log("cModule selected");
				this.setSelected({Selected: m});
			});
		
			this.dataModel.bind("change:Question", function()
			{
			    console.log('there have been updates made to this collections titles');    
			});
		
			this.dataModel.bind("change:Answer", function(d)
			{
			    console.log('there have been updates made to this collections titles');   
			 	this.trigger("answerChanged", d);
			});
				
			this.comments.bind("add", function (comment)
			{
				console.log("added comment: "+comment);
				
			});

			this.comments.bind("questionSelected", function (m)
			{
				tw.CommentsCollection.onSelected(m);
			});
		},
		
		populateModel : function ()
		{
			console.log("IN POPULATE MODEL");
			console.log(this);
			console.log("THE DATAMODEL IS:");
			console.log(this.dataModel);
			console.log(this.comments);
			var self = this;
			
			 		
			window.tw.socket.emit("getQuestions");
			window.tw.socket.on("questionList", function (data)
			{
				console.log("QUESTION LIST IS:");
				console.log(data);
				_.each(data, function (m)
				{
					self.dataModel.add(new QuestionAndAnswer({ Question: m.qText, Answer: m.answer, id: m.id}));
				});
			});
			
			window.tw.socket.emit("getComments");
			window.tw.socket.on("commentList", function (data)
			{
				console.log("Comment list is:");
				console.log(data);
				var user = self.user.get("name");
				_.each(data, function (m)
				{
					console.log("COMMENT RECEIVED" +m);
					console.log(m);
					self.comments.add(new comment({ user: m.user_id, comment: m.comment_text, question: m.question_ID }));
				});
			});
			
			/*
				this.comments.add(new comment({ user: "Taimur", comment:"yeah yeah hahaha", question: "1" }));
				this.comments.add(new comment({ user: "Alex", comment:"This is so funny, lol", question: "1" }));
				this.comments.add(new comment({ user: "Dimitry", comment:"You are right...:P", question: "1" }));
				this.comments.add(new comment({ user: "Catherine", comment:"hahahaahaaha", question: "2" }));
				this.comments.add(new comment({ user: "Jessica", comment:"this project is awesome man!", question: "4" }));
				this.comments.add(new comment({ user: "Maryam", comment:"I love working on this!", question: "3" }));
			*/
		},
		
		addQuestion: function (data)
		{
			var qnA = new QuestionAndAnswer();
			qnA.set({Question: data.Q, Status: data.Status, Answer: data.Answer})
			this.dataModel.add(qnA);
		}
	});
	
	var cModule = Backbone.Collection.extend(
	{
		model: QuestionAndAnswer,
		
    	defaults: 
    	{
			//qCollection : new QuestionCollection()
		},
    
    	initialize: function()
    	{
    		// initialize the question collection  
			console.log("cModule initialized");
		}

	});
	
	var User = Backbone.Model.extend(
	{
		defaults:
		{
			name: '',
			permission: ''
		},
		
		initialize: function ()
		{
			console.log("user model initialized");
		}
		
	});
	
	//
	// Question and Answer model
	//
	var selectedMod = Backbone.Model.extend(
	{
		defaults:
		{
			selected: '1',
			model: QuestionAndAnswer
		},
		
		initialize: function ()
		{
			console.log("selected model initialized");
		}
	});
	
	var QuestionAndAnswer = Backbone.Model.extend(
	{
		defaults:
		{
			Question : "How much will you pay me?",
			Status: "",
			Answer : "As much as you want",
			id: ''
		},
				
		initialize: function ()
		{
			console.log("Initializing questionAndAnswer");
		},
		
		setQnA: function (q, a)
		{
			this.set(
			{	Question: q,
				Answer: a
			});
		}
		
	});
	
	var comment = Backbone.Model.extend(
	{
		defaults:
		{
			user: null,
			comment: null,
			Question: null
		},
		
		initialize: function ()
		{
			console.log("Initializing comment");
			
			this.bind("change:comment", function()
			{
				var comment = this.get("comment");
			});
		},

		changeComment: function (newComment)
		{
			this.set({ comment: newComment });
		}
		
	});
	
	var CommentsCollection = Backbone.Collection.extend(
	{
		model: comment,
		selected: '',
		
		onSelected: function (model)
		{
			this.set({selected: model});
		},
		
		getComments: function ()
		{
			console.log("IN GET COMMENTS");
			return this.filter(function(model){ return model.get("question") == "1"; });
		}
	});

})();