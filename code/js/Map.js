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

    constructor(usData, pollutionData, updatePrimaryChart, updateComparableChart, clearCharts) {
        this.usData = usData;
        this.pollutionData = pollutionData;
        this.centered = null;

        this.width = screen.availWidth/2 - 50;
        this.height = this.width-200;

        this.activeTime = 2004;
        this.activePollutant = 'CARBON MONOXIDE';
        this.updatePrimaryChart = updatePrimaryChart;
        this.updateComparableChart = updateComparableChart;
        this.stateDataArray = null;
        this.clearCharts = clearCharts;

    }

    /**
     * creates the map based on 
     * the initially loaded values.
     * TBD: might be redundant since
     * we have updateMap(), too.
     */
    createMap() {

        let that = this;

        var MapView = d3.select("#MapView")

        MapView.append("div").attr("id", "buttons");
        MapView.append("div").attr("id", "slider");
        MapView.append("div").attr("id", "map");
        MapView.append("div").attr("id", "info");
        MapView.append("div").attr("id", "break");
        MapView.append("div").attr("id", "charts");

        var MapSVG = d3.select("#map")
                        .append("svg")
                        .attr("id", "map-svg")
                        .attr("width", this.width)
                        .attr("height", this.height);

        var infoSVG = d3.select("#info")
                        .append("svg")
                        .attr("id", "info-svg")
                        .attr("width", this.width)
                        .attr("height", this.height);

        var breakDiv = d3.select("#break")
                        .append("br")
                        .append("br")
                        .append("br")
                        .append("br");

        var chartSVG = d3.select("#charts")
                        .append("svg")
                        .attr("id", "chart-svg")
                        .attr("width", screen.availWidth-50)
                        .attr("height", 300);
        
        chartSVG.append('g').attr('id', 'CO-group').attr('width', screen.availWidth/4 - 10).attr('transform', 'translate(40, 0)');   
        chartSVG.append('g').attr('id', 'SO2-group').attr('width', screen.availWidth/4 - 10).attr('transform', 'translate('+screen.availWidth/4+30+', 0)');
        chartSVG.append('g').attr('id', 'NO2-group').attr('width', screen.availWidth/4 - 10).attr('transform', 'translate('+screen.availWidth/2+30+', 0)');
        chartSVG.append('g').attr('id', 'O3-group').attr('width', screen.availWidth/4 -10).attr('transform', 'translate('+screen.availWidth*3/4+30+', 0)');

        //TODO: add projections to resize map

        
        var path = d3.geoPath();
 
        MapSVG.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(this.usData, this.usData.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("transform", 'scale(0.6   , 0.6)')
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

            let stateData = this.getYearWiseStateData(this.activeTime, state.id);
            this.stateDataArray.push(stateData);


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
          k = 1.5;
          this.centered = d;
          var state;
          for(var stateData of this.stateDataArray) {
              if(stateData != null && stateData.stateCode == d.id) {
                  state = stateData;
                  break;
              }
          }
  
          this.drawWikiBox(state);
          this.drawPrimaryChart(state);
        } else {
          x = this.width / 1.1;
          y = this.height / 1.1;
          k = 1;
          this.centered = null;
          this.clearHighlight();
        }
        g.selectAll("path")
            .classed("active", this.centered && function(d) { return d === this.centered; });
        g.transition()
            .duration(750)
            .attr("transform", "translate(" + this.width / 1.1 + "," + this.height / 1.1 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");
        
    }



    drawWikiBox(state) {
        

       var stateArray = new Array();

       if(state) {
            stateArray[0] = {"name": "", "value":state.state, "class": "state-text"};
            stateArray[1] = {"name": "Carbon Monoxide:", "value": state.CO.toFixed(2), "class": "attribute-value"};
            stateArray[2] = {"name" : "Sulfur Dioxide:", "value": state.SO2.toFixed(2), "class": "attribute-value" };
            stateArray[3] = {"name" : "Nitrous Oxide:", "value": state.NO2.toFixed(2), "class": "attribute-value"};
            stateArray[4] = {"name": "Ozone:", "value": state.O3.toFixed(2), "class": "attribute-value"};
            stateArray[5] = {"name": "", "value": "For more information, visit https://www.epa.gov/criteria-air-pollutants/naaqs-table", "class": "website"};
        
       }
       
       else if(state == null) {
            stateArray[0] = {"name": "", "value":"Sorry, we don't have anything on this one!", "class": "attribute-value"};
       }

        let infoSVG = d3.select('#info-svg');

        let infoLabels = infoSVG
                            .selectAll("text")
                            .data(stateArray);

        let infoLabelsEnter = infoLabels.enter().append("text");

        infoLabels.exit().remove(); 
        
        infoLabels = infoLabels.merge(infoLabelsEnter);

        infoLabels.attr("x", function(d,i) { return 25; })
                .attr("y", function(d,i) { return (i+1)*30; })
                .attr("class", function(d,i) { return d.class;})
                .attr('margin-bottom', 25)
                .text(function(d,i) { return d.name +" " + d.value; });
    }


    /**
     * clears any state selection.
     */
    clearHighlight() {
        this.clearCharts();

        let infoSVG = d3.select('#info-svg');
        infoSVG.selectAll("text").remove();
    }


    drawPrimaryChart(state) {

        if(state == null) return;

        let yearWiseStateData = new Array();

        for(var year = 2000; year <= 2016; year++) {
          let stateDataArray = this.getYearWiseStateData(year, state.stateCode);
          yearWiseStateData.push(stateDataArray);

        }

        this.updatePrimaryChart(yearWiseStateData);

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
                    .domain([0,d3.max(this.stateDataArray, function(d) { if(d) return d['CO'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#f9fbe7","#c0ca33"]);
                break;

             case 'SULPHUR DIOXIDE' :
                return d3.scaleLinear()
                    .domain([0,d3.max(this.stateDataArray, function(d) { if(d) return d['SO2'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#ffeda0","#f03b20"]);
                break;

            case 'NITROUS OXIDE' :
                return d3.scaleLinear()
                    .domain([0,d3.max(this.stateDataArray, function(d) { if(d) return d['NO2'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#fde0dd","#c51b8a"]);
                break;

            case 'OZONE' :
                return d3.scaleLinear()
                    .domain([0,d3.max(this.stateDataArray, function(d) { if(d) return d['O3'] })])
                    .interpolate(d3.interpolateRgb)
                    .range(["#ece2f0","#1c9099"]);

            default: return null;
        }
    
    }

    getPollutantProperty(activePollutant) {
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
            if(stateData != null && stateData.stateCode == id) return stateData;
        }

        return null;
    }


  

    getYearWiseStateData(year, code) {

        let stateDataArray = this.pollutionData.filter(function(d){return d['State Code'] == code;});

        let stateDataArrayTimewise = stateDataArray.filter(function(d){return d['Date Local'].substring(0,4) == year;});

        if(stateDataArrayTimewise.length > 0) {

            let totalNO2AQI = d3.sum(stateDataArrayTimewise, d => d['NO2 AQI']);

            let totalCOAQI = d3.sum(stateDataArrayTimewise, d => d['CO AQI']);

            let totalSO2AQI = d3.sum(stateDataArrayTimewise, d => d['SO2 AQI']);

            let totalO3AQI = d3.sum(stateDataArrayTimewise, d => d['O3 AQI']);

            let stateCode = stateDataArrayTimewise[0]['State Code'];
            
            let state = stateDataArrayTimewise[0]['State'];
            
            let stateData = new StateData(stateCode, state, year,
                totalSO2AQI, totalNO2AQI, totalO3AQI, totalCOAQI);

            return stateData;
            
        }
    }

}