/**
 * This class draws all the helper
 * elements needed by the NYSM interface.
 * List of helper elements:
 * 1. Time Slider.
 * 2. Time Period Toggle.
 * 3. Pollutant Dropdown.
 * 4. Info Box.
 */

class HelperElements {
    
    constructor() {
        this.pollutants = ["All","Corbon Monoxide", "Sulphur Dioxide","Nitrous Oxide","Ozone"]
        this.drawDropdown(this.pollutants)

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
        let dropDown = document.getElementById("#pollutantDropDown");
        console.log(dropDown);
        console.log(pollutantList, pollutantList.length)
        for(let i = 0; i < pollutantList.length; i++) {
            let val = pollutantList[i];
            console.log(val)
            let dd = document.createElement("option");
            dd.textContent = val;
            dd.value = val;
            if(dropDown) dropDown.appendChild(dd);
        }




    }


    /**
     * draws the info-box when a 
     * particular state is selected.
     */
    drawInfoBox(state, time, timePeriod) {

    }
    
}