(function(window, document, undefined) {
	var EditingEntryView = {};

  /* Renders a view to allow the user to edit an entry. Requires the $entry
  * element and an object representing the active entry. */
  EditingEntryView.render = function($entry, activeEntryData) {
  	var entryTemplate = $("#entry-template").html();
  	var renderEntry = Handlebars.compile(entryTemplate);

  	var finalHTML = renderEntry({
  		editing: true,
  		entries: null,
  		activeEntryData: activeEntryData,
  	});
  	$entry[0].innerHTML = finalHTML;

	 		var updateButton = $("button");

	 		updateButton.click(function(event) {
	 			event.preventDefault();
	 			activeEntryData.name = $( "input[name*='name']").val();
	 			activeEntryData.address = $( "input[name*='address']").val();
	 			activeEntryData.description = $( "textarea[name*='description']").val();

	 			EntryModel.update(activeEntryData, function(error) { //update the entry with the new data.
	 				if (error) {
	 					var errorElement = document.getElementsByClassName('error');
	 					errorElement[0].innerHTML = error;
	 				} else {
	 					EntryView.render($entry, activeEntryData);
	 				}
	 			});

	 		});

	 	};

	 	window.EditingEntryView = EditingEntryView;
	 })(this, this.document);
