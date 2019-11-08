 
    /**
     * Loads in the us-pollution-data.json
     */
d3.json('https://d3js.org/us-10m.v1.json').then( usMapData => {

            //Create Map Object
            let mapObj = new Map(usMapData,null);
            mapObj.createMap();

            // let helperObj = new HelperElements();

            
});
    