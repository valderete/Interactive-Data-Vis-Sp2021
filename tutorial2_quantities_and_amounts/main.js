d3.csv('../data/squirrelActivities.csv', d3.autoType)
.then(data => {
    console.log("data", data)

const width = window.innerWidth * .8;
const height = 500;

const xScale = d3.scaleBand()
  .domain(data.map(d=> d.activity))
  .range([0, width]) // visual variable
  .paddingInner(.2)

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d=> d.count)])
  .range([height, 0])

const svg = d3.select("#barchart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("width", xScale.bandwidth())
  .attr("height", d=> height - yScale(d.count))
  .attr("x", d=>xScale(d.activity))
  .attr("y", d=> yScale(d.count))

})