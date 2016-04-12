$(function () {
    console.log('javascript loaded');
	$('#select-all').click(function(){
        console.log('registered');
		var table = $('#student-table');
        var rows = table.children();
        console.log("table rows",rows);
        for (var r in rows){
            rows[r].className = "active";
        }
	});

});


