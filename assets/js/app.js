// @TODO: YOUR CODE HERE!
// Build Chart
var svgWidth = 1000;
var svgHeight = 500;
var margin = {top: 20, right: 40, bottom: 60, left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//SVG Wrapper to hold the chart
var svg = d3
.select('.chart')
.append('svg')
.attr('width', svgWidth)
.attr('height', svgHeight)
.append('g')
.attr('transform', 'translate(' + margin.left + "," + margin.top + ')');

var chart = svg.append('g');

//Bind a div to the body
d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

//pull data from the file provided and put into the chart
d3.csv("../../data/data.csv", function(err, healthData){
    if (err) throw err;

    healthData.forEach(function(data){
        data.poverty = +data.poverty;
        data.phys_act = +data.phys_act;
    });

    var yLinearScale = d3.scaleLinear().range([height,0]);
    var xLinearScale = d3.scaleLinear().range([0,width]);

    //make axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //scale domain
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    xMin = d3.min(healthData, function(data) {
        return +data.poverty * 0.95;
    });

    xMax = d3.max(healthData, function(data){
        return +data.poverty * 1.05;
    });

    yMin = d3.min(healthData, function(data){
        retrun +data.poverty * 0.98;
    });

    yMax = d3.max(healthData, function(data){
        return +data.poverty * 1.02;
    });

    xLinearScale.domain([xMin, xMax]);
    xLinearScale.domain([yMin, yMax]);
})