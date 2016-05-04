$(function(){
    $(document).ready(function(){
        var setActive = function(activeSection){
            console.log(activeSection);
            activeSection.css({
                "background": "#562A72",
                "color":"#ebebeb"
            });
            activeSection.addClass('active');
            activeSection.collapse('show');
        }

        var openClass = getValue("class");
        var activeClass = '#class' + openClass + '-body';
        setActive($(activeClass));

        var indivName = getValue("name");
        if (indivName && indivName != ""){
            $("a:contains('"+indivName+"')").css({
                "color": "#562A72",
                "font-weight": "bold"
            });
            $("a:contains('"+indivName+"')").parent().children("div").addClass('indicator-active').removeClass('indicator');

            $("a:contains('"+indivName+"')").parent().children("div").css({
                "class":"indicator-active"
            });
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