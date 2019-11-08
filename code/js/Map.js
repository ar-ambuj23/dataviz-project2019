class Map {

    constructor(usData,pollutionData) {
        this.usData = usData;
        this.pollutionData = pollutionData;
    }

    /**
     * creates the map based on 
     * the initially loaded values.
     * TBD: might be redundant since
     * we have updateMap(), too.
     */
    createMap() {
        //console.log("Inside crete map");
        var MapView = d3.select("#MapView")

        var MapViewSVG = MapView.select("svg")

        var path = d3.geoPath();

        MapViewSVG.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(this.usData, this.usData.objects.states).features)
            .enter().append("path")
            .attr("d", path);

        MapViewSVG.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(this.usData, this.usData.objects.states, function(a, b) { return a !== b; })));


    }

    /**
     * updates the map on the highlight
     * and change of time / selection of 
     * pollutant.
     */
    updateMap() {

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
    highlightState() {

    }

    /**
     * clears any state selection.
     */
    clearHighlight() {

    }

}