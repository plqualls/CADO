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
    
    d3.json("../static/js/data.json").then(data=> {
        console.log("promise fullfilled")
        
        var filterTable = data.filter(item => {(item.date === date)
            && (item.price >= price)
        
            && (item.type === type)
            && (item.geography === region);
        console.log("filterTable", filterTable);
        
        });
        generateTable(table, filterTable);

    });
    

    // event.preventDefault();

    // select the button(event)
    


    // call `on` (event listener) to run the function that will work 
    
        // console.log(this)
    // filter the input from the table
    //     filterTable = tableData.filter(item => (item.date === filterData("#date") || filterData("#date") === "")
    //         && (item.price >= filterData("#price") || filterData("#price") === "")
            
    //         && (item.type === filterData("#type") || filterData("#type") === "")
    //         && (item.region === filterData("#region") || filterData("#region") === ""));
    // console.log("filterTable", filterTable);
    // generateTable(table, filterTable);


};


    

    



// function optionChanged(userChoice) {
//     filterData(userChoice)
// }



filterButton = d3.select("#filter-btn");
filterButton.on("click", ()=>{
    console.log('filter button');
    filterData();
})