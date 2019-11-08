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

        MapView.append("div").attr("id", "buttons")
        MapView.append("div").attr("id", "slider")
        MapView.append("div").attr("id", "map")

        var MapSVG = d3.select("#map")
                        .append("svg")
                        .attr("width","1000")
                        .attr("height","600")

        var path = d3.geoPath();

        MapSVG.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(this.usData, this.usData.objects.states).features)
            .enter().append("path")
            .attr("d", path);

        MapSVG.append("path")
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