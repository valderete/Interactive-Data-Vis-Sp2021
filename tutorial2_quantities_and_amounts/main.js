d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
    console.log("data", data)

// constants
const width = window.innerWidth *.8 ;
const height = window.innerHeight/2;
const margin = ({ top: 20, right: 40, bottom: 20, left: 60 })
const color = d3.scaleSequential() // color scale
    .domain([10, d3.max(data, d => d.count)])
    .interpolator(d3.scaleOrdinal(d3.schemeAccent))

// SCALES
// xscale - linear,count
const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.count)])
    .range([height, 50])

  // yscale - categorical, activity
const yScale = d3.scaleBand()
    .domain(data.map(d=> d.activity))
    .range([450, margin.top, height - margin.bottom])
    .paddingInner(.1)

// svg
const svg = d3.select("#barchart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

// bars
svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("height", yScale.bandwidth())
  .attr("width", d=> width - - margin.left - xScale(d.count))
  .attr("transform", `translate(100, ${height - margin.middle})`)
  .attr("y", d=>yScale(d.activity))
  .attr("x", 60, d=> xScale(d.count))
  .attr("fill", d=>color(d.count))

  //activity left
svg.selectAll("text.activity")
    .data(data)
    .join("text")
    .attr("class",'activity')
    .attr("y",d=> yScale(d.activity)+(yScale.bandwidth()/2))
    .attr("x",0,d=> xScale(d.count))
    .attr("x",d=> 2)
    .text(d=> d.activity)

//count right
svg.selectAll("text.count")
    .data(data)
    .join("text")
    .attr("class",'count')
    .attr("y",d => yScale(d.activity)+(yScale.bandwidth()/2))
    .attr("x",d=> 70) // to allign counts
    .text(d=> d.count)
})