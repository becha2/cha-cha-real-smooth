/**
 * index.js: A script file which initializes the homepage for a particular class.
 *     A grid of selectable students is created, linking to form options for each.
 */

/**
 * Populate the body of the page with relevant links and options.
 * This page is static, so we default to populating for class B.
 */
function populatePage() {
    var students = studentsB;

    // TODO: Acquire list called students from some data structure; divs customized for each
    var classSize = students.length;
    var numRows = classSize / 4;  // TODO: num columns on desktop, mobile
    var maxCols = classSize / numRows;
    
    var numCols = 0;
    var rowDiv = $("<div/>", { "class": "row" });
    for (var i = 0; i < classSize; i++) {
        var div  = createElement(students[i]);
        var col = $("<div/>", { "class": "col-md-3" });
        col.append(div);
        rowDiv.append(col);
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
    var div = $("<div/>", { "class": "col-center indiv-container" });
    
    // Make the icons, put them in their own subgrid
    var name = $("<div/>", { "class": "student-name"});
    name.text(student);
    
    var options = $("<div/>", { "class": "student-prompt" });
    options.text("");

    var phoneIcon = $("<span/>", { "class": "student-icon glyphicon glyphicon-earphone"});

        // part of popover implementation (changed to popup)
        // , "data-toggle": "popover", "title": "Contact Info", "data-content": "Dad: (617)710-6158", "data-trigger": "focus" });

    // phoneIcon.click(function() {
    //     window.location.href = "individual-form.html";
    // });
    phoneIcon.hover(function() {
        options.text("Contact Info");
    }, function() {
        options.text("");
    });
    
    var logIcon = $("<span/>", { "class": "student-icon glyphicon glyphicon-list-alt" });
    logIcon.click(function() {
        var studentURL = student.replace(" ", "+");
        window.location.href = "html/form.html?class=B&type=individual&name=" + studentURL;
    });
    logIcon.hover(function() {
        options.text("Daily Log");
    }, function() {
        options.text("");
    });
    
    var iconContainer = $("<div/>", { "class": "image-overlay"});
    iconContainer.append(options);
    var icons = [phoneIcon, logIcon];
    for (icon of icons) {
        iconContainer.append(icon);
    }

    
    var imageSource = "icons/index/avatar.jpg" // TODO: specific image for each
    var img = $("<img>", { "class": "center-block student-photo", "src": imageSource });
    
    var imgContainer = $("<div/>", { "class": "center-block student-photo-container darken" });
    imgContainer.append(img);
    imgContainer.append(iconContainer);
    
    div.append(imgContainer);
    div.append(name);
    return div;
}

$(function() {
    populatePage();

    $(".glyphicon-earphone").click(function () { // callParents confirmation popup
        $.confirm({
            title: 'Confirmation',
            content: 'Call (510) 888-8888?',
            confirmButton: 'Cancel',
            cancelButton: 'Call',
            cancelButtonClass: 'btn btn-confirm-default',
            confirmButtonClass: 'btn btn-custom-cancel',
            icon: 'fa fa-info',
            cancel: function () {
                alert('Calling...');
            }
        });
    });

    // Contact info in popover (changed to popup)
    // $(".glyphicon-earphone").popover(
    //         {'content': "",
    //             'title': "",
    //             'tabindex': "0",
    //             'data-trigger': "focus",
    //             'trigger': 'focus click',
    //             'placement': 'top'});

    $('.glyphicon-earphone').on(':visible', function(e){
        console.log(e);
    });

    // $('[data-toggle="popover"]').popover(); 
});
