$(function () {

    var display = ["joe"];

	$('#select-all').click(function(){
		var table = $('#student-table');
        var rows = table.children();
        for (var r in rows){
            rows[r].className = "active";
        }
	});

    $('tr').click(function(){
        if ($(this).children()[1].innerText=="Notes"){ return; }
        if (this.className=='active'){
            if ($(this).children()[1].innerText==''){
                this.className='';
                removeDisplay($(this).children()[0].innerText.toLowerCase());
                console.log(display);
                updateDisplay();
            } else {
                this.className='warning';
                removeDisplay($(this).children()[0].innerText.toLowerCase());
                console.log(display);
                updateDisplay();
            }
        } else {
            this.className='active';
            display.push($(this).children()[0].innerText.toLowerCase());
            console.log(display);
            updateDisplay();
        }
    });

    function updateDisplay(){
        if (display.length == 0){
            var row = $('#student-table').children()[0];
            var firstName = $(row).children()[0].innerText.toLowerCase();
            display.push(firstName);
        }
        var goalSrc = "../sampleForms/" + display[display.length-1] +  ".pdf";
        var currentSrc = $('#pdf').children()[0].src;
        if (currentSrc.indexOf(display[display.length-1]) == -1){   // only update if not displaying correctly
            $('#pdf').children()[0].src = goalSrc;
        }
    }

    function removeDisplay(name){
        var index = display.length;
        for (var i in display){
            if (display[i]==name){
                index = i;
            }
        }
        if (index != display.length){
            display.splice(index,1);
        }
    }

});


