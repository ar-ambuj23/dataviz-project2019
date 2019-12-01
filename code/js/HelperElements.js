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
    constructor(pollutionData, updatePollutant, updateTime) {
        
        // // Making a list of options for drop down
        // this.pollutantList = ["Carbon Monoxide", "Sulphur Dioxide","Nitrous Oxide","Ozone"]
        
        //Making Pollution Data a class variable
        this.pollutionData = pollutionData;

        this.updatePollutant = updatePollutant;

        this.updateTime = updateTime;



        // Calling Helper Methods
        this.drawTimeSlider();
    //  this.drawToggle();
        this.addButtonListeners();

    }
    

    addButtonListeners() {
        let that = this;
        d3.select('#coButton').on("click", () => this.updatePollutant("Carbon Monoxide"));
        d3.select('#soButton').on("click", () => this.updatePollutant("Sulphur Dioxide"));
        d3.select('#noButton').on("click", () => this.updatePollutant("Nitrous Oxide"));
        d3.select('#o3Button').on("click", () => this.updatePollutant("Ozone"));
        d3.select('#playButton').on("click", function(){
            return that.play();
        })

    }
    play(){
        let that = this;
        console.log("Play button clicked");

        let i = 2000;
        let j = 2017;
        function f() {
            that.updateTime(i);
            i++;
            if( i < j ){
                setTimeout( f, 500 );
            }
        }
        f();
    }

    /**
     * draws the time slider and
     * throws related events.
     */
    drawTimeSlider() {

        let that = this;

        // Making a scale for slider
        let timeScale = d3.scaleLinear().domain([2000, 2016]).range([30, 730]); 

        d3.select("#SliderView")
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 2000)
            .attr('max', 2016)
            .attr('value', 2004)
            .attr('id', 'time-slider')
            .style('width', function(){return screen.availWidth/2 - 50 + 'px'});

        let timeSlider = d3.select('#time-slider');

        timeSlider.on('input', function() {
            let time = this.value;
            that.updateTime(time);
        });
    }

    /**
     * draws the time period toggle 
     * and throws related events.
     */
    drawToggle() {
        let svgBtn = d3.select('#buttons').append("div").classed('toggle-btn', true);

        // Toggle Button
        svgBtn.append('span').text("MONTH  ");

        
        svgBtn.append('span').append("label")
            .attr("id", "labelID")
            .attr("class", "switch")
            .append("input")
            .attr("type", "checkbox")
            .attr("id", "toggleSwitch")

        d3.select("#labelID").append("span")
            .attr("class", "tBtnSlider round")


        svgBtn.append("span").text("   YEAR")
    }

    // /*
    //  * draws the dropdown for 
    //  * pollutants and throws related events.
    //  */
    // drawDropdown(pollutantList) {

    //     let that = this;

    //     let option_select = d3.select("#buttons")
    //             .append("div")
    //             .append("select")
    //             .attr("id", "pollutantSelector")

    //     for (var i = 0; i < this.pollutantList.length; i++) {
    //         var opt = option_select.append("option")
    //         .attr("value", this.pollutantList[i])
    //         .text(this.pollutantList[i]);
    //     }

    //     option_select.on('change', function(d, i) {
    //         let selectedPollutant = this.options[this.selectedIndex].value;
    //         that.updatePollutant(selectedPollutant);
    //     });
    // }

    // /**
    //  * draws the info-box when a 
    //  * particular state is selected.
    //  */
    // drawInfoBox(state, time, timePeriod) {

    // }
    
}