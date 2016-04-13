/**
 * index.js: A script file which initializes the homepage for a particular class.
 *     A grid of selectable students is created, linking to form options for each.
 */

/**
 * Populate the body of the page with relevant links and options
 */
function populatePage() {
    var students = ["Joe", "Mandy", "Kyle", "Sarah"];

    // TODO: Acquire list called students from some data structure; divs customized for each
    var classSize = students.length;
    var numRows = classSize / 4;  // TODO: num columns on desktop, mobile
    var maxCols = classSize / numRows;
    
    var numCols = 0;
    var rowDiv = $("<div/>", { "class": "row" });
    for (var i = 0; i < classSize; i++) {
        var div  = createElement(students[i]);
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
    var div = $("<div/>", { "class": "indiv-container" });
    
    // Make the icons, put them in their own subgrid
    var name = $("<div/>", { "class": "student-name"});
    name.text(student);

    var phoneIcon = $("<span/>", { "class": "student-icon glyphicon glyphicon-earphone" });
    // phoneIcon.click(function() {
    //     window.location.href = "individual-form.html";
    // });
    var logIcon = $("<span/>", { "class": "student-icon glyphicon glyphicon-list-alt" });
    logIcon.click(function() {
        window.location.href = "html/form.html?class=B&type=individual";
    });
    // var incidentIcon = $("<span/>", { "class": "glyphicon glyphicon-alert" });
    // incidentIcon.click(function() {
    //     window.location.href = "html/individual-form.html#incidentReport";
    // });
    
    var iconContainer = $("<div/>", { "class": "image-overlay"});
    iconContainer.append(name);
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
