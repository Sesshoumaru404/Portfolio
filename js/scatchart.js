function printData(json) {
  let dataset = json; 
  let counties = [];
  let colors = [
    'red',
    'green',
    '#21ea72',
    'yellow',
    'orange',
    'brown',
    'blue',
    'grey',
    'purple',
    'cyan',
    'dark-green',
  ];
  
  dataset.forEach(function(ele){
    if (counties.indexOf(ele.Nationality) == -1 ) {
      counties.push(ele.Nationality);
    }    
  })
  
  
  counties.sort();
  //const winWidth = document.getElementsByClassName("portfolio-max-width")[0].clientWidth;
  const winWidth = document.getElementsByTagName("body")[0].clientWidth;
  
  // Set the dimensions of the canvas / graph
  const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 10
  };
  
  const w = (winWidth * .85) + margin.left + margin.right;
  const legendWidth = 80;
  const legendHeight = counties.length * 22;
  const padding = 20;
  const minusLegend = w  - legendWidth  - padding;
  const h = ((winWidth * .85) * .50) - margin.top - margin.bottom;

  document.getElementById("chart").style.width = w + "px";
  
// Add Header div
  const header = d3.select("#chart")
                .append("div")
                .attr("id", "title");
  
  header.html(
    "<h1>Visualize Data with a Scatterplot Graph</h1>"
  );  
  
  // Set minimun date
  const mindate =  d3.min(dataset, (d) => {
    let date = new Date(d.Year - 1,0,1) 
    return date; 
  })
  
  // Set maxium date
  const maxdate =  d3.max(dataset, (d) => {
    let date = new Date(d.Year  + 1,0,1)
    return date; 
  })
  
  // Set minimun time
  const mintime =  d3.min(dataset, (d) => {
    let time = d.Time.split(":");
    let date = new Date(0,0,0,0,time[0],time[1]);
    return date; 
  })
  
  // Set maxium time
  const maxtime =  d3.max(dataset, (d) => {
    let time = d.Time.split(":");
    let date = new Date(0,0,0,0,time[0],time[1]);
    return date; 
  })
  
  const xScale = d3.scaleTime()
                .domain([mindate, maxdate])
                .range([margin.right, minusLegend - (margin.left)]);
      
  const yScale = d3.scaleTime()
                .domain([mintime, maxtime])
                .range([(h - margin.bottom) , margin.top]);
 
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  
  const svg = d3.select("#chart")
                .append("svg")
                .attr("width", (w) + 'px')
                .attr("height", h +30);
  
  const div = d3.select("#chart").append("div")	
    .attr("id", "tooltip")				
    .style("opacity", 0);
  
  const legendBox = svg.append("g")
      .attr("width", legendWidth )
      .attr("height", h + 100)
      .attr("x", minusLegend + 18)
      .attr("id", "legendBox")
      .attr("class", "legendBox")
      .attr("transform", (d, i) => {
        return "translate(18,-" + ((h - margin.bottom -  margin.top) - legendHeight)  + ")";
      });
  
  const legend = legendBox.selectAll(".legend")
        .data(counties)
        .enter()
        .append("g")
        .attr("id", "legends")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
          return "translate(0," + (h-60 - i * 20) + ")";
        })
   
  svg.append("g")
  //  .attr("transform", "translate("+ (xScale(mindate -  margin.right)) +"," + (h - margin.bottom) + ")")
    .attr("transform", "translate("+ margin.right +"," + (h - margin.bottom) + ")")
    .attr("id", "x-axis")
    .call(xAxis);
  
  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (w/2) + "," + ((h - margin.bottom) + 35) + ")")
      .style("text-anchor", "middle")
      .text("Date");

  svg.append("g")
    .attr("transform", "translate("+ (margin.right + margin.left) +",0)")
    .attr("id", "y-axis")
    .call(yAxis);

  // text label for the x axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Value");
  
  
  legend.append("rect")
    .attr("x", (w  - legendWidth) + 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", (d,i) => {
      let color = colors[i];
      return color;
    })
  
  legend.append("text")
    .attr("x",(w  - legendWidth) + 12)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text((d,i) => d)

  svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => d.Time)
    .style("fill", (d) => {
      let color = colors[counties.indexOf(d.Nationality)];
      return color;
    })
    .attr("cx", (d) => {
      let date = new Date(d.Year,0,1);
      return xScale(date);
    })
    .attr("cy",(d) => {
      let time = d.Time.split(":");
      let date = new Date(0,0,0,0,time[0],time[1]);
      return yScale(date);
    })
    .attr("r", (d) => 5)
    .on("mouseover", (d) => {
        let date = new Date(d.Year,0,1);
        let time = d.Time.split(":");
        time = new Date(0,0,0,0,time[0],time[1]);
        div.attr("data-xvalue", date)
        div.attr("data-yvalue", time)
        div.transition()		
          .duration(200)		
          .style("opacity", .9);

        div.html("<b><i>Year</i></b>: " + date.getFullYear() + "<br/>"  +
          "<b><i>Time</i></b>: " +  d.Time + "</br>" + 
          "<b><i>Nationality</i></b>: " +  d.Nationality
        )	
        .style("left", ((xScale(date) - 25 ) + "px"))	
        .style("top", (yScale(time)   + margin.bottom   ) + "px");	
    })
    .on("mouseout", (d) => {		
      div.transition()		
        .duration(500)		
        .style("opacity", 0)
    });

}


var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET','cyclist-data.json',true); 
xobj.send();
xobj.onload=function(){
  json=JSON.parse(xobj.responseText);
  printData(json);  
}
