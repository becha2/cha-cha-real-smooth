$(function () {

    var warning = {joe: 0, kyle: 0, mandy: 0, sarah: 0};
    
    // creating preview
    var classData = {};
    classData.joe = JSON.parse(window.localStorage.getItem("Joe Desler"));
    classData.kyle = JSON.parse(window.localStorage.getItem("Kyle Jones"));
    classData.mandy = JSON.parse(window.localStorage.getItem("Mandy Wu"));
    classData.sarah = JSON.parse(window.localStorage.getItem("Sarah Brown"));
    $(".textarea").each(function() {
        console.log(1);
        var name = $(this).attr("class").split(" ")[1];
        var indivData = classData[name];
        var sectionName = $(this).attr("id");
        var formSection = sectionName.split("-")[0];
        var info = document.createElement("p");
        $(info).text(indivData[formSection]);
        if (indivData[formSection] == "" || indivData[formSection] == "\n\n"){
            //newlines get added if you erase old class data
            warning[name] = warning[name] + 1;
        }
        $(this).html(info);
    });

    var table = $('#student-table');
    var rows = table.children();
    for (var r in rows) {
        var row = rows[r];
        if (row.nodeName=="TR"){
            if (warning[row.id] == 6){
                row.className = "warning";
                row.children[2].innerHTML = "Absent: No sections completed";
            } else if (warning[row.id]) {
                row.className = "warning";
                row.children[2].innerHTML = "Missing Forms <span class=\"badge\">" + warning[row.id] + "</span>";
            }
        }
    }

    setCarouselHeight('#carousel-example');

    function setCarouselHeight(id)
    {
        var slideHeight = [];
        $(id+' .item').each(function()
        {
            // add all slide heights to an array
            slideHeight.push($(this).height());
        });

        // find the tallest item
        max = Math.max.apply(null, slideHeight);

        // set the slide's height
        $(id+' .carousel-content').each(function()
        {
            $(this).css('height',max+'px');
        });
    }


	$('#checkAll').click(function(){
        var isChecked = $(this).prop('checked');
		var table = $('#student-table');
        var rows = table.children();
        for (var r = 0; r < rows.length; r++){
            rows[r].className = warning[rows[r].id] ? 'warning' : '';
            $(rows[r]).find('input:checkbox').prop('checked', isChecked);
        }
	});

    $('tr').click(function(){
        if ($(this).children()[2].innerText=="Notes"){ return; }
        if (this.className=='active'){
            if (warning[this.id]){
                this.className='warning';
            } else {
                this.className='';
            }
        } else {
            this.className='active';
        }
        var shouldBeChecked = this.className == 'active';
        $(this).find('input:checkbox').prop('checked', shouldBeChecked);
        if (!shouldBeChecked)
            $('#checkAll').prop('checked', false);
    });

    $('#print').click(function () { // print confirmation popup
        $.confirm({
            title: 'Print',
            content: getWarningMessage("print"),
            // warning: cancel button is actually confirm button
            // (for compliance with jquery-confirm layout)
            cancelButton: 'Continue to Print',
            confirmButton: 'Cancel',
            confirmButtonClass: 'btn btn-custom-cancel',
            cancelButtonClass: 'btn btn-confirm-default',
            icon: 'fa fa-info',
            cancel: function () {
                alert('Logs printed successfully');
            }
        });
    });

    $('#email').click(function (){
        $.confirm({
            title: 'Email',
            content: getWarningMessage("email"),
            // warning: cancel button is actually confirm button
            // (for compliance with jquery-confirm layout)
            cancelButton: 'Send Email to Parents',
            confirmButton: 'Cancel',
            confirmButtonClass: 'btn btn-custom-cancel',
            cancelButtonClass: 'btn btn-confirm-default',
            cancel: function () {
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

