// $(document).ready(function() {
//     console.log("Page Loaded");

//     $("#filter").click(function() {
//         makePredictions();
//     });
// });

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

let regions = ['Total U.S.', 
    // 'Albany', # Avoid perfect multicollinearity for all dummy variables notebook cell:19
    'Atlanta',
    'Baltimore/Washington', 'Boise', 'Boston', 'Buffalo/Rochester',
    'California', 'Charlotte', 'Chicago', 'Cincinnati/Dayton', 'Columbus',
    'Dallas/Ft. Worth', 'Denver', 'Detroit', 'Grand Rapids', 'Great Lakes',
    'Harrisburg/Scranton', 'Hartford/Springfield', 'Houston',
    'Indianapolis', 'Jacksonville', 'Las Vegas', 'Los Angeles',
    'Louisville', 'Miami/Ft. Lauderdale', 'Midsouth', 'Nashville',
    'New Orleans/Mobile', 'New York', 'Northeast', 'Northern New England',
    'Orlando', 'Philadelphia', 'Phoenix/Tucson', 'Pittsburgh', 'Plains',
    'Portland', 'Raleigh/Greensboro', 'Richmond/Norfolk', 'Roanoke',
    'Sacramento', 'San Diego', 'San Francisco', 'Seattle', 'South Carolina',
    'South Central', 'Southeast', 'Spokane', 'St. Louis', 'Syracuse',
    'Tampa', 'West', 'West Tex/New Mexico']

function dropdown () {regions.forEach(region => {
    let dropdownRegion = d3.select("#region");
    // console.log(dropdownRegion)
    dropdownRegion.append("option").text(region)
    dropdownRegion.append("value").text(region)
    })};
    
    
dropdown()