(function(window, document, undefined) {
	var EntryView = {};

  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
   EntryView.render = function($entry, activeEntryData) {
   	var entryTemplate = $("#entry-template").html();
   	var renderEntry = Handlebars.compile(entryTemplate);
   	var entry = document.getElementById('entry');
   	EntryModel.loadAll(function(error, entries) {
   		displayView($entry, activeEntryData, renderEntry, entry, error, entries);

	});
};

function displayView($entry, activeEntryData, renderEntry, entry, error, entries) {
if (error) {
   	console.log('Error:', error);
   		} else {
   			if(activeEntryData === null) { //if there is no active entry
				if(entries.length === 0) { //if no entry exists
					CreatingEntryView.render($entry);
				} else { //else view the first entry
					renderTheEntry(renderEntry, entries, entries[0], $entry);
					activeEntryData = entries[0];
				}
			} else { //if there is an active entry, then display it
				renderTheEntry(renderEntry, entries, activeEntryData, $entry);
			if(activeEntryData.id === undefined) { //in case the entry was just made and its id wasn't passed through
				var lastEntryPosition = Object.keys(entries).length;
				activeEntryData.id = entries[lastEntryPosition - 1].id;
			}
		}
	}

	var actionButtons = $("button");
	var newButton = actionButtons.eq(1);
	var editButton = actionButtons.eq(2);
	var deleteButton = actionButtons.eq(3);
	var $select = $("select");
	var map = $(".map");

	newButton.click(function(event) {
		event.preventDefault();
		CreatingEntryView.render($entry);
	});

	editButton.click(function(event) {
		event.preventDefault();
		EditingEntryView.render($entry, activeEntryData);
	});

	deleteButton.click(function(event) {
		event.preventDefault();
		var errorElement = document.getElementsByClassName('error');
		if(activeEntryData !== null) {
			EntryModel.remove(activeEntryData.id, function(error) {
				if (error) {
					errorElement[0].innerHTML = error;
				} else {
					EntryView.render($entry, null);
				}
			});
		}
	});

	$select.change(function(event) {
		event.preventDefault();
		var selectedEntryId = $select.val();
		entries.forEach(function(element){
			if(element.id.toString() === selectedEntryId) {
				EntryView.render($entry, element);
			}
		});
	});

	GoogleMapView.render(map, activeEntryData); //render Google map
}

//This function renders the entry to the display
function renderTheEntry(renderEntry, entries, theEntry, $entry) {
	var finalHTML = renderEntry({
					viewing: true,
					entries: entries,
					activeEntryData: theEntry,
				});
				$entry[0].innerHTML = finalHTML;
}

window.EntryView = EntryView;
})(this, this.document);
