let data = [10, 5, 12, 15];
let colors = ['rgb(140, 245, 152)', 'rgb(139, 222, 247)', 'rgb(145, 147, 255)', 'rgb(200, 145, 255)'];
const width = 500, scaleFactor = 20, barHeight = 30;
const graph = d3.select('#container').append('svg').attr('width', width).attr('height', barHeight * data.length);

let bar = graph.selectAll('g')
    .data(data) // join data to dom element
    .enter()
    .append('g') // append group elements
    .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

bar.append('rect')
    .attr('width', d => d * scaleFactor)
    .attr('height', barHeight - 1)
    .attr('fill', (d, i) => colors[i]);

bar.append('text')
    .attr('x', d => d * scaleFactor + 5).attr('y', barHeight / 2)
    .attr('dy', 6)
    .text(d => d);

/*
const width = 500;
const height = 500;
const svg = d3.select('#svgcontainer').append('svg').attr('width', width).attr('height', height);

svg.append('line')
    .attr('x1', 50).attr('y1', 150)
    .attr('x2', 400).attr('y2', 400)
    .style('stroke', 'rgb(0, 155, 125)').style('stroke-width', 2);

svg.append('rect')
    .attr('x', 300).attr('y', 50)
    .attr('width', 100).attr('height', 100)
    .attr('fill', 'rgb(100, 10, 175)')
    .attr('transform', 'rotate(45, 350, 100)');

svg.append('circle')
    .attr('cx', 100).attr('cy', 350)
    .attr('r', 50)
    .attr('fill', 'rgb(25, 200, 100)')
    .transition().delay(1000).duration(2000)
    .attr('fill', 'rgb(25, 100, 200)');
*/