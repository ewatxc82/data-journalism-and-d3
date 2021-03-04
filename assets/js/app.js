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

    //I think I need to make scalar functions here
})