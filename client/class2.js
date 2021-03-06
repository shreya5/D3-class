//JS to go here

var margin = {top: 20, right: 30, bottom: 30, left: 10};

var width = 720 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scale.linear()
  .range([0, width])
  .domain([0, 15]);

var yScale = d3.scale.linear()
  .range([height,0])
  .domain([0,12]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickValues([0,5,10,15])

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("right")
  .tickSize(-width);

var url = "https://raw.githubusercontent.com/thisismetis/data-visualization-with-d3/master/class1/quartet.tsv?token=AC7uVUyFXFImSgq7mMWGffhbcm2IWG2Cks5WCeC1wA%3D%3D";
d3.tsv(url, ready);

var circleData = [];

function ready(error, data) {
  data.forEach(function(d) {
    var temp = {x: d.x, y: d.y};
    circleData.push(temp);
  });
  render();
}

function render() {

  var circle = svg.selectAll("circle")
    .data(circleData)
    .enter().append("circle")
    .attr("r", 13)
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    });

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxis);
}

