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

        this.currentyear = 2004

        // Calling Helper Methods
        this.drawTimeSlider();
    //  this.drawToggle();
        this.addButtonListeners();

        this.stopValue = false;

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
        d3.select('#stopButton').on("click", function(){
            return that.stop();
        })
    }

    play(){
        let that = this;
        
        // console.log("Play button clicked");

        let i = 2000;
        let j = 2017;
        function f() {

            // console.log(that.stopValue)
            
            if(that.stopValue == true){
                that.stopValue = false;
                return
            }

            that.clearSlider();
            that.currentyear = i;
            that.drawTimeSlider();
            that.updateTime(i);
            i++;
            if( i < j ){
                setTimeout( f, 1000 );
            }
        }
        f();
    }

    stop(){
        this.stopValue = true;
        // console.log('stop fn')
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
            .attr('value', this.currentyear)
            .attr('id', 'time-slider')
            .style('width', '730px');

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.currentyear);

        sliderText.attr('x', timeScale(this.currentyear));
        sliderText.attr('y', 25);

        let timeSlider = d3.select('#time-slider');

        timeSlider.on('input', function() {
            let time = this.value;
            that.updateTime(time);

            //Changing the year label under the slider
            let new_active_year = timeSlider.node().value
            this.currentyear = new_active_year
            sliderText.html(new_active_year)
            sliderText.attr('x',timeScale(this.currentyear));
        });
    }

    clearSlider(){
        d3.select("#SliderView").select(".slider-wrap").remove()
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