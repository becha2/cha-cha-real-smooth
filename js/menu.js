$(function(){
	function getValue(varname) {
 	 		// First, we load the URL into a variable
  			var url = window.location.href;
  			console.log(url);
  			// Next, split the url by the ?
  			var qparts = url.split("?");
  			// Check that there is a querystring, return "" if not
  			if (qparts.length == 0) { return ""; }
		  	// Then find the querystring, everything after the ?
  			var query = qparts[1];
  			if (!query)
  				return '';
  			// Split the query string into variables (separates by &s)
  			var vars = query.split("&");
  			// Initialize the value with "" as default
  			var value = "";

  			// Iterate through vars, checking each one for varname
  			for (i=0;i<vars.length;i++) {
    			// Split the variable by =, which splits name and value
    			var parts = vars[i].split("=");
       			// Check if the correct variable
    			if (parts[0] == varname) {
      				// Load value into variable
      				value = parts[1];

      				// End the loop
      				break;
    			}
  			}
  		// Convert escape code
  		value = unescape(value);
		// Convert "+"s to " "s
  		value.replace(/\+/g," ");
  		// Return the value
  		return value;
	}

	$(document).ready(function(){
		var openClass = getValue("class");
		if (openClass == "A") { $('#classA-body').collapse('show'); }
		else if (openClass == "B") { $('#classB-body').collapse('show'); }
		else if (openClass == "C") { $('#classC-body').collapse('show'); }
		else {
			$('#classB-body').collapse('show');
		}
		
	});
});