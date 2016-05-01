$(function () {

	var formType = getValue('type');
    if (formType === 'individual'){
    	// console.log('working');
        var indivName = getValue('name');
        var className = getValue('class');

        // console.log(indivName, className);
        // $('li:contains(Abigail Choe)').css("background","red");
        $("div.clickable:contains('Class "+className+"')").css({
            "background": "#562A72",
            "color": "#ebebeb"
        });

        $("a:contains('"+indivName+"')").css({
            "color": "#562A72",
            "font-weight": "bold"
        });
        //$("li:contains('"+indivName+"')").css({
        //     "background": "#562A72"
        // });
        // $("li[innerHTML=Abigail Choe]").css("background", "red");

        // console.log(indivName);
        var indivNameContent = $('.form-content').find('.indiv-name');
        // console.log(indivNameContent);
        if (indivName && indivName != "")
            indivNameContent.text(indivName);
        // console.log(indivNameContent.text());
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
    }

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
		var sectionHeading = $(this).parent().prev();
		sectionHeading.click();
        $("#save-dialog").fadeIn("slow").delay(2000).fadeOut();
        var time = new Date($.now());
        $(".last-saved-time").first().text(time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
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