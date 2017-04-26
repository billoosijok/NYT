// On Window Load
$(function() {


	// Global UI Outlets
	var searchSection = $("#search");
	var topStoriesSection = $("#top-stories");

	var search_articleContainer = searchSection.find('.article-list .container');
	var topStories_articleContainer = topStoriesSection.find('.article-list .container');

	var searchForm = $('#search-form');

	// API Connections
	var searchAPI = new API_Connect({
		url : 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
		apikey : '/* API Key */'
	});

	var topStoriesAPI = new API_Connect({
		url: 'https://api.nytimes.com/svc/topstories/v2/home.json',
		apikey: '/* API Key */'
	});

	init();

	function init() {
		loadNYTTopStories(topStoriesAPI, topStories_articleContainer);
		$('.tabs').tabs();

		// Event Handlers
		searchForm.submit(function(e) {
			e.preventDefault();
			
			var query = $(this).find('#search-box').val();
			
			if (query.length > 0) {
				loadNYTSearchResults(searchAPI, search_articleContainer, {q: query});
			} else {
				search_articleContainer.html("<div class='error'>Please enter a search query!</div>")
			}
		});
	}
	
});




