window.tw =
{	
	//
	// All other functions in the globa scope
	//
	reload: null,
	socket : io.connect('http://localhost:3000')
};

$(function ()
{
	//
	// Start the app controller
	//
    tw.app.start(); 
});

(function ()
{
	var AppController = Backbone.Router.extend(
	{
		routes: 
		{
		},
		
		start : function ()
		{
			//
			// create the question model
			//
			var m = this.createQuestionModel();

			
			//
			// Create the AppView, passing it the fetched model
			//
			var mainView = new tw.AppView(
			{	
				model : m
			});
			
			// 
			//	create the discussion model
			//
			//var d = this.createDiscussionModel();
			
			//
			// create the discussion view
			//
			var dView = new tw.DiscussionView(
			{
				model: m
			});
			
			//this.makeRequest();
		},
		
		createQuestionModel : function ()
		{
			var model = new applicationModel();
			return model;	
		},
		
	});
	
	//
	// The single instance of the app controller
	//
	
	tw.app = new AppController();
		
})();
