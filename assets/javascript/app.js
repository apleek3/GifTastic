$(document).ready(function () {
    console.log("Ready!");//lets me know jQuery is G2G

    var astronomicalBodies = []; //global array to store the inputs

    function makeButtons() {

        $("#astronomy").empty();

        // Looping through the array of astronomical bodies
        for (var i = 0; i < astronomicalBodies.length; i++) {
            var a = $("<button>"); // generates buttons for each astrobody in the array
            a.addClass(""); // Adds a class   
            a.attr("data-name", astronomicalBodies[i]);// Adding a data-attribute with a value of the movie at index i
            a.text(astronomicalBodies[i]); // Providing the button's text with a value of the movie at index i
            $("#astronomy").append(a); // Adding the button to the HTML
        }
    }

    $("#addAstronomy").on("click", function (event) { // This function handles events where one button is clicked
        event.preventDefault();// Prevents the buttons default behavior when clicked
        var astronomy = $("#astronomy-input").val().trim(); // This line grabs the input from the textbox and trims out any extra space
        astronomicalBodies.push(astronomy); // Adding the movie from the textbox to our array
        makeButtons();// Calls makeButtons function
    });

    makeButtons();

    $("#astronomy").on("click", function () {
        var state = $(this).attr("data-state");        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        if (state === "still") {        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");     // Then, set the image's data-state to animate
        } else {        // Else set src to the data-still value
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


}); // ENDING BRACKET OF THE .ready function. DO NOT TOUCH!!!!

