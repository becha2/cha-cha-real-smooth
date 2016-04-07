
$(function () {

	$('.section-body').on('hide.bs.collapse show.bs.collapse', function(){
		var icon = $(this).parent().find('.glyphicon');
		icon.toggleClass('glyphicon-menu-down glyphicon-menu-right');
	});
});