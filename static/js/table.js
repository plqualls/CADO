// Append the dropdown button for the regions.

function dropdown() {
    regions.forEach(region => {
        let dropdownRegion = d3.select("#region");
        // console.log(dropdownRegion)
        dropdownRegion.append("option").text(region)
    })
};

dropdown()

// Generate de table
d3.json("/data").then(data=> {
    console.log(data[0])
    // console.log(data[0].date)
    // data.forEach(element => {
    //     console.log(element)
    generateTable(data)
    });

// filter the table
function filterData(userInput) {
    let inputValue = {}
    let date = d3.select("#date").property('value')
    let price = d3.select("#price").property('value')
    let volume = d3.select("#volume").property('value')
    let type = d3.select("#type").property('value')
    let region = d3.select("#region").property('value')
    
    inputValue[date] = date
    inputValue[price] = price
    inputValue[volume] = volume
    inputValue[type] = type
    inputValue[region] = region

    console.log(inputValue)
    return inputValue
}

console.log(filterData())

// read the data

// d3.json('/table').then (data=> 
//     console.log(data)
//     )
// /Tableau/avocado-updated-2020.csv
// d3.json("/data").then(data=> {
//     // console.log(data[0])
//     // console.log(data[0].date)
//     data.forEach(element => {
//         console.log(element)

//     });

// })

// console.log(tableData)
// console.log(Object.entries)
// console.log(tableData[0])

// just to know button clicked 
d3.selectAll("button").on("click", function () {
    console.log(this)
});



function generateTable(data) {
    tableBody = d3.select("tbody")
    // tableHead = d3.select('thead')
    // console.log(Object.entries(data))
    // let rowHead = tableHead.append("tr")
    // let cellHead = rowHead.append("th")
    // cellHead.text(key)
    // add a row
    data.forEach(element =>{
        
        let rowBody = tableBody.append("tr")
        Object.entries(element).forEach(([key, value]) => {
        
        let cellBody = rowBody.append("td");
        cellBody.text(value);
        
        });
    })
};
// grab table and pass that to our function
// let table = document.querySelector("tbody");
// generateTable(table, tableData);
// --------------------------------------------
//

// get the input



//filter the table function
function filterData(userInput) {
    let inputValue = {}
    let date = d3.select("#date").property('value')
    let price = d3.select("#price").property('value')
    let volume = d3.select("#volume").property('value')
    let type = d3.select("#type").property('value')
    let region = d3.select("#region").property('value')
    
    inputValue[date] = date
    inputValue[price] = price
    inputValue[volume] = volume
    inputValue[type] = type
    inputValue[region] = region

    console.log(inputValue)
    return inputValue
}

console.log(filterData())

// console.log(d3.select("#date"))

// select the button(event)
filterButton = d3.select("#filter-btn");

// call `on` (event listnener) to run the function that will work 
filterButton.on("click", () => {
    console.log(filterData())
    // filter the input from the table
    // filterTable = tableData.filter(item => (item.datetime === filterData("#datetime") || filterData("#datetime") === "")
    //     && (item.city === filterData("#city") || filterData("#city") === "")
    //     && (item.state === filterData("#state") || filterData("#state") === "")
    //     && (item.country === filterData("#country") || filterData("#country") === "")
    //     && (item.shape === filterData("#shape") || filterData("#shape") === ""));
    // console.log("filterTable", filterTable);
    // generateTable(table, filterTable);

});

// reset the table from the begnning button 
resetButton = d3.select("#reset-btn")
resetButton.on("click", () => {
    generateTable(table, tableData)
    // clear the input fileds 
    document.getElementById('date').value = ''
    document.getElementById('price').value = ''
    document.getElementById('volume').value = ''
    document.getElementById('country').value = ''
    document.getElementById('shape').value = ''
});