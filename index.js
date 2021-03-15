d3.csv('rollData.csv', data => {
    rollHistogram(data);
    sumHistogram(data);
});

function rollHistogram(data) {
    const margin = 30, width = 460, height = 400;
    const svg1 = d3.select('#roll-histogram').append('svg').attr('width', width + margin * 2).attr('height', height + margin * 2)
        .append('g').attr('transform', `translate(${margin}, ${margin})`);

    const x = d3.scaleLinear().domain([1, 6]).range([0, width]);
    svg1.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

    const rolls = data.map(d => parseInt(d['roll 1'])).concat(data.map(d => parseInt(d['roll 2'])));

    const histogram = d3.histogram().domain(x.domain()).thresholds(x.ticks(6));

    const bins = histogram(rolls);

    const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(bins, d => d.length)]);
    svg1.append('g').call(d3.axisLeft(y));

    svg1.selectAll('rect').data(bins).enter().append('rect').attr('x', 1)
        .attr('transform', d => `translate(${x(d.x0)}, ${y(d.length)})`)
        .attr('width', d => (x(d.x1) - x(d.x0) - 1))
        .attr('height', d => (height - y(d.length)))
        .style('fill', '#69b3a2');
}

function sumHistogram(data) {
    const margin = 30, width = 460, height = 400;
    const svg2 = d3.select('#sum-histogram').append('svg').attr('width', width + margin * 2).attr('height', height + margin * 2)
        .append('g').attr('transform', `translate(${margin}, ${margin})`);

    const x = d3.scaleLinear().domain([2, 12]).range([0, width]);
    svg2.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

    const histogram = d3.histogram().value(d => d['sum']).domain(x.domain()).thresholds(x.ticks(9));

    const bins = histogram(data);

    const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(bins, d => d.length)]);
    svg2.append('g').call(d3.axisLeft(y));

    svg2.selectAll('rect').data(bins).enter().append('rect').attr('x', 1)
        .attr('transform', d => `translate(${x(d.x0)}, ${y(d.length)})`)
        .attr('width', d => (x(d.x1) - x(d.x0) - 1))
        .attr('height', d => (height - y(d.length)))
        .style('fill', '#9569b3');
}