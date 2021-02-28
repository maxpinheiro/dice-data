let data = [10, 5, 12, 15];
let colors = ['rgb(140, 245, 152)', 'rgb(139, 222, 247)', 'rgb(145, 147, 255)', 'rgb(200, 145, 255)'];
const width = 500, scaleFactor = 20, barHeight = 30;
const barchart = d3.select('#barchart').append('svg').attr('width', width).attr('height', barHeight * data.length);

let bar = barchart.selectAll('g') // creates group element
    .data(data) // binds data array to group elements
    .enter() // creates placeholders for group elements
    .append('g') // append group elements to page
    .attr('transform', (d, i) => `translate(0, ${i * barHeight})`);

bar.append('rect')
    .attr('width', d => d * scaleFactor)
    .attr('height', barHeight - 1)
    .attr('fill', (d, i) => colors[i]);

bar.append('text')
    .attr('x', d => d * scaleFactor + 5).attr('y', barHeight / 2)
    .attr('dy', 6)
    .text(d => d);

//

const circlechart = d3.select('#circlechart').append('svg').attr('width', data.length * (75 + 50)).attr('height', Math.max(...data) * 1.5 + 75);

let circle = circlechart.selectAll('g')
    .data(data)
    .enter()
    .append('g');

circle.append('circle')
    .attr('cx', (d, i) => i * 75 + 50)
    .attr('cy', 50)
    .attr('r', d => d * 2)
    .attr('fill', (d, i) => colors[i]);

circle.append('text')
    .attr('x', (d, i) => i * 75 + 50 - ((Math.floor(d / 10) + 1) * 4))
    .attr('y', 55)
    .text(d => d);

//

const diceColors = ['rgb(250, 115, 115)', 'rgb(250, 178, 115)', 'rgb(255, 236, 150)', 'rgb(157, 255, 150)', 'rgb(150, 199, 255)', 'rgb(199, 150, 255)'];
const radius = 150;
const piediv = d3.select('#piechart').append('svg').attr('width', radius * 2).attr('height', radius * 2);
const piechart = piediv.append('g').attr('transform', `translate(${radius}, ${radius})`);

const pie = d3.pie().value(d => d.percent); // function used to map csv data to pie chart data
const path = d3.arc().outerRadius(radius - 10).innerRadius(0);
const label = d3.arc().outerRadius(radius).innerRadius(radius - 80);

d3.csv('percentages.csv', (error, data) => {
    if (error) throw error;
    let arc = piechart.selectAll('g')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arc.append('path')
        .attr('d', path)
        .attr('fill', (d, i) => diceColors[i]);

    arc.append('text')
        .attr('transform', d => `translate(${label.centroid(d)})`)
        .text(d => d.data.die);
});

//

const width2 = 500, height2 = 300;
const lineContainer = d3.select('body').append('svg').attr('width', width2 + 50).attr('height', height2 + 50).style('border', '1px solid black');
const linegraph = lineContainer.append('g').attr('transform', 'translate(25, 25)');

const rangeX = d3.scaleTime().range([0, width2]);
const rangeY = d3.scaleLinear().range([height2, 0]);

const lineFn = d3.line().x(d => rangeX(d.year)).y(d => rangeY(d.average));

d3.csv('years.csv', (error, data) => {
    if (error) throw error;

    rangeX.domain(d3.extent(data, d => parseInt(d.year)));
    rangeY.domain([0, d3.max(data, d => parseInt(d.average))]);

    linegraph.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', lineFn)
        .attr('fill', 'none')
        .attr('stroke', 'green')
        .attr('stroke-width', '2');

    linegraph.append('g')
        .attr('transform', `translate(0, ${height2})`)
        .call(d3.axisBottom(rangeX));

    linegraph.append('g')
        .call(d3.axisLeft(rangeY));
});

// documentation

// - arrays

//const data = [20, 40, 60, 80, 100];

// statistics
d3.min(data);
d3.max(data);
d3.extent(data);
d3.sum(data);
d3.mean(data);
d3.quantile(data, 0.5); // p-quantile (median = 0.5, third quartile = .75)
d3.variance(data);
d3.deviation(data);

// searching
d3.scan(data, (a, b) => a - b); // index of smallest element using comparator

// transformations
d3.cross([10, 20], ['a', 'b']); // [[10, 'a'], [20, 'b']]
d3.merge([[10], [20]]); // [10, 20]
d3.pairs([10, 20, 30, 40]); // [[10, 20], [20, 30], [30, 40]]
d3.zip([10, 20], [30, 40]); // [[10, 20], [30, 40]]

// scale: create scale, set domain, set range
d3.scaleLinear().domain(d3.extent(data)).range([0, width]);
 // axis: create axis

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