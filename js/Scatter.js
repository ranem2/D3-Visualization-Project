d3.csv('./data/Scatterplot.csv', function (data) {
    // Variables
    var body = d3.select('#scatter')
    var margin = {top: 40, right: 2, bottom: 40, left: 80}
    var h = 500 - margin.top - margin.bottom
    var w = 1160 + margin.left + margin.right
    var format = d3.format("s")
    // Scales

    var colorScale = d3.scale.category20()

    var xScale = d3.scale.log()
        .domain([50, 1200000])
        .range([0, w])
    var yScale = d3.scale.log()
        .domain([100, 4400000])
        .range([h, 0])
    // SVG
    var svg = body.append('svg')
        .attr('height', h + margin.top + margin.bottom)
        .attr('width', w + margin.left + margin.right + 100)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    // X-axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(10, "s");
    // Y-axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(10, "s");

    // annotations
    var xAnotate = 400;
    var yAnotate = 80;
    svg.append("text")
        .attr("class", "annotations")
        .attr("x", xAnotate)
        .attr("y", yAnotate + 5)
        .text('Most Countries have capacity between 1k-20k Mw');
    svg.append("text")
        .attr("class", "annotations")
        .attr("x", xAnotate)
        .attr("y", yAnotate + 20)
        .text("and est generation between 1k-100k Gwh");
    var aLine = svg.append("line")
        .attr("class", "annotations")
        .attr("x1", xAnotate + 130)
        .attr("y1", yAnotate + 30)
        .attr("x2", xAnotate + 200)
        .attr("y2", yAnotate + 70); // <- y value


    // annotations
    var xAnotate = 800;
    var yAnotate = 0;
    svg.append("text")
        .attr("class", "annotations")
        .attr("x", xAnotate)
        .attr("y", yAnotate + 0)
        .text("USA is Top in the list with");
    svg.append("text")
        .attr("class", "annotations")
        .attr("x", xAnotate)
        .attr("y", yAnotate + 20)
        .text("maximun capacity and Est Generation");


    var aLine = svg.append("line")
        .attr("class", "annotations")
        .attr("x1", xAnotate + 200)
        .attr("y1", yAnotate)
        .attr("x2", xAnotate + 410)
        .attr("y2", yAnotate); // <- y value

    // Circles
    var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(d.CapacityMw)
        })
        .attr('cy', function (d) {
            return yScale(d.EstimatedGenerationGwh)
        })
        .attr('r', '10')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', function (d, i) {
            return colorScale(i)
        })
        .on('mouseover', function () {
            d3.select(this)
                .transition()
                .duration(500)
                .attr('r', 20)
                .attr('stroke-width', 3)
        })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(500)
                .attr('r', 10)
                .attr('stroke-width', 1)
        })
        .append('title') // Tooltip
        .text(function (d) {
            return d.Country +
                '\nEstimated Generation Gwh: ' + format(d.EstimatedGenerationGwh) +
                '\nCapacity Mw: ' + format(d.CapacityMw)
        })

    // X-axis
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis)
        .append('text') // X-axis Label
        .attr('class', 'label')
        .attr('y', +25)
        .attr('x', w - 500)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Capacity Mw')
    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(yAxis)
        .append('text') // y-axis Label
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -150)
        .attr('y', -60)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Estimated Generation Gwh')

})
