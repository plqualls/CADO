// Append the dropdown button for the regions.
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

function dropdown() {
    regions.forEach(region => {
        let dropdownRegion = d3.select("#region");
        // console.log(dropdownRegion)
        dropdownRegion.append("option").text(region)
    })
};


dropdown()

// filter the table

// read the data

var data = d3.csv('/tables')

// console.log(tableData)
// console.log(Object.entries)
// console.log(tableData[0])

// just to know button clicked 
d3.selectAll("button").on("click", function () {
    console.log(this)
});


// function generateTable(table, data) {
//     tableHtml = d3.select("tbody")
//     tableHtml.html("")
//     for (let element of data) {
//         // add a row 
//         let row = table.insertRow();
//         for (key in element) {
//             // creates a new cell
//             let cell = row.insertCell();
//             // creates a new text node
//             let text = document.createTextNode(element[key]);
//             // appends the text node to the cell
//             cell.appendChild(text);
//         }
//     }
// };
// grab table and pass that to our function
// let table = document.querySelector("tbody");
// generateTable(table, tableData);
// --------------------------------------------
//
//filter the table function
function filterData(userInput) {
    input = d3.select(userInput);
    inputValue = input.property("value");
    return inputValue
}

// select the button(event)
filterButton = d3.select("#filter-btn");

// call `on` (event lessener) to run the function that will work 
filterButton.on("click", () => {
    // filter the input from the table
    filterTable = tableData.filter(item => (item.datetime === filterData("#datetime") || filterData("#datetime") === "")
        && (item.city === filterData("#city") || filterData("#city") === "")
        && (item.state === filterData("#state") || filterData("#state") === "")
        && (item.country === filterData("#country") || filterData("#country") === "")
        && (item.shape === filterData("#shape") || filterData("#shape") === ""));
    console.log("filterTable", filterTable);
    generateTable(table, filterTable);


});

// reset the table from the begnning button 
resetButton = d3.select("#reset-btn")
resetButton.on("click", () => {
    generateTable(table, tableData)
    // clear the input fileds 
    document.getElementById('datetime').value = ''
    document.getElementById('city').value = ''
    document.getElementById('state').value = ''
    document.getElementById('country').value = ''
    document.getElementById('shape').value = ''
});