// @TODO: YOUR CODE HERE!
// Build Chart
var svgWidth = 700;
var svgHeight = 500;

var margin = {
    top: 30,
    bottom: 50,
    right: 30,
    left: 40
};
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.right - margin.left;


//SVG Wrapper to hold the chart ** rewriting this to something smarter
var svg = d3
.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth)

var chart = svg.append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//pull data from the file provided and put into variable instead of putting into one function. Put into two for error checking.

var file = "assets/data/data.csv"

d3.csv(file).then(successHandle, errorHandle);

//read file kick errors to the console
function errorHandle(error) {
    throw error;
}

function successHandle(healthData) {
    healthData.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    //make the scalar functions
    var xLinearScale = d3.scaleLinear()
        .domain([7,d3.max(healthData, d => d.poverty)])
        .range([0,width]);

    var yLinearScale = d3.scaleLinear()
        .domain([3,d3.max(healthData, d => d.healthcare)])
        .range([height,0]);
    
    //make axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //add the axis
    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chart.append("g")
    .call(leftAxis)
    
    //create circles group
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
    
    //adding text to the circles
    var circleGroup = chart.selectAll()
        .data(healthData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .text(d => (d.abbr));
    //Initialize tooltip
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d){
            return(`${d.state}<br>Poverty: ${d.poverty}%<br>Lacks Healthcare: ${d.healthcare}%`);
        });

    //Make tooltip
    chart.call(toolTip);

    //make the mouseover
    circleGroup.on("mouseover", function(data){
        toolTip.show(data, this);
    })
    //make mouseout
    .on("mouseout", function(data, index){
        toolTip.hide(data);
    });

    chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 1)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Absent Healthcare (in %)");

    chart.append("text")
    .attr("transform", `translate(${width / 3}, ${height + margin.top})`)
    .attr("class", "axisText")
    .text("Population in Poverty (as %)");
}