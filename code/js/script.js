
    /**
     * Loads in the us-pollution-data.json
     */


d3.json('https://d3js.org/us-10m.v1.json').then( usMapData => {

    let mapObj = null;
    let helperObj = null;
    let chartObj = null;

    d3.json('data/pollution_data_rolled_up.json').then( pollutionData => {

            //Create Map Object
            chartObj = new LineCharts();
            mapObj = new Map(usMapData, pollutionData, updatePrimaryChart, updateComparableChart, clearCharts, updateTable, clearTable);
            mapObj.createMap();

            //Creating all the Helper Elements
            helperObj = new HelperElements(pollutionData, updatePollutant, updateTime);

            tableObj = new Table();

    })

    function updateTime(time) {
        mapObj.updateMapForTime(time);   
    }

    function updatePollutant(pollutant) {
        mapObj.updateMapForPollutant(pollutant);
    }

    function updatePrimaryChart(yearWiseStateData) {
        chartObj.drawPrimary(yearWiseStateData);
    }
       
    function updateComparableChart(stateData) {
        chartObj.drawComparable(stateData);
    }

    function clearCharts() {
        chartObj.clearCharts();
    }

    function updateTable(stateDataArray){
        tableObj.drawTable(stateDataArray);
    }

    function clearTable() {
        tableObj.clearTable();
    }
    
});

    


    