
function printData(json) {
  let dataset = json.data;
  //const winWidth = document.body.clientWidth;
  const winWidth = document.getElementsByClassName("portfolio-max-width")[0].clientWidth;
  console.log(winWidth);
  
  // Set the dimensions of the canvas / graph
  const margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
  };
  
  const w = (winWidth * .75) - margin.left - margin.right;
  const h = ((winWidth * .75) * .50) - margin.top - margin.bottom;
  const padding = 60;
  
 document.getElementById("chart").style.width = w + "px";
 //document.getElementByClass("portfolio-max-width")[0].style.width = w + "px";
  
 // define the x scale (horizontal)
  let mindate = new Date(d3.min(dataset, (d) => d[0]));
  let maxdate = new Date(d3.max(dataset, (d) => d[0])); 
    
  const xScale = d3.scaleTime()
                .domain([mindate, maxdate])
                .range([padding, w - padding]);
      
  const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d) => d[1])])
                .range([h - padding, padding]);
 
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const div = d3.select("#chart").append("div")	
  .attr("id", "tooltip")				
  .style("opacity", 0);

  const header = d3.select("#chart")
  .append("div")	
  .attr("id", "title")
  .html(
    "<h1>"+ json.name +"</h1>"
  )


  const svg = d3.select("#chart")
                .append("svg")
                .attr("width", (w))
                .attr("height", (h));


  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate("+ (padding) + ",0)")
    .call(yAxis);
  
    
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("x", (d, i) => {
      let date = new Date(d[0]);
      return xScale(date);
    })
    .attr("y", (d, i) => yScale(d[1]- padding) )
    .attr("width", 2)
    .attr("height", (d, i) => (h - padding) - yScale(d[1]) )
    .on("mouseover", (d) => {
        let date = new Date(d[0]);
        div.attr("data-date", d[0])
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div.html(date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + "<br/>"  + d[1])	
            .style("left", ((xScale(date) + 3) + "px"))	
          //  .style("top", (yScale(d[1])) + "px");	
            .style("top", "370px");	
        })
    .on("mouseout", (d) => {		
        div.transition()		
            .duration(500)		
           .style("opacity", 0);	
  })

  
}

var req = new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
req.send();
req.onload=function(){
  json=JSON.parse(req.responseText);
  printData(json);  
}
