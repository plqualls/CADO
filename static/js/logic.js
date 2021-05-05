
function dropdown () {regions.forEach(region => {
    let dropdownRegion = d3.select("#region");
    // console.log(dropdownRegion)
    dropdownRegion.append("option").text(region)
    dropdownRegion.append("value").text(region)
    })};
    
    
dropdown()