//signup.js 
// add your JavaScript code to this file


//onDocReady
//called when the document is ready for manipulation
function onDocReady() {
    //document is now ready for manipulation
    var stateSelect = $('.us-states');
    var idx;
	var state;
	var option;
	for (idx = 0; idx < usStates.length; ++idx) {
	    state = usStates[idx];
	    //code to create new option element, populate, and append
	    option = $(document.createElement('option'));
        option.attr('value', state.abbreviation);
        option.html(state.name);
        stateSelect.append(option);
	}
    

    $('.signup-form').submit(function(){
	    //code to execute when the sign-up form is submitted
	    //this is the raw DOM form element
	    //wrap it in a jQuery object so we can use jQuery methods on it
	    var signupForm = $(this);
	    //select a descendant input element with the name "addr-1"
	   	var addr1Input = signupForm.find('input[name="addr-1"]');
	    var addr1Value = addr1Input.val();
	    var zipInput = signupForm.find('input[name="zip"]');
	    var zipValue = zipInput.val();
	    if(addr1Value.length > 0){
    		if(zipValue.length === 0) {
    			alert('You forgot to put in your zipcode');
    			return false;
    		}

	    }else {
	    	return false;
	    }

	});  

	$('.cancel-signup').click(function(){
	    //code to run when user clicks "No Thanks!" button
	    //show the modal confirmation dialog
	    //and don't reset window.location until the user clicks
	    //the "Yes, Get Me Out of Here!" button
	    $('.cancel-signup-modal').modal();
	}); //cancel-signup click

	//add this at the end of your document ready function
	$('.btn-abandon').click(function(){
	    window.location = 'http://www.google.com';
	});
    
} //onDocReady()

//tell jQuery to call the onDocReady function when 
//the document ready event is raised
jQuery(document).ready(onDocReady);