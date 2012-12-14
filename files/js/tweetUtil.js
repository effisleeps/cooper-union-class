var tweetUtil = {

	"tweets":{},
	"getTweets": function(searchTerm, rpp, callback) {

		var leaderName = country.leaderName;
		var countryName = country.name
		
		//console.log (searchTerm, rpp);
		//set some defaults
		if(searchTerm === undefined) {
			console.log("searchTerm undefined");
		}

		if(rpp === undefined) {
			console.log("rpp undefined, setting default to 10");
			rpp = 10;
		}

		//construct the url based on the two parameters passed into the function
		var searchUrl = 'http://search.twitter.com/search.json?q=' + searchTerm + 											"&rpp=" + rpp + "&include_entities=1&result_type=recent";
		
		//console.log("Search url: "+searchUrl);
		
		

		//run the ajax query
		$.ajax({

			// our query URL
			url: searchUrl,

			// our specified data-type
			dataType:'jsonp',

			success:function(response){

				tweets = response.results;
				if(typeof(callback) === "function") {
					callback(response);
					//console.log("The ajax request callback function has been fired.");
				}

			},

			// Send an alert if our Ajax was failed.
			error: function(){
				alert('Error, error: does not compute.');
			}

		});										

 	},
 
	"getLtweets": function(searchTerm, rpp, callback) {

		//console.log (searchTerm, rpp);
		//set some defaults
		if(searchTerm === undefined) {
		console.log("searchTerm undefined");
		}

		if(rpp === undefined) {
		console.log("rpp undefined, setting default to 10");
		rpp = 10;
	};

	//Local url Query
	
	var searchLocalurl = 'http://search.twitter.com/search.json?q=' + searchTerm + "&rpp=" + rpp + '&include_entities=1&result_type=recent&geocode=' + country.longitude + ',' + country.latitude+ ',' + '200km';
	//console.log (searchLocalurl);
	$.ajax({

		// our query URL
		url: searchLocalurl,

		// our specified data-type
		dataType:'jsonp',

		success:function(response){

			ltweets = response.results;

			if(typeof(callback) === "function") {
				callback(response);
				//console.log("The ajax request callback function has been fired.");
			}
		},

		// Send an alert if our Ajax was failed.
		error: function(){
			alert('Error, error: does not compute.');
		}

		});										

 	},
	 
 	//display tweets function
 
 	"displayTweets": function(tweets) {

		//console.log("displayTweets: attempting to display tweets");

		//loop through each tweet to display it
		$.each(tweets, function(index, tweet) {
		
		var tweetHTML = $("<li class='tweet' id='" + tweet.from_user + "'>" + "<a href = 'https://twitter.com/" + tweet.from_user + "/status/" + tweet.id_str + "'>" + "<span class='username'>" + "@" + tweet.from_user  + " - " + "</span>" + "<span class ='text'>" + tweet.text + "</span></li></a>");

		//color plays
		var numberColor = tweet.id_str.split('');
		var addNumCol =Number( numberColor [15]);
		var subNumCol = Number(numberColor [16])  ;
		var minusNumCol = Number(numberColor [5]) * 7;

		tweetHTML.css('background-color', "rgba(" + (281 - Number(minusNumCol)) + ',' + (261 - Number(subNumCol)) + "," + (274 + Number(addNumCol)) + ",0.1)");

		//take the tweet html we've constructed, and add it to the DOM
		
		var tweetHeight = $(".twitter-one").height();
		var ulHeight = $("#tweets").height();
		
		if (440 - ulHeight  > 70) {
			$(tweetHTML).appendTo("#tweets");
		} else {};
		
		
	});

 	},
	 	
 	//Social tweets function
 	
  	"socialTweets": function(tweets) {

		//loop through each tweet to display it
		$.each(tweets, function(index, tweet) {
	
			var tweetBrk= "['" + tweet.text.split('') + "']";
		
			if (tweet.entities.user_mentions.length === 0 ) { }
			
			else {
			var socialHTML = $("<li class='tweet' id='" + tweet.id_str + "'>" + "<a href = 'https://twitter.com/" + tweet.from_user + "/status/" + tweet.id_str + "'>" + "<span class='username'>" + "@" + tweet.from_user  + " - " + "</span>" + "<span class ='text'>" + tweet.text + "</span></li></a>");
		
		var numberColor = tweet.id_str.split('');
		var addNumCol =Number(numberColor [17]) * 8;
		var subNumCol = Number(numberColor [16]) ;
		var minusNumCol = Number(numberColor [5]);
	
		socialHTML.css('background-color', "rgba(" + (281 + Number(addNumCol)) + ',' + (261 - Number(subNumCol)) + "," + (274 + Number(addNumCol)) + ",0.1)");

			};


		//take the tweet html we've constructed, and add it to the DOM
	
			$(socialHTML).appendTo("#stweets");

		});

 	},
	 	
	//Local tweets function
	 
 	"localTweets": function(ltweets) {

		//loop through each tweet to display it
		$.each(ltweets, function(index, tweet) {
	
			//console.log (tweet);
			
			var localHTML = "<li class='tweet' id='" + tweet.id_str + "'>" + "<a href = 'https://twitter.com/" + tweet.from_user + "/status/" + tweet.id_str + "'>" + "<span class='username'>" + "@" + tweet.from_user  + " - " + "</span>" + "<span class ='text'>" + tweet.text + "</span></li></a>";

			//take the tweet html we've constructed, and add it to the DOM
		
			$(localHTML).appendTo("#ltweets");

		});

 	},
 
 	//Combine tweet text function
 	
	"combineTweets": function(tweets) {

		//loop through each tweet to display it
		$.each(tweets, function(index, tweet) {
	
			var combineHTML = "<p class='combtweet'>" + tweet.text + "</p>";
		
			//take the tweet html we've constructed, and add it to the DOM
		
			$(combineHTML).appendTo("#ctweets");

		});

	},
		 
};
	
