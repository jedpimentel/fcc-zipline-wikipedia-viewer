


document.addEventListener( "DOMContentLoaded", function() {
	
	var wikipediaForm = document.getElementById('wikipedia-form'); //unused?
	var textInputField = document.getElementById('text-input-field');
	var TextInputSubmit = document.getElementById('text-input-submit');
	
	textInputField.addEventListener("keypress", function(event) { 
		if(event.keyIdentifier == 'Enter') { searchArticles(); }
	});
	TextInputSubmit.onclick = searchArticles;
	
	
	var scriptId = "wiki-api-request";
	function searchArticles() {
		
		console.log('searching', textInputField.value);
		
		var searchString = textInputField.value;
		
		textInputField.value = '';
		
		// needed to avoid having the <head> bloat out
		if(document.getElementById(scriptId)) { document.getElementById(scriptId).remove(); } // mis-use of .remove()???
		
		var script = document.createElement('script');
		script.src = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchString + "&format=json&callback=displayResponse?";
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	

	
	
}, false);

function displayResponse(data) {
	console.log(data);
	
	var entryClassName = "article-entry";
	var entries = document.getElementsByClassName(entryClassName);
	
	var articleBox = document.getElementById("article-list");
	articleBox.innerHTML = ''; // supposed to be slower than removing nodes individually
	
	
	for (var i = 1; i < data[1].length; i++) {
		var entryName        = data[1][i];
		var entryDescription = data[2][i];
		var entryUrl         = data[3][i];
		
		
		var entry = document.createElement("a");
		entry.href = entryUrl;
		entry.className = entryClassName;
		entry.innerHTML = 
			'<div class="article-title">' + entryName + '</div>' + 
			'<div class="article-description">' + entryDescription + '</div>';
		document.getElementById("article-list").appendChild(entry);
	
	}

}

/*
<a href="..." class="article-entry">
	<div class="article-title">TITLE</div>
	<div class="article-description">description</div>
</a> <!--end .article-entry -->


*/

// http://stackoverflow.com/questions/6132796/how-to-make-a-jsonp-request-from-javascript-without-jquery

