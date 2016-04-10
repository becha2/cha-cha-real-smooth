
$(function () {
	// $('#result').load('ajax/test.html #container');
	// var wanted_html = $('class-form.html .form-content');
	// $('.form-container').html()
	$('.section-heading').click(function(){
		var parent = $(this).parent();
		var icon = $(this).find('.glyphicon');
		icon.toggleClass('glyphicon-menu-down glyphicon-menu-right');
	});

	$('#accordion').accordion({
		active: false,
		collapsible: true
	});

	$('.save-btn').click(function(){
		var sectionHeading = $(this).parent().prev();
		sectionHeading.click();
	});

});