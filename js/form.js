$(function () {
    var formType = getValue('type');
    if (formType === 'individual') {
        var indivName = getValue('name');
        var className = getValue('class');

        $("div.clickable:contains('Class "+className+"')").css({
            "background": "#562A72",
            "color": "#ebebeb"
        });

        // $("a:contains('"+indivName+"')").css({
        //     "color": "#562A72",
        //     "font-weight": "bold"
        // });

        // $("a:contains('"+indivName+"')").parent().children("div").addClass('indicator-active').removeClass('indicator');

        // $("a:contains('"+indivName+"')").parent().children("div").css({
        //     "class":"indicator-active"
        // });

        var indivNameContent = $('.form-content').find('.indiv-name');
        if (indivName && indivName != "") {;
            indivNameContent.text(indivName);
        }
        
        var indivData = JSON.parse(window.localStorage.getItem(indivName));
        $("#accordion textarea").each(function() {
            var parentName = $(this).parent().attr("id");
            var a = parentName.split("-");
            var formSection = parentName.split("-")[0];
            if (isClassCategory(formSection)) {
                var formSectionIndividual = formSection + "-individual";
                $(this).val(indivData[formSectionIndividual]);
                
                var className = getValue("class");
                var classData = JSON.parse(window.localStorage.getItem(className));
                
                var id = "#" + formSection + "-class-view";
                var classUpdateView = $(id);
                classUpdateView.html(classData[formSection]);
            } else {
                $(this).val(indivData[formSection]);
            }
        });
    } else {
    	var className = getValue('class');
    	var indivNameContent = $('.form-content').find('.indiv-name');
    	if (className && className != "")
    		indivNameContent.text(formType.toUpperCase() + ' ' + className);

        $("div.clickable:contains('Class "+className+"')").css({
            "background": "#562A72",
            "color": "#ebebeb"
        });

    	//get students
    	var classList = $($('#' + formType + className + '-body').find('.list-group')[0]);
    	var students = []
    	classList.find('li').each(function(){
    		students.push($(this).text());
    	});
    	$('.form-content').find('.indiv-contact').text(students.join(', '));
        
        var classData = JSON.parse(window.localStorage.getItem(className));
        $('.form-content').find('.indiv-contact').text(classData["students"].join(', '));
        
        $("#accordion textarea").each(function() {
            var parentName = $(this).parent().attr("id");
            var formSection = parentName.split("-")[0];
            $(this).val(classData[formSection]);
        });
    }
    
    $(".last-saved-date").first().text(new Date().toLocaleDateString(navigator.language, {weekday: 'long', month: 'long',  day: '2-digit', year: 'numeric'}));

    $('.section-heading').click(function(){
        var parent = $(this).parent();
        var icon = $(this).find('.glyphicon');
        icon.toggleClass('glyphicon-menu-down glyphicon-menu-right');
    });

    $('#accordion .section-heading').click(function() {
          $(this).next().toggle('slow');
          return false;
      }).next().show();
      
    

    $('.save-btn').click(function(){
        var textField = $(this).parent().find("textarea");
        var input = textField.val();
        var parentName = $(this).parent().attr("id");
        var formSection = parentName.split("-")[0];
        var name = "";
        
        if (formType === "individual") {
            name = getValue('name');
            updateIndividualData(name, formSection, input);
        } else {
            name = getValue("class");
            updateClassData(name, formSection, input);
        }
        
        var sectionHeading = $(this).parent().prev();
        sectionHeading.click();
        $("#save-dialog").fadeIn("slow").delay(2000).fadeOut();
        
        var newTime = $.now();
        
        var data = JSON.parse(window.localStorage.getItem(name));
        console.log(name);
        console.log(data);
        var lastSavedTime = data["last-saved-time"];
        
        var time = new Date(newTime - lastSavedTime);
        data["last-saved-time"] = newTime;
        window.localStorage.setItem(name, JSON.stringify(data));
        $(".last-saved-time").first().text(time.toLocaleTimeString(navigator.language, {minute:'numeric'}) + " minutes ago.");
    });

    $("#classA-title").click(function(){
        $("#classA-body").collapse('show');
        $("#classB-body").collapse('hide');
        $("#classC-body").collapse('hide');
    });

    $("#classB-title").click(function(){
        $("#classA-body").collapse('hide');
        $("#classB-body").collapse('show');
        $("#classC-body").collapse('hide');
    });

    $("#classC-title").click(function(){
        $("#classA-body").collapse('hide');
        $("#classB-body").collapse('hide');
        $("#classC-body").collapse('show');
    });
});


function updateIndividualData(indivName, formSection, input) {
    var indivData = JSON.parse(window.localStorage.getItem(indivName));
    // We update both the combined entries of class and individual, and
    // the standalone individual entries, if applicable
    if (isClassCategory(formSection)) {
        var className = getValue("class");
        var classData = JSON.parse(window.localStorage.getItem(className));
        var formSectionIndividual = formSection + "-individual";
        indivData[formSection] = classData[formSection] + "\n\n" + input;
        indivData[formSectionIndividual] = input;
    } else {
        indivData[formSection] =  input;
    }
    window.localStorage.setItem(indivName, JSON.stringify(indivData));
}

function updateClassData(className, formSection, input) {
    var classData = JSON.parse(window.localStorage.getItem(className));
    var formSectionIndividual = formSection + "-individual";

    classData[formSection] = input;
    window.localStorage.setItem(className, JSON.stringify(classData));
    
    for (student of classData["students"]) {        
        var indivData = JSON.parse(window.localStorage.getItem(student));
        indivData[formSection] = input + "\n\n" + indivData[formSectionIndividual];
        window.localStorage.setItem(student, JSON.stringify(indivData));
    }
}

// TODO: this is probably dead code, leaving it just in case
function buildClassList(className) {
    var formType = "class";
    var classList = $($('#' + formType + className + '-body').find('.list-group')[0]);
    var students = []
    classList.find('li').each(function(){
        students.push($(this).text());
    });
    return students;
}

function isClassCategory(formSection) {
    if ($.inArray(formSection, ["activities", "food", "naps"]) === -1) {
        return false;
    }
    return true;
}