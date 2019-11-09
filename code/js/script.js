
function updateTime(time) {
    console.log(time);
}

function updatePollutant(pollutant) {
    console.log(pollutant);
}
    /**
     * Loads in the us-pollution-data.json
     */
d3.json('https://d3js.org/us-10m.v1.json').then( usMapData => {


    d3.json('data/pollution_data_rolled_up.json').then( pollutionData => {

            //Create Map Object
            let mapObj = new Map(usMapData, pollutionData);
            mapObj.createMap();

            //Creating all the Helper Elements
            let helperObj = new HelperElements(pollutionData, updatePollutant, updateTime);

    })

});

    