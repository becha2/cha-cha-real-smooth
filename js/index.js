/**
 * index.js: A script file which initializes the homepage for a particular class.
 *     A grid of selectable students is created, linking to form options for each.
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
        var div  = createElement(null);
        rowDiv.append(div);
        numCols++;
        if (numCols === maxCols || i === classSize - 1) {
            $("#image-container").append(rowDiv);
            var rowDiv = $("<div/>", { "class": "row" });
            numCols = 0;
        }
    }    
}

/**
 * Creates and returns the selectable element for a particular student entry
 */
function createElement(student) {
    var div = $("<div/>", { "class": "col-md-4 col-sm-3" });
    
    // Make the icons, put them in their own subgrid
    var phoneIcon = ($("<span/>", { "class": "glyphicon glyphicon-earphone" }));
    // phoneIcon.click(function() {
    //     window.location.href = "individual-form.html";
    // });
    var logIcon = $("<span/>", { "class": "glyphicon glyphicon-list-alt" });
    logIcon.click(function() {
        window.location.href = "html/individual-form.html";
    });
    // var incidentIcon = $("<span/>", { "class": "glyphicon glyphicon-alert" });
    // incidentIcon.click(function() {
    //     window.location.href = "html/individual-form.html#incidentReport";
    // });
    
    var iconContainer = $("<div/>", { "class": "image-overlay"});
    var icons = [phoneIcon, logIcon];
    for (icon of icons) {
        iconContainer.append(icon);
    }
    
    var imageSource = "icons/index/avatar.png" // TODO: specific image for each
    var img = $("<img>", { "class": "img-circle center-block student-photo", "src": imageSource });
    
    var imgContainer = $("<div/>", { "class": "img-circle center-block darken" });
    imgContainer.append(img);
    imgContainer.append(iconContainer);
    
    div.append(imgContainer);
    return div;
}

$(document).ready(function() {
    populatePage();
});