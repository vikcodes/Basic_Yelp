(function(window, document, undefined) {
	var CreatingEntryView = {};

  /* Renders a view to allow the user to create an entry. Requires the $entry
  * element. */
  CreatingEntryView.render = function($entry) {
  	var entryTemplate = $("#entry-template").html();
  	var renderEntry = Handlebars.compile(entryTemplate);

  	var finalHTML = renderEntry({
  		creating: true,
  		entries: null,
  		activeEntryData: null,
  	});
  	$entry[0].innerHTML = finalHTML;

	 		var addButton = $("button");

	 		addButton.click(function(event) {
	 			event.preventDefault();
	 			var name = $( "input[name*='name']").val();
	 			var address = $( "input[name*='address']").val();
	 			var description = $( "textarea[name*='description']").val();

	 			var entry = { //create the entry
	 				name: name,
	 				address: address,
	 				description: description,
	 			};

	 			EntryModel.add(entry, function(error) {
	 				if (error) {
	 					var errorElement = document.getElementsByClassName('error');
	 					errorElement[0].innerHTML = error;
	 				} else {
	 					EntryView.render($entry, entry);
	 				}
	 			});

	 		});

	 	}

	 	window.CreatingEntryView = CreatingEntryView;
	 })(this, this.document);
