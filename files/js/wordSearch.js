setTimeout(function(){

	// from php.js
	function in_array (needle, haystack) {
	  for (key in haystack) {
	    if (haystack[key] == needle) {
	      return true;
	    }
	  }
	  return false;
	}
	 
	// short, common words to skip when counting
	var stopwords = ["president's",'1','2','3','4','5','6','7','8','9','0','one','two','three','four','five','about','actually','always','even','given','into','just','not','Im','thats','its','arent','weve','ive','didnt','dont','the','of','to','and','a','in','is','it','you','that','he','was','for','on','are','with','as','I','his','they','be','at','one','have','this','from','or','had','by','hot','but','some','what','there','we','can','out','were','all','your','when','up','use','how','said','an','each','she','which','do','their','if','will','way','many','then','them','would','like','so','these','her','see','him','has','more','could','go','come','did','my','no','get','me','say','too','here','must','such','try','us','own','oh','any','youll','youre','also','than','those','though','thing','things', 'president', 'Mr', 'Mrs', 'rt', 'who', 'whose', "who's", 'u', 'i', 'presdient', 'presdent', 'presidnt','de', 'le', 'la', 'au', 'du', 'les', 'il', 'elle', "' les", 'eux', 'est', 'qui', 'que', 'prsident', "c'est", 'et', 'tchad', 'deby', 'dby', 'cameroun', 'ivory coast', 'ne', 'ce', 'prime', 'minister', leaderName, leaderNameLow, leaderNameLowSplit[0],leaderNameLowSplit[1],leaderNameLowSplit[2],leaderNameLowSplit[3],leaderNameLowSplit[4],  countryName ];
	 
	// takes the text of a paragraph element as input
	// returns marked up text with repeated words in 'b' tags with a class matching their "stemmed" root

	var input = $('#ctweets').text();
	//console.log ("text: " + input);

	function checkWords() {

		var text = $('#ctweets').text();
		 
		var words = text.split(' ');
		var wordcount = {};

		  
		  // build an object to count word frequency
		$.each(words,function(i){
		    thisWord = String(this).replace(/[\/\\]/,' ').replace(/’/g,"'").replace(/[^a-z' ]/gi,'').toLowerCase();
		    if (!in_array(thisWord,stopwords)) {
		      	var word = thisWord;
		      	if (wordcount[word] > 0 && word.length) {
		        wordcount[word] += 1;
		      	} else {
		        wordcount[word] = 1;
		      }
		    }
		});
		  
	  	// convert the object to an object array
	  	// include only words repeated more than once within the paragraph
		var topwords = []
	    $.each(wordcount,function(w,i){	
	      	topwords.push({'word':w,'freq':i});
	  	});
	  	

		topwords.sort(function(a,b){
			return b.freq - a.freq;
		})
		
		$.each(topwords, function(i, word){
			var w=word.word;
			$('.topwords').append( "<p><a href ='https://twitter.com/search/realtime?q=" + '"' + 	leaderName + '"' + '%20' + '"' + w + '"' + "%22&src=typd'>" + w + '</a>' + "</p>");
			
			if(i===4){
				return false;
			}
		});

		// convert the object array to a flat array
		topwordsArr = new Array();
		$.each(topwords,function(i) {
			topwordsArr.push(String(this['word']));
		  

		});
		    
		 
		// re-parse the output, marking up repeated words based on their stems
		var output = '';
		$.each(words,function(w) {
			var aWord = String(this);

			//var stripWord = stemmer(aWord.replace(/[\/\\]/,' ').replace(/’/g,"'").replace(/[^a-z' ]/gi,'').toLowerCase());
			//if (in_array(stripWord,topwordsArr))
			//output += ' <b class="'+stripWord+'">'+aWord+'</b>';
			//else
			//output += ' '+aWord;
		      
		});
		return output;
		         
		}
		 
		(function($){
		  	// grab common top-level elements
		  	grafs = $('p,ul,ol,blockquote,h1,h2,h3,h4,h5,h6,pre code',$('#content'));
		  	// navigate each element found
		  	$.each(grafs,function(a,g){
		    	// if it's a paragraph, we'll process it
		    	if (grafs[a].tagName == "P") {
		      	$('#work').append($('<p>').html(checkWords($(grafs[a]).text())));
		    	// if not, we just stick it back into the DOM
		    	} else {
		      		$('#work').append(grafs[a]);
		    	}
			});
		   
		  	// set up hover listeners on the 'b' elements
		  	// the class is pulled from the hovered element
		  	// all similar words are highlighted on hover
			$('b','#work').hover(function(){
			    var thisClass = this.className;
			    $('.'+thisClass).addClass('highlight');
			},function(){
			  	$('.highlight').removeClass('highlight');    
		    
		});
	
	})(jQuery);

	setTimeout(function(){
		checkWords ()
	},1000);

},1000);


