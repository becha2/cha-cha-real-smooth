$(function(){
    $(document).ready(function(){
        var openClass = getValue("class");
        if (openClass == "A") { $('#classA-body').collapse('show'); }
        else if (openClass == "B") { $('#classB-body').collapse('show'); }
        else if (openClass == "C") { $('#classC-body').collapse('show'); }
        else {
            $('#classB-body').collapse('show');
        }

        var formType = getValue("type");
        var formUrl = '../html/partials/' + formType + '-form.html';

        $('.form-content').load(formUrl, function () {
            var formScript = document.createElement("script");
            formScript.type = "text/javascript";
            formScript.src = "../js/form.js";
            $('footer').append(formScript);
        });
    });
});