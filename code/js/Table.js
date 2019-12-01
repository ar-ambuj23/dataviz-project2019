class Table{
    constructor(){

        this.tableHeaders = ["STATE", "CO", "NO2", "OZONE", "SO2"];

        this.tableElements = null;

        this.cell = {
            "width": 140,
            "height": 25,
            "buffer": 15
        };

        this.stateFlag = true;
        this.coFlag = false;
        this.no2Flag = false;
        this.ozoneFlag = false;
        this.so2Flag = false;

        this.width = screen.availWidth/2 - 50;
        this.height = this.width-200;
    }

    drawTable(stateDataArray){

        this.tableElements = stateDataArray.filter(function(el){
            return el != null;
        });

        let that = this;

        console.log('table appear')

        d3.select("#state").on("click",function(){that.sortState();});
        d3.select("#co").on("click",function(){that.sortCo();});
        d3.select("#so2").on("click",function(){that.sortSo2();});
        d3.select("#no2").on("click",function(){that.sortNo2();});
        d3.select("#ozone").on("click",function(){that.sortOzone();});

        that.updateTable()

    }
    sortState(){
        console.log("Function called")
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.stateFlag) return d3.ascending(a.State, b.State);
            return d3.descending(a.State, b.State);
        })
        that.stateFlag = !that.stateFlag;
        that.updateTable();
    }
    sortCo(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.coFlag) return d3.ascending(a["CO Mean"], b["CO Mean"]);
            return d3.descending(a["CO Mean"], b["CO Mean"]);
        })
        that.coFlag = !that.coFlag;
        that.updateTable();
    }

    sortNo2(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.no2Flag) return d3.ascending(a["NO2 Mean"], b["NO2 Mean"]);
            return d3.descending(a["NO2 Mean"], b["NO2 Mean"]);
        })
        that.no2Flag = !that.no2Flag;
        that.updateTable();
    }

    sortSo2(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.so2Flag) return d3.ascending(a["SO2 Mean"], b["SO2 Mean"]);
            return d3.descending(a["SO2 Mean"], b["SO2 Mean"]);
        })
        that.so2Flag = !that.so2Flag;
        that.updateTable();
    }
    sortOzone(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.ozoneFlag) return d3.ascending(a["O3 Mean"], b["O3 Mean"]);
            return d3.descending(a["O3 Mean"], b["O3 Mean"]);
        })
        that.ozoneFlag = !that.ozoneFlag;
        that.updateTable();
    }
    updateTable() {
        let that = this;

        //Making the table layout
        let tableLayout = d3.select("#info").select("svg")
            .append("foreignObject")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("xhtml:table")
            // .attr('transform','translate(20,0)')

        //Making the table header row
        tableLayout.append('thead').append('tr')
            .selectAll('th')
            .data(this.tableHeaders).enter()
            .append('th')
            .attr("width",this.cell.width)
            .attr("height",this.cell.height)
            .text(function(d){return d})

        //Making the other table rows
        let table = tableLayout.append('tbody')
                        .selectAll("tr")
                        .data(this.tableElements)

        let tableRows = table.enter()
                            .append('tr')

        table.exit().remove()
        table = tableRows.merge(table)

        //Populating the table rows
        let row_tds = table.selectAll("td").data(function(d){

            let rows = [

                {vis: 'state', value:[d.state]}, 
                {vis: 'co', value:[d.CO.toFixed(2)]},
                {vis: 'no2', value:[d.NO2.toFixed(2)]},
                {vis: 'o3', value:[d.O3.toFixed(2)]},
                {vis: 'so2', value:[d.SO2.toFixed(2)]},
            ]
            return rows

        })
        
        let row_tds_enter = row_tds.enter()
                                    .append("td")
                                    .attr("width",this.cell.width)
                                    .attr("height",this.cell.height)

                                                            
        row_tds.exit().remove()

        row_tds = row_tds.merge(row_tds_enter)


        //Handling the State Column
                let stateColumn = row_tds.filter((d) => {return d.vis == 'state'})

                let svgStateColumn = stateColumn.selectAll("svg").data(function(d){return d3.select(this).data()})

                let svgStateColumn_enter = svgStateColumn.enter() 
                                                            .append('svg')
                                                            .attr('width', this.cell.width)
                                                            .attr('height', this.cell.height)

                svgStateColumn.exit().remove() 

                svgStateColumn = svgStateColumn.merge(svgStateColumn_enter)

                // Adding text to State Column
                let stateText = svgStateColumn.selectAll('text').data(d =>(d.value)) // Add text to selection ##################

                let stateText_enter = stateText.enter() // Text Enter ##################
                                                .append('text')
                                                .attr("x",5) // giving a bit buffer gap between the line and the text in the table ##################
                                                .attr("y",this.cell.height/2) // center of the cell ##################
                                                .attr("transform", "translate(0,4)")
                                
                stateText.exit().remove() // Exit Text ##################

                stateText = stateText.merge(stateText_enter) // Merge Text ##################

                stateText.text(d => d) // Display Text ##################
                        .attr("id","stateText")



        //Handling the CO Column
                let coColumn = row_tds.filter((d) => {return d.vis == 'co'})

                let svgcoColumn = coColumn.selectAll("svg").data(function(d){return d3.select(this).data()})

                let svgcoColumn_enter = svgcoColumn.enter() 
                                                            .append('svg')
                                                            .attr('width', this.cell.width)
                                                            .attr('height', this.cell.height)

                svgcoColumn.exit().remove() 

                svgcoColumn = svgcoColumn.merge(svgcoColumn_enter)

                // Adding text to CO Column
                let coText = svgcoColumn.selectAll('text').data(d =>(d.value)) // Add text to selection ##################

                let coText_enter = coText.enter() // Text Enter ##################
                                                .append('text')
                                                .attr("x",5) // giving a bit buffer gap between the line and the text in the table ##################
                                                .attr("y",this.cell.height/2) // center of the cell ##################
                                                .attr("transform", "translate(0,4)")
                                
                coText.exit().remove() // Exit Text ##################

                coText = coText.merge(coText_enter) // Merge Text ##################

                coText.text(d => d) // Display Text ##################
                        .attr("id","coText")

    }

    clearTable(){

        //code to clear the table
        console.log('table disappear')

        d3.select("info-svg").select("foreignObject").remove()
        d3.select("info-svg").select("table").remove()


    }

}