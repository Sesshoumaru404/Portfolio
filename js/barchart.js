// var BARGRAPH = BARGRAPH || {};

var BARGRAPH = {
  // x : d3.scale.ordinal()
  //     .rangeRoundBands([0, "width"], .1),
  margin : {top: 20, right: 20, bottom: 30, left: 40},
  width : BARGRAPH,
  // height : 500 - this.margin.top - this.margin.bottom,
  show : function () {
    console.log(this.width);
  },
}
BARGRAPH.test = {
  show : function () {
    console.log(d3);
  }

}

BARGRAPH.test.show();
// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
//
// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width], .1);
//
// var y = d3.scale.linear()
//     .range([height, 0]);
//
// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom")
//     .ticks(15, "milli");
//
// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .ticks(10, "milli");
//
// var svg = d3.select(".mainlayout").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// // d3.xhr("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", "json", function(error, data) {
// d3.json("../files/data.json", function(error, data) {
//   if (error) throw error;
//   console.log(data['data']);
//   x.domain(data['data'].map(function(d) { return d[0]; }));
//   y.domain([200, d3.max(data['data'], function(d) { return d[1]; })]);
//
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis);
//
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Gross Domestic Product, USA");
//
//   svg.selectAll(".bar")
//       .data(data)
//     .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function(d) { return x(d.letter); })
//       .attr("width", x.rangeBand())
//       .attr("y", function(d) { return y(d.frequency); })
//       .attr("height", function(d) { return height - y(d.frequency); });
// });
//
// function type(d) {
//   d.frequency = +d.frequency;
//   return d;
// }
