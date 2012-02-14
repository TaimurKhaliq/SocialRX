helperFunc = function ()
{
	this.bindToClick = function (self)
	{
		$('#button_login').click(function () 
		{
			alert("BUTTON CLICKED");
			console.log("DATA MODEL IS")
			console.log(self.model);
			var question = $('#postQuestionText').val();
			var QnA = self.model.question;
			
			//
			// Display model if user is logged in
			//
			if (self.model.user.get("name") != '')
			{
				var data = 
				{
					Q: question,
					Status: 'unsawered',
					Answer: 'please post an answer'
				}
			
				self.model.addQuestion(data);
			}
		});
	};
	
};

(function ()
{
	// Single global variable to determine what is selected
	var selected = '';
	
	
	tw.AppView = Backbone.View.extend({
	
		//helperFunction: new helperFunc(),
		
		initialize: function ()
		{
			var self = this;
			console.log("application model is: ");
			console.log(self.model);
			_.bindAll(self.model.dataModel, "add");
			this.ListQuestions();
			
			this.model.dataModel.bind("add", function (data)
			{
				self.ListQuestions(data);
				self.addUiBehavior(data);
			});
			
			this.model.dataModel.bind("change:Answer", function (data)
			{
				self.updateAnswer(data.get("Answer"));
			});
			
			this.bindToPostAnswer();
			this.postQuestion();
			this.addUiBehavior();
			
		},
		
    	ListQuestions: function(data)
    	{
    		var html = '';
			var self = this;
			var o = { id: 0 };
    		console.log("IN LIST QUESTIONS");

			var models = this.model.dataModel.models.filter(function(model){ return model.get("Answer") != ''; });
			
			for (var m in models)
			{
				var myModel = models[m];
	     		var template = _.template($('#question').html());
				o.id++;
				
        		html += template(
        		{
        			Question : myModel.get("Question"),
        			Id: o.id	
        		});
			}
			
			$('.questionList').html(html);
			
			//this.createQuestionField();
			//this.addUiBehavior();
    	},
    	
		bindToPostAnswer: function ()
		{
			var self = this;
			var answer = $('#postAnswerText').val();
			$('#b_postAnswer').click(function ()
			{
				console.log("postAnswer Clicked");
				var answer = $('#postAnswerText').val();
				var sM = self.model.selected.get("model");
				console.log(sM);
				sM.set({Answer: answer});
			})
		},
		
    	createQuestionField: function ()
    	{
    		
    		//
    		// Add the helper text
    		//
    		$("#postQuestionText").labelify({ labelledClass: "labelHighlight" });
    		$("#postAnswerText").labelify({ labelledClass: "labelHighlight" });
    		
    		//
    		// Add the overlay to be triggered 
    		//
			if(this.model.user.get("name") == '')
			{
       			$('button[rel]').overlay({
					onBeforeLoad: function ()
					{
						if (this.getTrigger().hasClass('overlay-disabled')) return false;
					}
				});
        		this.populateOverlay();
			}
    	},
    	
    	populateOverlay : function ()
    	{
    		//
    		// Insert the registration information
    		//
			$("#registrationContent").html($('#overlayOptionMenu').html());
			
			//
			// Register to generate new type of menus
			//
			var self = this;
			
			$('.loginINIT').click(function ()
			{
				console.log("LOGIN CLICKED");
				var html = $("#loginFields").html();
				$("#selectedContent").html(html);
				authentication.registerOverlay(self.model);
			});
			
			$('.registerINIT').click(function ()
			{
				var html = $("#registrationFields").html();
				$("#selectedContent").html(html);
				authentication.registerOverlay(self.model);
			});
			
			$('.FacebookINIT').click(function ()
			{
				console.log("Facebook clicked");
				alert("Facebook feature not implemented yet");
			});
			
			$('.TwitterINIT').click(function ()
			{
				alert("Twitter feature not implemented yet");
			});
    	},

		postQuestion: function ()
		{
			var self = this;
			$('#button_login').click(function () 
			{
				console.log("DATA MODEL IS")
				console.log(self.model);
				var question = $('#postQuestionText').val();
				var QnA = self.model.question;

				//
				// Display model if user is logged in
				//
				//if (self.model.user.get("name") != '')
				//{
					var data = 
					{
						Q: question,
						Status: 'unsawered',
						Answer: 'please post an answer'
					}

					self.model.addQuestion(data);
					window.tw.socket.emit("addQuestion", data);
					window.tw.socket.on("questionAdded", function (data)
					{
						console.log(data);
					})
				//}
				//else
				//	self.createQuestionField();
			});
		},
    	
		//
		// Adds answers - change the name of this
		//
    	addUiBehavior : function ()
    	{
			
			var models = this.model.dataModel.models.filter(function(model){ return model.get("Answer") != ''; });
			console.log("IN UI BEHAVIOR MODELS ARE:");
			console.log(models);
    		//questions = this.model.dataModel.models.get("questions");
			var o = { id: 0 };
			var answerTemplate = _.template($('#answerTemplate').html());
			var self = this;
			_.each(models, function(mod)
			{
				o.id++;
    		    $('#list_'+o.id).bind('click', {param: o.id}, function (e)
    			{
    				//
    				// Clear all existing styles
    				//
					var m = e.data.param;
					/*
    				for (var j=0; j<7; j++) // dont hardcode this
    					$('#list_'+j).css('border-style', 'none');
    				*/

    				//
    				// Generate The Answer
    				//
    				html = answerTemplate(
    				{
    					Id: m,
    					Answer: mod.get("Answer")
    				});

					console.log("HTML IS:");
					console.log(html);

    				$('#answer_').html(html);
    				//$(this).effect("highlight", {}, 1500);  
    				//$(this).css("border-style", 'ridge');
					selected = m;
					self.model.selected.set({selected: selected, model: mod});
    			});	
			});
    	},

		updateAnswer: function (ans)
		{
			$('#answer_').html(ans);
		}
		
   	});
	
	tw.DiscussionView = Backbone.View.extend({
	
		initialize: function ()
		{
			//var q1comments = self.model.models.filter(function(model){ return model.get("question") === selected; });
			var self = this;
			console.log("DISCUSSION VIEW LOOKS LIKE THIS:");
			console.log(self.model.selected.get("selected"));
			
			this.model.selected.bind("change:selected", function (e)
			{
				var s = this.get("selected"); 	
				var q1_comments = self.model.comments.filter(function(model){ return model.get("question") == s; });
				self.render(q1_comments);
			});
			
			this.model.comments.bind("add", function (data)
			{
				var q1comments = self.model.comments.filter(function(model){ return model.get("question") === selected; });
				self.render(q1comments);
			});
			
			// bind on filter by user
			// if clicked render, but apply filter to the collections comment
			// un bind the event
			this.addComment();
		},
		
    	render: function(data)
    	{
    		var html = '';

			if (data == null)
				discussions = this.model.comments;
			else
    			discussions = data;

			console.log("in rendering discussion");
			console.log(discussions);
    		_.each(discussions, function (q)
    		{
  				var template = _.template($('#discussionTemplate').html());

       			html += template(
       			{
					User: q.get("user"),
       				Comment : q.get("comment")	
       			});
	       	});
        	
        	$('.questionDiscussionPanel').html(html);

    		$("#commentText").labelify({ labelledClass: "labelHighlight" });

			$(".rightPanel").show();
    	},

		addComment: function ()
		{
			var self = this;
			$('#commentText').keypress(function (e)
			{
				var code = (e.keyCode ? e.keyCode : e.which);
				if(code == 13) 
				{
					var value = $('#commentText').val();
					var name = self.model.user.get("name");
					var id = self.model.selected.get("model").get("id");
					console.log(id);
					self.model.comments.add({user: name, comment: value, question: selected});
					var user = self.model.user.get("name");
					//
					// Make request to server to SAVE comment
					//
					var o =
					{
						name: name,
						value: value,
						questionId: id,
						user: user
					};
					
					console.log("SENDING:");
					console.log(id);
					window.tw.socket.emit("addComment", o);
					window.tw.socket.on("commentAdded", function()
					{
						console.log("successfully saved comment in server");
					});
				}
			});
		}
		
	});
		
})();