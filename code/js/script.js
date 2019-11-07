 
    /**
     * Loads in the us-pollution-data.json
     */
d3.json('data/us-pollution-data.json').then( data => {

            //Create Map Object
            let map = new Map();
            map.createMap(data);
            
});
    