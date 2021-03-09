/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 80 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let yAxis;
let xAxisGroup;
let yAxisGroup;

/* APPLICATION STATE */
let state = {
  data: [],
  selectStatus: "Select a Class Type", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv("../data/CHTclasscount.csv", d => {
  return{
    ClassType: d.ClassType,
    ClassCount: +d.ClassCount,
    Month: new Date(2020, d.Month, 1)
  }
})
  .then(data => {
    console.log("loaded data:", data);
    state.data = data;
    init();
  });

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleTime()
    .domain(d3.extent(state.data, d => d.Month))
    .range([margin.right, width - margin.left])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.ClassCount))
    .range([height - margin.bottom, margin.top])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

// + UI ELEMENT SETUP
const dropdown = d3.select("#dropdown") // select dropdown from HTML

  // add in dropdown options from the unique values in the data
  dropdown.selectAll("option")
    .data([
      // manually add the first value
      "Select a Class Type",
      // add in all the unique values from the dataset
      ...new Set(state.data.map(d => d.ClassType))])
      .join("option")
      .attr("attr", d => d)
      .text(d => d)

  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)
  dropdown.on("change", event => {
    state.selectStatus = event.target.value
    console.log('New selection!', state)
    draw(); // re-draw the graph based on this new selection
  });
  // + CREATE SVG ELEMENT
  svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .call(xAxis)
    .append("text") // add xAxis label
      .attr("font-size", "17")
      .attr("transform", `translate(${width / 2}, ${40})`)
      .attr("fill", "#12395c")
      .text("Month")
  
  yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.right}, ${0})`)
    .call(yAxis)
    .append("text") // add yAxis label
      .attr("font-size", "17")
      .attr("transform", `translate(${-35}, ${height / 2})`)
      .attr("fill", "#12395c")
      .attr("writing-mode", "vertical-lr")
      .text("Class Count")

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectStatus === d.ClassType)
    

  // + UPDATE SCALE(S), if needed

  // + UPDATE AXIS/AXES, if needed


  // + DRAW CIRCLES/LABEL GROUPS, if you decide to


  
  // + DEFINE LINE GENERATOR FUNCTION
  const areaGen = d3.area()
    .x(d => xScale(d.Month))
    .y0(height - margin.bottom)
    .y1(d => yScale(d.ClassCount))

  // + DRAW LINE AND/OR AREA
  svg.selectAll("path.area")
    .data([filteredData]) // data needs to take an []
    .join("path")
    .attr("class", 'line')
    .attr("fill", "#f7941c")
    .attr("d", d => areaGen(d))

    
  }
