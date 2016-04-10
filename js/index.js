/**
 * index.js: A script file which initializes the homepage for a particular class.
 * 	A grid of selectable students is created, linking to form options for each.
 */

 

/**
 * Populate the body of the page with relevant links and options
 */
function populatePage() {
	// TODO: Acquire list called students from some data structure; divs customized for each
	var classSize = 12; // TODO: actually students.length
	var numRows = classSize / 3;  // TODO: num columns on desktop, mobile
	var maxCols = classSize / numRows;
	
	var numCols = 0;
	var rowDiv = $("<div/>", { "class": "row" });
	for (var i = 0; i < classSize; i++) {
		var div  = createElements(null);
		rowDiv.append(div);
		numCols++;
		if (numCols === maxCols) {
			$("#image-container").append(rowDiv);
			var rowDiv = $("<div/>", { "class": "row" });
			numCols = 0;
		}
	}	
}
 
 

/**
 * Creates and returns the selectable element for a particular student entry
 */
function createElements(student) {
	var div = $("<div/>", { "class": "col-md-4 col-sm-3" });
	
	// Make the icons, put them in their own subgrid
	var phoneIcon = $("<span/>", { "class": "glyphicon glyphicon-earphone" });
	var logIcon = $("<span/>", { "class": "glyphicon glyphicon-list-alt" });
	var incidentIcon = $("<span/>", { "class": "glyphicon glyphicon-alert" });
	
	var icons = [phoneIcon, logIcon, incidentIcon];
	var iconColumn = $("<div/>", {"class": "col-md-3 col-sm-3"});
	for (icon of icons) {
		var row = $("<div/>", {"class": "row"});
		row.append(icon);
		iconColumn.append(row);
	}
	
	var imageSource = "../icons/index/avatar.png" // TODO: specific image for each
	var img = $("<img>", { "class": "img-circle center-block student-photo", "src": imageSource });
	
	img.click(function() {
		window.location.href = "individual-form.html";
	});
	var href = $("<a></a>", { "href": "individual-form.html" });
	href.append(img);
	var imgColumn = $("<div/>", {"class": "col-md-9, col-sm-9"}).append(href);
	
	div.append(imgColumn);
	div.append(iconColumn);	
	return div;
}

/**
 * 
 */

$(document).ready(function() {
	populatePage();
});