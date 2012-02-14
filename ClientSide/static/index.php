<?php
/**
 * @package Timeless_Wealth
 * @version 1.0
 */
/*
Plugin Name: Timeless Wealth
Plugin URI: http://wordpress.org/extend/plugins/timeless-wealth/
Description: Custom commenting module for trading companies
Author: Taimur Khaliq
Version: 1.0
Author URI: http://ma.tt/
*/

function TW_commentingModule () 
{
// add a question field - so that it goes for approval (nice jQuery style)
// list approved questions - with answers (if there are any)
// registration to post questions?
// add a comment section per answer 
// add an admin panel. (how does this fit within plugin?)
// remote service call? 

echo <<<END
<style>
.questionbox
{	
	color: red;
	font-size: 18px;
	align: inline;
}
.text
{
	align: inline;
	color: red;
}

.QuestionAnswerDiscussion
{

}

.question
{
	width: 600px;
	height: 600px;
}

.questionText
{
	border: dotted;
	
}
.Answer
{
	width: 600	px;
	height: auto;
	overflow: auto;
}

.discussion
{
	float: right;
	border-style: dotted;
	border-color: red'
	border-radius: 5px;
	font-size: 18px;
	border: dotted;
}

.comment
{
	border: blue;
	border-style: dotted;
	border-radius: 5px;
}

.username
{
	font-style: bold;
	font-size: 14px;
}

.userComment
{
	text-decoration: underline;
	font-size: 12px;
}

.answerLabel
{
	font-size:12px;
	font-style: bold;
	color: black;
	text-decoration: italic;
}

.answer
{
	font-size: 12px;
	font-style: bold;
	color: black;
	text-decoration: italic;
	float: left;
	width: 300px;
	border: dotted;
	
}
</style>

<div class="heading">
	<p>Comments module, please post a new question below</p>
</div>

<div class="postQuestion">
	<div class="questionLabel"> Question: <span><input type="text" class="questionTextBox"/></span>
	</div>
</div>
<br>
<br>
<p>Answered questions below</p>

</div>
<div class="question">
		<p class="questionText"> The Question is: Should I move it move it?</p>
		<div class="Answer">
		<div class="answerLabel"> Answer:</div><span class="answer">Yes you should Actually there has been reports for
		hundreds of years that people who move are the healthiest and strongest and have a lot more mating partners. You know
		what I am saying? blah blah blah blah blah blah blah blah blha blah blah blah blah blah blah blah blah blah blah
		blh blah blah</span>
		<span class="discussion">
			<span></p> Discussion </p></span>
			<span><button>Sort</button>
			<span><button>latest</button>
			<span><button>chat</button></span>
			<span><button>register</button></span>
			<span><button>login</button></span>
			
			<div class="comment">
				<span class="username">Taimur says:</span><span class ="userComment">I like to move it move it</span>
			</div>
			<div class="comment">
				<span class="username">Meeral says:</span><span class ="userComment">No you don't like to move it, liar!</span>
			</div>
			<div class="comment">
				<span class="username">Taimur says:</span><span class ="userComment">Yes I do yo, its so much fun</span>
			</div>
			<div class="comment">
				<span class="username">Anonymous says:</span><span class ="userComment">Then y u so fat</span>
			</div>
			<div class="comment">
				<span class="username">Random Guy says:</span><span class ="userComment">hahahahahaah</span>
			</div>
			<div class="comment">
				<span class="username">Random Guy says:</span><span class ="userComment">hahahahahaah</span>
			</div>
			<div class="comment">
				<span class="username">Random Guy says:</span><span class ="userComment">hahahahahaah</span>
			</div>
			<div class="comment">
				<span class="username">Random Guy says:</span><span class ="userComment">hahahahahaah</span>
			</div>
		</span>
		<div class="postComment">
		<textarea></textarea>
		</div>
</div>

<div class="question">
		<p class="text"> The Question is: Should I move it move it?</p>
		<div class="Answer">
		Yes you should
		</div>
		<span class="discussion">
			<span></p> Discussion </p></span>
			<div class="comment">
				<span class="username">Taimur says:</span><span class ="userComment">I like to move it move it</span>
			</div>
			<div class="comment">
				<span class="username">Meeral says:</span><span class ="userComment">No you don't like to move it, liar!</span>
			</div>
			<div class="comment">
				<span class="username">Taimur says:</span><span class ="userComment">Yes I do yo, its so much fun</span>
			</div>
			<div class="comment">
				<span class="username">Anonymous says:</span><span class ="userComment">Then y u so fat</span>
			</div>
			<div class="comment">
				<span class="username">Random Guy says:</span><span class ="userComment">hahahahahaah</span>
			</div>
		</span>
</div>

END;

}

add_action('init', 'boj_js_add_script1');
	
	
function handleComment()
{
	echo "hello bitch";
}

function boj_js_add_script1() 
{
	add_action('wp_footer','TW_commentingModule');
	wp_enqueue_script("jquery");
	wp_enqueue_script('underscore', 'http://localhost:8888/wordpress/wp-content/plugins/TimelessWealth/underscore.js');
	wp_enqueue_script('backbone', 'http://documentcloud.github.com/backbone/backbone.js');
	wp_enqueue_script('models','http://localhost:8888/wordpress/wp-content/plugins/TimelessWealth/models.js');	
}


?>

