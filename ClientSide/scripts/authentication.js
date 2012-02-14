(function ()
{
	authentication = 
	{
		regData: 
		{
			name: null,
			email: null,
			password: null
		},
		
		loginData:
		{
			username: null,
			password: null
		},
		
		model: '',
		
		socket: io.connect('http://localhost:3000'),
		
		registerOverlay: function (model)
		{
			this.model = model;
			var self = this;
			console.log("IN REGISTER OVERLAY");
			$('.reg_Submit4').click(function ()
			{
				alert("CLICKED");
				self.regData.name = $('#reg_name_text').val();		
				self.regData.email = $('#reg_email_text').val();
				self.regData.password = $('#reg_password_text').val();
				self.submitRegistrationRequest(model);
			});
			
			$('#login_Submit').click(function ()
			{
				// collect data
				self.loginData.username = $('#login_name_text').val();
				self.loginData.password = $('#login_password_text').val();
				self.submitLoginRequest(model);
			})
		},
		
		submitRegistrationRequest: function (model)
		{
			var self = this;
			console.log("IN SUBMIT REGISTRATION REQUEST");
			console.log(model)
    		self.socket.emit('registration', self.regData);
    		self.socket.on('Reg_success', function (data)
    		{
				model.user.set({name: data.name, permission: "user"});
				
				var temp = _.template($('#loginTemplate').html());
				var html = temp(
				{
  					User: model.user.get("name")
				});
				
				$('.loginStatus').html(html);
				
				//disable Overlay
				$('#button_login').addClass('overlay-disabled');
    			console.log(model.user);
    		});
		},
		
		handleServerRequest: function (data)
		{
			alert("data");
		},
		
		submitLoginRequest: function (model)
		{
			var self = this;
			console.log("in login request");
			
			self.socket.emit('login', self.loginData);
			self.socket.on('Login_Success', function (data)
			{
				console.log("LOGIN DATA");
				console.log(data);
				model.user.set({name: data.username, permission: "user"});
				
				var temp = _.template($('#loginTemplate').html());
				var html = temp(
				{
  					User: model.user.get("name")
				});
				
				$('#button_login').addClass('overlay-disabled');
				
				$('.loginStatus').html(html);
			});
		},
	};	
})();