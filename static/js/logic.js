$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        makePredictions();
    });
});

// call Flask API endpoint
function makePredictions() {
    var type = $("#type").val();
    var month = $("month").val();
    var plu = $("#plu").val();
    

    // create the payload
    var payload = {
        "type": type,
        "month": month,
        "plu": plu,
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);

            if (returnedData["prediction"] > 0 ) {
                $("#output").text(returnedData["prediction"]);
            } else {
                $("#output").text("Can't predict your Avocado Toast");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}