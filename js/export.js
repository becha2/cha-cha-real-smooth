$(function () {

    var display = ["joe"];
    var warning = {};
    
    var table = $('#student-table');
    var rows = table.children();
    for (var r in rows) {
        var row = rows[r];
        if (row.nodeName=="TR"){
            if ($(row).children()[2].innerText=='') {
                warning[row.id] = false;
            } else {
                warning[row.id] = true;
            }
        }
    }


	$('#checkAll').click(function(){
        var isChecked = $(this).prop('checked');
		var table = $('#student-table');
        var rows = table.children();
        for (var r = 0; r < rows.length; r++){
            if (isChecked)
                rows[r].className = "active";
            else
                rows[r].className = warning[rows[r].id] ? 'warning' : '';
            $(rows[r]).find('input:checkbox').prop('checked', isChecked);
        }
	});

    $('tr').click(function(){
        if ($(this).children()[2].innerText=="Notes"){ return; }
        if (this.className=='active'){
            if (warning[this.id]){
                this.className='warning';
                removeDisplay(this.id);
                console.log(display);
                updateDisplay();
            } else {
                this.className='';
                removeDisplay(this.id);
                console.log(display);
                updateDisplay();
            }
        } else {
            this.className='active';
            display.push(this.id);
            console.log(display);
            updateDisplay();
        }
        var shouldBeChecked = this.className == 'active';
        $(this).find('input:checkbox').prop('checked', shouldBeChecked);
        if (!shouldBeChecked)
            $('#checkAll').prop('checked', false);
    });

    function updateDisplay(){
        if (display.length == 0){
            var row = $('#student-table').children()[0];
            var firstName = row.id;
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

    $('#print').click(function () { // print confirmation popup
        $.confirm({
            title: 'Print',
            content: getWarningMessage("print"),
            confirmButton: 'Continue to Print',
            cancelButton: 'Return to Export Screen',
            confirmButtonClass: 'btn-custom',
            icon: 'fa fa-info',
            confirm: function () {
                alert('Logs printed successfully');
            }
        });
    });

    $('#email').click(function (){
        $.confirm({
            title: 'Email',
            content: getWarningMessage("email"),
            confirmButton: 'Send Email to Parents',
            cancelButton: 'Return to Export Screen',
            confirmButtonClass: 'btn-custom',
            confirm: function () {
                alert('Logs emailed successfully');
            }
        });
    });
            

    function getWarningMessage(method){
        var warn = "There are warnings for:\n";
        Object.keys(warning).forEach(function(key,index) {
            if (warning[key]){
                warn += ("- " + key.slice(0,1).toUpperCase() + key.slice(1) + "\n");
            }
        });
        if (warn.slice(-2)!=":\n") {
            return (warn.slice(0,-1) + ". Do you want to continue anyway?");
        } else {
            return "Are you sure you want to "+method+" ?";
        }
    }
});

