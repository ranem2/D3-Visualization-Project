var margin = {top: 40, right: 20, bottom: 30, left: 80},
    width = 1060 + margin.left + margin.right,
    height = 505 - margin.top - margin.bottom ;

var format = d3.format("s");


var x = d3.scale.ordinal()
    //.rangeBand([0, width], 0.1);
    .rangeRoundBands([0, width],0.1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right + 100)
    .attr("height", height + margin.top + margin.bottom )
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv('./data/FuelVsCapacity.csv', type, function(error, data1) {
  x.domain(data1.map(function(d) { return d.Fuel; }));
  y.domain([0, d3.max(data1, function(d) { return d.CapacityMw; })]);


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr('x', -150)
      .attr('y', -80)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("CapacityMw");

 svg.append('g')
      .attr("class", "x axis")
      .call(yAxis)
      .append('text') // X-axis Label
      .attr('class', 'label')
      .attr('y', +455)
      .attr('x', width - 600)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('')
    

  svg.selectAll(".bar")
      .data(data1)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Fuel); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.CapacityMw); })
      .attr("height", function(d) { return height - y(d.CapacityMw); })
      .on('mouseover', function () {
          d3.select(this)
              .transition()
              .duration(500)
              .attr('stroke-width', 3);
      })
      .on('mouseout', function () {
          d3.select(this)
              .transition()
              .duration(500)
              .attr('stroke-width', 1);


      })
      .append('title') // Tooltip
      .text(function (d) {
          return 'Fuel: ' + d.Fuel +
                '\nCapacity Mw: ' + format(d.CapacityMw)
      })

 
});

function type(d) {
  d.CapacityMw = +d.CapacityMw;
  return d;
}
