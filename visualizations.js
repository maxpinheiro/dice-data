d3.csv('rollData.csv', data => {
    rollHistogram(data);
    sumHistogram(data);
    diePiechart(data);
    tempScatter(data);
});

function diePiechart(data) {
    const margin = 30, width = $('#die-piechart').width() - 60, height = $('#die-piechart').width() - 60
    const svg3 = d3.select('#die-piechart').append('svg').attr('width', width + margin * 2).attr('height', height + margin * 2)
        .append('g').attr('transform', `translate(${width/2 + margin}, ${height/2 + margin})`);

    svg3.append('text').attr('x', 0).attr('y', 0 - (width / 2) - (margin / 2))
        .attr('text-anchor', 'middle').style('fill', 'rgb(200, 200, 200)').style('font-size', 'large').text('Roll Frequencies');

    const rolls = [["1", 0], ["2", 0], ["3", 0], ["4", 0], ["5", 0], ["6", 0]];
    data.forEach(d => {rolls[parseInt(d["roll 1"]) - 1][1]++; rolls[parseInt(d["roll 2"]) - 1][1]++;})
    const color = d3.scaleOrdinal().domain(rolls.map(d => d[0])).range(['#37A158', '#258EA6', '#F29E4C', '#EF5159', '#985F99', '#F1CE65']);
    const pie = d3.pie().value(d => d[1]);

    const path = d3.arc().outerRadius(width / 2).innerRadius(width / 5);
    const label = d3.arc().outerRadius(width / 2).innerRadius(width / 5);

    svg3.selectAll('arc').data(pie(rolls)).enter().append('path').attr('d', path).attr('fill', d => color(d.data[0]))
    svg3.selectAll('label').data(pie(rolls)).enter().append('text').attr('transform', d => `translate(${label.centroid(d)})`).text(d => d.data[0]).attr('fill', 'black');
}

function rollHistogram(data) {
    const margin = 30, width = $('#roll-histogram').width() - 60, height = $('#roll-histogram').width() - 60;
    const svg1 = d3.select('#roll-histogram').append('svg').attr('width', width + margin * 2).attr('height', height + margin * 2)
        .append('g').attr('transform', `translate(${margin}, ${margin})`);

    svg1.append('text').attr('x', width / 2).attr('y', 0 - margin / 2)
        .attr('text-anchor', 'middle').style('fill', 'rgb(200, 200, 200)').style('font-size', 'large').text('Histogram of Rolls');

    const x = d3.scaleLinear().domain([1, 6]).range([0, width]);
    svg1.append('g').attr('transform', `translate(0, ${height})`).style('stroke', 'rgb(150, 150, 150)').call(d3.axisBottom(x));

    const rolls = data.map(d => parseInt(d['roll 1'])).concat(data.map(d => parseInt(d['roll 2'])));

    const histogram = d3.histogram().domain(x.domain()).thresholds(x.ticks(6));

    const bins = histogram(rolls);

    const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(bins, d => d.length)]);
    svg1.append('g').style('stroke', 'rgb(150, 150, 150)').call(d3.axisLeft(y));

    svg1.selectAll('rect').data(bins).enter().append('rect').attr('x', 1)
        .attr('transform', d => `translate(${x(d.x0)}, ${y(d.length)})`)
        .attr('width', d => (x(d.x1) - x(d.x0) - 1))
        .attr('height', d => (height - y(d.length)))
        .style('fill', '#37A158');
}

function sumHistogram(data) {
    const margin = 30, width = $('#sum-histogram').width() - 60, height = $('#sum-histogram').width() - 60;
    const svg2 = d3.select('#sum-histogram').append('svg').attr('width', width + margin * 2).attr('height', height + margin * 2)
        .append('g').attr('transform', `translate(${margin}, ${margin})`);

    svg2.append('text').attr('x', width / 2).attr('y', 0 - margin / 2)
        .attr('text-anchor', 'middle').style('fill', 'rgb(200, 200, 200)').style('font-size', 'large').text('Histogram of Sums');

    const x = d3.scaleLinear().domain([2, 12]).range([0, width]);
    svg2.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x)).style('stroke', 'rgb(150, 150, 150)');

    const histogram = d3.histogram().value(d => d['sum']).domain(x.domain()).thresholds(x.ticks(9));

    const bins = histogram(data);

    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)]).range([height, 0]);
    svg2.append('g').call(d3.axisLeft(y)).style('stroke', 'rgb(150, 150, 150)');

    svg2.selectAll('rect').data(bins).enter().append('rect').attr('x', 1)
        .attr('transform', d => `translate(${x(d.x0)}, ${y(d.length)})`)
        .attr('width', d => (x(d.x1) - x(d.x0) - 1))
        .attr('height', d => (height - y(d.length)))
        .style('fill', '#258EA6');
}

function tempScatter(data) {
    const margin = 30, width = $('#temp-scatter').width() - 60, height = $('#temp-scatter').width() - 60;
    const svg4 = d3.select('#roll-histogram').append('svg').attr('width', width + margin * 2).attr('height', height + margin * 2)
        .append('g').attr('transform', `translate(${margin}, ${margin})`);

    svg4.append('text').attr('x', width / 2).attr('y', 0 - margin / 2)
        .attr('text-anchor', 'middle').style('fill', 'rgb(200, 200, 200)').style('font-size', 'large').text('Temperature vs Time');

    const range = d3.extent(data.map(d=>parseInt(d['temperature'])));
    const x = d3.scaleLinear().domain([range[0] - 5, range[1] + 5]).range([0, width]);
    svg4.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x)).style('stroke', 'rgb(150, 150, 150)');

    const y = d3.scaleLinear().domain([2, 12]).range([height, 0]);
    svg4.append('g').call(d3.axisLeft(y)).style('stroke', 'rgb(150, 150, 150)');

    const gradient = d3.scaleLinear().domain(d3.extent(data.map(d=>d['temperature']))).range(["#0042fb", "#e3421c"]);

    svg4.selectAll('pt').data(data).enter().append('circle')
        .attr('cx', d => x(d['temperature'])).attr('cy', d => y(d['sum'])).attr('r', 3)
        .style('fill', d => gradient(d['temperature']));
}

function time(data) {
    const x = d3.scaleTime().domain(d3.extent(data.map(d=>new Date(d["date"])))).range([0, width]);
}