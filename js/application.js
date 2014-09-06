$(document).ready(function() {
	setupGlossaryTerms();
	$('#glossary-search-field').typeahead({                                
		name: 'terms',
		prefetch: 'data/glossary.json'
	});
	$('#glossary-search-field').keyup(function(event) {
		var suggestedSlugs = new Array();
		var datasets = $('div.tt-dataset-terms p');
		$.each(datasets, function(index, dataset) {
			var selectedSlug = convertToSlug($(dataset).text());
			suggestedSlugs.push(selectedSlug);
		});
		hideOrShowTermsBasedOnSuggestions(suggestedSlugs);
	});
	$('button.clear-button').click(function(event) {
		$('#glossary-search-field').val('');
		hideOrShowTermsBasedOnSuggestions(new Array());
		return false;
	});
});
/*
 * Sets up the glossary terms on the page
 * @return void
 */
function setupGlossaryTerms() {
	var termsDiv = $('div#glossary_terms');
	termsDiv.html("<div class='alert alert-info'><strong>Loading...</strong></div>");
	$.getJSON('data/glossary.json', {}, function(json, textStatus) {
		termsDiv.html('');
		$.each(json, function(index, term) {
			var glossaryItem = $('<div/>')
											.attr('data-slug', convertToSlug(term.value))
											.addClass('panel panel-info')
											.html('<div class="panel-heading"><h3 class="panel-title">'+term.value+'</h3></div><div class="panel-body">'+term.definition+'</div>');
			termsDiv.append(glossaryItem);
		});
	});
};
/*
 * Hides or Shows terms based on the suggestion array of slugs
 * @param Array suggestedSlugs an array of slugs suggested by TypeAhead
 * @return void
 */
function hideOrShowTermsBasedOnSuggestions(suggestedSlugs) {
	var searchParam = $('#glossary-search-field').val();
	if (suggestedSlugs.length == 0 && searchParam != "") {
		$('div#glossary_terms > div').hide('fast');
		$('div#glossary_terms').append("<div class='alert alert-danger'><strong>Sorry, no results found!</strong></div>");
	} else {
		$('div#glossary_terms div.alert').remove();
		$('div#glossary_terms > div').each(function(index, term) {
			var termEle = $(term);
			var termSlug = termEle.attr('data-slug');
			if (($.inArray(termSlug, suggestedSlugs) > -1)) {
				termEle.show('fast');
			} else if (searchParam == "") { 
				termEle.show('fast');
			} else {
				termEle.hide('fast');
			};
		});
	};
};
/*
 * Creates a slug from a string of text
 * @param String text the text to slugify
 * @return String
 */
function convertToSlug(text){
	return text
		.toLowerCase()
		.replace(/ /g,'-')
		.replace(/[^\w-]+/g,'');
};