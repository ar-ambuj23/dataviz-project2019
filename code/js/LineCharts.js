class LineCharts {
    
    constructor() {

    }



    drawPrimary(yearWiseStateData) {

        this.drawChart(yearWiseStateData, 'CO', 1000);
        this.drawChart(yearWiseStateData, 'SO2', 2000);
        this.drawChart(yearWiseStateData, 'NO2', 3000);
        this.drawChart(yearWiseStateData, 'O3', 4000);
       
    }
    

    
    drawComparable() {

        this.drawChart(yearWiseStateData, 'CO', 1000);
        this.drawChart(yearWiseStateData, 'SO2', 2000);
        this.drawChart(yearWiseStateData, 'NO2', 3000);
        this.drawChart(yearWiseStateData, 'O3', 4000);

    }



    clearCharts() {

        this.clearChart('CO');
        this.clearChart('SO2');
        this.clearChart('NO2');
        this.clearChart('O3');

    }



    drawChart(data, prop, duration) {

        let chartSVG = d3.select('#chart-svg');

        //Container for the gradients
        var defs = chartSVG.append("defs");

        //Filter for the outside glow
        var filter = defs.append("filter")
            .attr("id","glow");
        filter.append("feGaussianBlur")
            .attr("stdDeviation","1.2")
            .attr("result","coloredBlur");
        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in","coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in","SourceGraphic");

        let screenWidth = screen.availWidth;

        let iScale = d3.scaleLinear().domain([0, data.length]).range([0, screenWidth/4 - 60]); 

        let propScale = d3.scaleLinear().domain([0, d3.max(data, (d) => {if(d) return d[prop]})]).range([0, 200]); 

        let yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => {if(d) return d[prop]})]).range([0, 200]).nice(); 

        let lineGenerator = d3
            .line()
            .x((d, i) => iScale(i))
            .y(d => {if(d) return propScale(d[prop])});


        let g = chartSVG.select('#'+prop+'-group');

        let axis = g.selectAll('.axis');

        axis.remove();

       // const xAxisGroup = g.append('g').classed('axis', true);
        const yAxisGroup = g.append('g').classed('axis', true);

       // const xAxisScale = d3.axisBottom(iScale);
        const yAxisScale = d3.axisLeft(yScale).tickSizeOuter(0);
       // xAxisGroup.call(xAxisScale);
        yAxisGroup.call(yAxisScale);
        
        let path = g.selectAll('path').data(data);
       
        let pathEnter = path.enter().append('path');

        path.exit().remove();

        path = path.merge(pathEnter);

        path.attr('opacity', 0);
    
        let pathA = lineGenerator(data);
            
        path.attr("d", pathA)
            .transition()
            .duration(duration)
            .attr('opacity', 1)
            .attr('class', 'path ' +prop+'-path')
            .style("filter", "url(#glow)");
    
    }


    clearChart(prop) {
        
        let chartSVG = d3.select('#chart-svg');
        let g = chartSVG.select('#'+prop+'-group');

        let path = g.selectAll('path');
        let axis = g.selectAll('.axis');

        path.remove();

        axis.remove();

    }


}