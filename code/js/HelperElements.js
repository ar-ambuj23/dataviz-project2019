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
    constructor() {
        console.log("Coming here?")
        this.pollutants = ["All","Corbon Monoxide", "Sulphur Dioxide","Nitrous Oxide","Ozone"]

    }

    
    /**
     * draws the time slider and
     * throws related events.
     */
    drawTimeSlider(rangeStart, rangeEnd, timePeriod) {

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
        let dropDown = document.getElementById("#pollutantDropDown")
        console.log(pollutatntList)




    }


    /**
     * draws the info-box when a 
     * particular state is selected.
     */
    drawInfoBox(state, time, timePeriod) {

    }
    
}