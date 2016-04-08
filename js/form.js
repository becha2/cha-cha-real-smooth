
$(function () {

	$('.section-heading').click(function(e){

		var parent = $(this).parent();
		var icon = parent.find('.glyphicon');
		icon.toggleClass('glyphicon-menu-down glyphicon-menu-right');
	});

	$('#accordion2').accordion({
		active: false,
		collapsible: true
	});

});