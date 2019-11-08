class HelperElements {

/**
 * This class draws all the helper
 * elements needed by the NYSM interface.
 * List of helper elements:
 * 1. Time Slider.
 * 2. Time Period Toggle.
 * 3. Pollutant Dropdown.
 * 4. Info Box.
 */
    constructor(pollutionData) {
        console.log("Inside the Helper Class Constructor")
        
        // Making a list of options for drop down
        this.pollutantList = ["All","Corbon Monoxide", "Sulphur Dioxide","Nitrous Oxide","Ozone"]
        
        //Making Pollution Data a class variable
        this.pollutionData = pollutionData;

        // Calling Helper Methods
        this.drawTimeSlider();
        this.drawDropdown();

    }
    
    /**
     * draws the time slider and
     * throws related events.
     */
    drawTimeSlider() {

        // Making a scale for slider
        let yearScale = d3.scaleLinear().domain([2000, 2016]).range([30, 730]); 

        console.log('Inside drawTimeSlider')
        d3.select("#slider")
        .append('div').classed('slider-wrap', true)
        .append('input').classed('slider', true)
        .attr('type', 'range')
        .attr('min', 2000)
        .attr('max', 2016)
        .attr('value', 2004);
    }

    /**
     * draws the time period toggle 
     * and throws related events.
     */
    drawToggle() {

    }

    /**
     * draws the dropdown for 
     * pollutants and throws related events.
     */
    drawDropdown(pollutantList) {
        // console.log(this.pollutionData)

    var option_select = d3.select("#buttons")
            .append("div")
            .append("select")
            .attr("id", "pollutantSelector")

  for (var i = 0; i < this.pollutantList.length; i++) {
        var opt = option_select.append("option")
        .attr("value", this.pollutantList[i])
        .text(this.pollutantList[i]);
  }
}

    /**
     * draws the info-box when a 
     * particular state is selected.
     */
    drawInfoBox(state, time, timePeriod) {

    }
    
}