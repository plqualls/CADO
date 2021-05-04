function dropdown() {
    regions.forEach(region => {
        let dropdownRegion = d3.select("#region");
        // console.log(dropdownRegion)
        dropdownRegion.append("option").text(region)
    })
};

dropdown();

var table = document.querySelector("tbody");

function generateTable(table, data) {
    console.log('loading...')
    //d3.event.preventDefault()
    tableHtml = d3.select("tbody");
    tableHtml.html("");
    for (let element of data) {
        // add a row 
        let row = table.insertRow();
        for (key in element) {
            // creates a new cell
            let cell = row.insertCell();
            // creates a new text node
            let text = document.createTextNode(element[key]);
            // appends the text node to the cell
            cell.appendChild(text);
        }
    }
};

d3.json("../static/js/data.json").then(data=> {
    console.log("promise fullfilled");
    generateTable(table, data);

});

function filterData(){
    console.log("filtering...");

    tableHtml = d3.select("tbody");
    tableHtml.html("");


    let date = d3.select("#date").property('value');
    let price = d3.select("#price").property('value');
    let type = d3.select("#type").property('value');
    let region = d3.select("#region").property('value');
    price = parseFloat(price);

    console.log(date,price,type,region);
    // var filterTable = []
    d3.json("../static/js/data.json").then(data=> {
        console.log("promise fullfilled")
        
        var filterTable = data.filter(item => ((item.date === date)
            && (item.price >= price)
        
            && (item.type === type)
            && (item.geography === region)
            
        
        ));
        generateTable(table, filterTable);
        console.log("filterTable", filterTable);
    });

    

// reset the table from the begnning button 
resetButton = d3.select("#reset-btn")
resetButton.on("click", () => {
    d3.json("../static/js/data.json").then(tableData => {
    generateTable(table, tableData)
});

filterButton = d3.select("#filter-btn");
filterButton.on("click", ()=>{
    console.log('filter button');
    filterData();
    });



