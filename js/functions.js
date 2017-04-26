String.prototype.wordSlice = function(index, limit) {
	
	var words = this.split(" ");
	limit = limit || words.length

	words = words.slice(index, limit)

	return words.join(" ");
};

String.prototype.countWords = function() {
	var words = this.split(" ");
	return words.length;
};


function loadNYTSearchResults(api, container, params) {
	
	container.html('<div class="loading"><img src="resources/loading.gif"><span class="message">Loading ...</span></div>');
	
	// Adding the API key to the passed params
	params = params || {}; // in case it wasn't passed
	params['api-key'] = api.apikey;
	
	api.request(params, function(result, status) {

		container.html('');

		if (status === "success") {

			var articles = result.response.docs;
			console.log(result);
			// If there are any results
			if (articles.length) {
				
				for (var i = 0; i < articles.length; i++) {
					var article_json = articles[i];

					var article = $('<article>');

					// IMAGE 
					var image;
					if (article_json.multimedia.length) {
						image = "http://www.nytimes.com/" + article_json.multimedia[1].url;
					} else {
						image = "resources/article.jpg"
					}

					// LINK 
					var article_link = article_json.web_url;

					// HEADER
					var header = $('<header class="image-container">')
					header.css("background-image", "url(\'" + image + "\')");

					// HEADLINE 
					var title = article_json.headline.main;
					
					if (title.countWords() > 5) {
						title = title.wordSlice(0, 5) + " ... ";
					}

					var headline = $("<a href='"+ article_link +"'><h2>" + title + "</h2></a>")
					header.append(headline);

					article.append(header);

					// META 
					var meta = $('<footer class="article-meta">');
					
					//-- AUTHOR(S) 
					if (article_json.byline && article_json.byline.original) {
						var author_name = article_json.byline.original.split("By ").join("");
						var author = $("<div class='author'><strong>By:</strong> " + author_name + "</div>");
						article.append(author);
					}

					//-- ARTICLE SECTION
					if (article_json.section_name) {
						var section = $("<p class='section'><strong>Category:</strong> " + article_json.section_name + "</div>");
						article.append(section);
					}

					//-- DATE
					var pub_date = article_json.pub_date;
					
					// We assign the index of '+' to (@var index) and if it was more than
					// -1 that means that the plus sign exists, so we slice it out.
					if (pub_date && (index = pub_date.indexOf("+")) > -1 ) {
						pub_date = pub_date.slice(0, index);
					}

					var date = new Date(pub_date);

					if(date != "Invalid Date") {
						date = date.toLocaleDateString();
						var dateDiv = $('<div class="date"><strong>Published On:</strong> ' + date + "</div>");
						article.append(dateDiv);
					}

					// SNIPPET
					if (article_json.snippet) {
						var snippet = $('<main>' + article_json.snippet + "</main>")
						article.append(snippet);
					}


					container.append(article);
				}

			} else {
				var errorDiv = $("<div class='error'>Couldn't find anything about '" + params.q + "' :/</div>");

				container.append(errorDiv);
			}

		} else {
			var errorDiv = $("<div class='error'> Something went wrong :/ </div>");

			container.append(errorDiv);
		}
		
	});
}

function loadNYTTopStories(api, container, params) {
	container.html('<div class="loading"><img src="resources/loading.gif"><span class="message">Loading ...</span></div>');
	
	// Adding the API key to the passed params
	params = params || {}; // in case it wasn't passed
	params['api-key'] = api.apikey;
	
	api.request(params, function(result, status) {

		container.html('');

		if (status === "success") {

			var articles = result.results;

			// If there are any results
			if (articles.length) {
				
				for (var i = 0; i < articles.length; i++) {
					var article_json = articles[i];

					var article = $('<article>');

					// IMAGE 
					var image;
					if (article_json.multimedia.length) {
						image = article_json.multimedia[1].url;
					} else {
						image = "resources/article.jpg"
					}

					// LINK 
					var article_link = article_json.url;

					// HEADER
					var header = $('<header class="image-container">')
					header.css("background-image", "url(\'" + image + "\')");

					// HEADLINE 
					var title = article_json.title;
					
					if (title.countWords() > 5) {
						title = title.wordSlice(0, 5) + " ... ";
					}

					var headline = $("<a href='"+ article_link +"'><h2>" + title + "</h2></a>")
					header.append(headline);

					article.append(header);

					// META 
					var meta = $('<footer class="article-meta">');
					
					//-- AUTHOR(S) 
					if (article_json.byline) {
						var author_name = article_json.byline.split("By ").join("");
						var author = $("<div class='author'><strong>By:</strong> " + author_name + "</div>");
						article.append(author);
					}

					//-- ARTICLE SECTION
					if (article_json.section) {
						var section = $("<p class='section'><strong>Category:</strong> " + article_json.section + "</div>");
						article.append(section);
					}

					//-- DATE
					var pub_date = article_json.published_date;
					
					// We assign the index of '+' to (@var index) and if it was more than
					// -1 that means that the plus sign exists, so we slice it out.
					if (pub_date && (index = pub_date.indexOf("+")) > -1 ) {
						pub_date = pub_date.slice(0, index);
					}

					var date = new Date(pub_date);

					if(date != "Invalid Date") {
						date = date.toLocaleDateString();
						var dateDiv = $('<div class="date"><strong>Published on:</strong> ' + date + "</div>");
						article.append(dateDiv);
					}

					// SNIPPET
					if (article_json.abstract) {
						var abstract = $('<main>' + article_json.abstract + "</main>")
						article.append(abstract);
					}

					container.append(article);
				}

			} else {
				var errorDiv = $("<div class='error'>Couldn't find any story' :/</div>");

				container.append(errorDiv);
			}

		} else {
			var errorDiv = $("<div class='error'> Something went wrong :/ </div>");

			container.append(errorDiv);
		}
		
	});
}