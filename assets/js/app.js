// @TODO: YOUR CODE HERE!
// Build Chart
var svgWidth = 300;
var svgHeight = 200;
var margin = {top: 20, right: 40, bottom: 60, left: 50};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//SVG Wrapper to hold the chart ** rewriting this to something smarter
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chart = svg.append('g')

//pull data from the file provided and put into the chart
d3.csv("assets/data/data.csv").then(function(healthData){
    //Formatting the data
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(healthData, d => d.healthcare)])
        .range([height, width]);

    var xLinearScale = d3.scaleLinear()
        .domain([9, d3.max(healthData, d => d.poverty)])
        .range([0, width]);

    //make axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //add the axis
    chart.append("g")
        .call(bottomAxis);
    
    chart.append("g")
        .call(leftAxis);

    var circleGroup = chart.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)
        .attr("fill", "green")
        .attr("opacity", ".5")
        .attr("stroke", "white")
    
    chart.append("text")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .selectAll("tspan")
        .data(healthData)
        .enter()
        .append("tspan")
        .attr("x", function(data){
            return yLinearScale(data.healthcare -.02);
        })

    //Initialize tooltip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(data){
            var stateName = data.state;
            var pov = +data.poverty;
            var healthCare = +data.healthcare;
            return(
                '${d.state}<br>Population in Poverty (as %): ${d.poverty}<br>Absent Healthcare (as %): ${d.healthcare}'
            );
        });

    //Make tooltip
    chart.call(toolTip);

    //Mouseover to display the tooltip
    circleGroup.on("mouseover", function(data){
        toolTip.show(data, this);
    })

    //Mouseout
    .on("mouseout", function(data, index){
        toolTip.hide(data);
    });

    //Make Labels for the graph
    chart.append("text")
        .attr("y", 0 - margin.left - 5)
        .attr("x", 0 - (height / 1.3))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Absent Healthcare (in %)");
    
    chart.append("text")
    .attr("class", "axisText")
    .text("Population in Poverty (as %)");
});