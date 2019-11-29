class StateData {

    constructor(stateCode, state, year, SO2, NO2, O3, CO) {
        this.stateCode = stateCode;
        this.state = state;
        this.year = year;
        this.SO2 = SO2;
        this.NO2 = NO2;
        this.O3 = O3;
        this.CO = CO;
    }
}

class Map {

    constructor(usData,pollutionData) {
        this.usData = usData;
        this.pollutionData = pollutionData;
        this.centered = null;
        this.width = 1000;
        this.height = 800;
        this.activeTime = 2004;
        this.activePollutant = 'CARBON MONOXIDE';

        this.stateDataArray = null;


    }

    /**
     * creates the map based on 
     * the initially loaded values.
     * TBD: might be redundant since
     * we have updateMap(), too.
     */
    createMap() {
        //console.log("Inside crete map");

        let that = this;

        var MapView = d3.select("#MapView")

        MapView.append("div").attr("id", "buttons")
        MapView.append("div").attr("id", "slider")
        MapView.append("div").attr("id", "map")
        MapView.append("div").attr("id", "info")

        var MapSVG = d3.select("#map")
                        .append("svg")
                        .attr("id", "map-svg")
                        .attr("width",this.width)
                        .attr("height", this.height);

        var infoSVG = d3.select("#info")
                        .append("svg")
                        .attr("id", "info-svg")
                        .attr("width", 500)
                        .attr("height", 800);
        //TODO: add projections to resize map

        var path = d3.geoPath();
 
        MapSVG.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(this.usData, this.usData.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .on("click", d => this.highlightState(d, path));

        this.updateMapForTime(this.activeTime);

    }

    /**
     * updates the map 
     * change of time.
     */
    updateMapForTime(time) {

        let mapSVG = d3.select('#map-svg');

        let g = mapSVG.select('g');

        var states = g.selectAll("path")
                .data(topojson.feature(this.usData, this.usData.objects.states).features)
                .style("fill", function(d) { 
                    return 'white';
                });

        
        this.activeTime = time;

        let that = this;

        this.stateDataArray = new Array();

        let topoJSON = topojson.feature(this.usData, this.usData.objects.states);

        topoJSON.features.map(state => {

            let stateDataArray = this.pollutionData.filter(function(d){return d['State Code'] == state.id;});

            let stateDataArrayTimewise = stateDataArray.filter(function(d){return d['Date Local'].substring(0,4) == that.activeTime;});

            if(stateDataArrayTimewise.length > 0) {

                let length = stateDataArrayTimewise.length;

                let totalNO2AQI = d3.sum(stateDataArray, d => d['NO2 AQI']);

                let totalCOAQI = d3.sum(stateDataArray, d => d['CO AQI']);

                let totalSO2AQI = d3.sum(stateDataArray, d => d['SO2 AQI']);

                let totalO3AQI = d3.sum(stateDataArray, d => d['O3 AQI']);

                let stateCode = stateDataArrayTimewise[0]['State Code'];
                
                let state = stateDataArrayTimewise[0]['State'];
                
                let stateData = new StateData(stateCode, state, that.activeTime,
                    totalSO2AQI/length, totalNO2AQI/length, totalO3AQI/length, totalCOAQI/length);
                
                this.stateDataArray.push(stateData);
            }


        });

        this.colorMap();

    }

    
    /**
     * updates the map on the
     * selection of pollutant.
     */
    updateMapForPollutant(pollutant) {
        
        this.activePollutant = pollutant;

        this.colorMap();

    }


    /**
     * highlights a particular state
     * to drill down on the state specific
     * pollutant values.
     * 
     * tentative: can be used to highlight 
     * multiple states for comparison between 
     * them.
     */
    highlightState(d, path) {

        let mapSVG = d3.select('#map-svg');
        let g = mapSVG.select('g');

        let x, y, k;
        if (d && this.centered !== d) {
          var centroid = path.centroid(d);
          x = centroid[0];
          y = centroid[1];
          k = 2.5;
          this.centered = d;
        } else {
          x = this.width / 2;
          y = this.height / 2;
          k = 1;
          this.centered = null;
        }
        g.selectAll("path")
            .classed("active", this.centered && function(d) { return d === this.centered; });
        g.transition()
            .duration(750)
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");

        this.drawWikiBox(d);
    }



    drawWikiBox(d) {
        var state;
        for(var stateData of this.stateDataArray) {
            if(stateData.stateCode == d.id) {
                state = stateData;
                break;
            }
       }

       var stateArray = new Array();
       var noStateArray = new Array();

       if(state) {
                        stateArray[0] = {"name": "", "value":state.state, "class": "state-text"};
                        stateArray[1] = {"name": "Carbon Monoxide:", "value": state.CO.toFixed(2), "class": "attribute-value"};
                        stateArray[2] = {"name" : "Sulfur Dioxide:", "value": state.SO2.toFixed(2), "class": "attribute-value" };
                        stateArray[3] = {"name" : "Nitrous Oxide:", "value": state.NO2.toFixed(2), "class": "attribute-value"};
                        stateArray[4] = {"name": "Ozone:", "value": state.O3.toFixed(2), "class": "attribute-value"};


                    let infoSVG = d3.select('#info-svg');

                    let infoLabels = infoSVG
                                        .selectAll("text")
                                        .data(stateArray);

                    let infoLabelsEnter = infoLabels.enter().append("text");

                    infoLabels.exit().remove(); 
                    
                    infoLabels = infoLabels.merge(infoLabelsEnter);

                    infoLabels.attr("x", function(d,i) { return 25; })
                            .attr("y", function(d,i) { return (i+1)*40; })
                            .attr("class", function(d,i) { return d.class;})
                            .attr('margin-bottom', 25)
                            .text(function(d,i) { return d.name +" " + d.value; });

                        // For the line path around explore button

                        var lineData = [ { "x": 25,   "y": 270},  { "x": 200,  "y": 270},
                                { "x": 200,  "y": 270}, { "x": 200,  "y": 320},
                                { "x": 200,  "y": 320},  { "x": 25, "y": 320},
                                { "x": 24,  "y": 320},  { "x": 25, "y": 270} ];
                
                        var lineFunction = d3.line()
                                        .x(function(d) { return d.x; })
                                        .y(function(d) { return d.y; })
                                        .curve(d3.curveLinear);

                        let pathLabels = infoSVG
                                        .selectAll("path")
                                        .data(lineData);
                    
                        let pathLabelsEnter = pathLabels.enter().append("path");

                        pathLabelsEnter.exit().remove(); 
                        
                        pathLabels = pathLabels.merge(pathLabelsEnter);

                        pathLabels.attr("stroke", "#EEEEEE")
                                    .attr("d", lineFunction(lineData))
                                    .attr("stroke-width", 1)
                                    .attr("fill", "none");

                        var totalLength = pathLabels.node().getTotalLength();

                        pathLabels
                            .attr("stroke-dasharray", totalLength + " " + totalLength)
                            .attr("stroke-dashoffset", totalLength)
                            .transition()
                            .duration(2000)
                            .ease(d3.easeLinear)
                            .attr('id', 'path-label')
                            .attr("stroke-dashoffset", 0);

                        // For the explore button
                        
                        let buttonText = infoSVG.selectAll('#button-text').data(['Explore']);

                        let buttonTextEnter = buttonText.enter().append('text');

                        buttonText.exit().remove();

                        buttonText = buttonText.merge(buttonTextEnter);

                        buttonText
                            .attr('x', 70.5)
                            .attr('y', 300)
                            .attr('id', 'button-text')
                            .classed('attribute-value', true)
                            .transition()
                            .duration(2000)
                            .ease(d3.easeLinear)
                            .text("Explore  ");
                    }
    

    if(state == null) {
        noStateArray[0] = {"name": "", "value":"Sorry, we don't have anything on this one!", "class": "attribute-value"};
        
        let infoSVG = d3.select('#info-svg');

                    let infoLabels = infoSVG
                                        .selectAll("text")
                                        .data(noStateArray);

                    let infoLabelsEnter = infoLabels.enter().append("text");

                    infoLabels.exit().remove(); 
                    
                    infoLabels = infoLabels.merge(infoLabelsEnter);

                    infoLabels.attr("x", function(d,i) { return 25; })
                            .attr("y", function(d,i) { return (i+1)*40; })
                            .attr("class", function(d,i) { return d.class;})
                            .attr('margin-bottom', 25)
                            .text(function(d,i) { return d.name +" " + d.value; });
       }
    }


    /**
     * clears any state selection.
     */
    clearHighlight() {

    }

    
    colorMap() {

        let heatMap = this.getHeatMap();

        let mapSVG = d3.select('#map-svg');
        let g = mapSVG.select('g');

        let that = this;

        let prop = this.getPollutantProperty(this.activePollutant);

        if(prop && this.stateDataArray) {
            var states = g.selectAll("path")
                .data(topojson.feature(this.usData, this.usData.objects.states).features)
                .style("fill", function(d) { 
                    var stateDataObj = that.getStateByID(d.id);
                    return stateDataObj != null ? heatMap(stateDataObj[prop]) : 0;
                });
        }
    }


    /**
    * gets the heatmap associated 
    * with the chosen pollutant.
    */

    getHeatMap() {

        if(this.activePollutant == null || this.stateDataArray == null || this.stateDataArray.length == 0) return null;

        switch(this.activePollutant.toUpperCase()) {

            case 'CARBON MONOXIDE' :
                return d3.scaleLinear()
                    .domain([0,d3.max(this.stateDataArray, function(d) { return d['CO'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#f9fbe7","#c0ca33"]);
                break;

             case 'SULPHUR DIOXIDE' :
                return d3.scaleLinear()
                    .domain([0,d3.max(this.stateDataArray, function(d) { return d['SO2'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#ffeda0","#f03b20"]);
                break;

            case 'NITROUS OXIDE' :
                return d3.scaleLinear()
                    .domain([0,d3.max(this.stateDataArray, function(d) { return d['NO2'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#fde0dd","#c51b8a"]);
                break;

            case 'OZONE' :
                return d3.scaleLinear()
                    .domain([0,d3.max(this.stateDataArray, function(d) { return d['O3'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#ece2f0","#1c9099"]);

            default: return null;
        }
    
    }

    getPollutantProperty(activePollutant) {
        console.log(activePollutant);
        if(activePollutant == null) return null;

        switch(activePollutant.toUpperCase()) {

            case 'SULPHUR DIOXIDE': return 'SO2';
            case 'OZONE': return 'O3';
            case 'CARBON MONOXIDE': return 'CO';
            case 'NITROUS OXIDE': return 'NO2';
            default: return null;
        }
    }

    getStateByID(id) {

        if(this.stateDataArray == null || this.stateDataArray.length == 0) return null;

        for(let stateData of this.stateDataArray) {
            if(stateData.stateCode == id) return stateData;
        }

        return null;
    }

}