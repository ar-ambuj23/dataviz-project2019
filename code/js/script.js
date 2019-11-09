
    /**
     * Loads in the us-pollution-data.json
     */


d3.json('https://d3js.org/us-10m.v1.json').then( usMapData => {

    let mapObj = null;
    let helperObj = null;

    d3.json('data/pollution_data_rolled_up.json').then( pollutionData => {

            //Create Map Object
            mapObj = new Map(usMapData, pollutionData);
            mapObj.createMap();

            //Creating all the Helper Elements
            helperObj = new HelperElements(pollutionData, updatePollutant, updateTime);

    })

    function updateTime(time) {
        mapObj.updateMapForTime(time);   
    }

    function updatePollutant(pollutant) {
        mapObj.updateMapForPollutant(pollutant);
    }
       
});

    


    