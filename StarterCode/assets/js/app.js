var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 60
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



// data
d3.csv("assets/data/data.csv").then(function(demographicData) {
    demographicData.forEach(function(data){
        data.healthcare = +data.healthcare
        data.poverty = +data.poverty
        data.abbr = data.abbr;
    });

    // axis
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(demographicData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(demographicData, d => d.healthcare)])
        .range([height, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(20);
    var leftAxis = d3.axisLeft(yLinearScale);
    

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // circle group
    var circlesGroup = chartGroup.selectAll("circle")
        .data(demographicData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty)-1)
        .attr("cy", d => yLinearScale(d.healthcare)-6)
        .attr("fill", "blue")
        .attr("r", "15")
        .attr("opacity", ".5")
        .attr("classed", "stateObs");
        
    // circle text
    var observationText = chartGroup.selectAll(".stateText")
        .data(demographicData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("value", "data.abbr")
        .attr("fill", "black")
        .classed("stateText", "true")
        .text(d => d.abbr)

    // axis titles
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .attr("font-size", "15px")
        .attr("fill", "black")
        .text("Lacks Healthcare (%)");
    
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "15px")
        .attr("fill", "black")
        .text("In Poverty (%)");
    
});







