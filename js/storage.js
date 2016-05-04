/**
 * Handlers for persistent data on the TakeCare site.
 */

var classNames = ["A", "B", "C"];
var studentsA = ["Abigail Choe", "Laura Eckman", "Olivier Midy", "Rebekah Cha"];
var studentsB = ["Joe Desler", "Kyle Jones", "Mandy Wu", "Sarah Brown",];
var studentsC = ["Alice Wonderlin", "Bart Simpson", "Carl James", "Lisa Simpson"];

function buildLocalStorage() {
    console.log("BUILDING");
    // First create storage for class updates
    for (var i = 0; i < classNames.length; i++) {
        className = classNames[i];
        classData = {
                        "activities" : "", 
                        "food" : "",
                        "naps" : "",
                        "last-saved-time" : $.now(),
                        "students" : []
                    };
        switch (className) {
            case "A":
                classData["students"] = studentsA;
                break;
            case "B":
                classData["students"] = studentsB;
                break;
            default:
                classData["students"] = studentsC;
                break;
        }
        window.localStorage.setItem(className, JSON.stringify(classData));
        
        // Now for individual updates;
        var studentNames = classData["students"];
        for (var j = 0; j < studentNames.length; j++) {
            var indivName = studentNames[j];
            indivData = {
                            "parent" : "",
                            "activities" : "",
                            "food" : "",
                            "naps" : "",
                            "diaper" : "",
                            "other" : "",
                            "activities-individual" : "",
                            "food-individual" : "",
                            "naps-individual" : "",
                            "last-saved-time" : $.now()
                        };
            window.localStorage.setItem(indivName, JSON.stringify(indivData));
        }
    }
}

$(function() {
    localStorage.clear();
    if (!window.localStorage.length) {
        buildLocalStorage();
    }
});