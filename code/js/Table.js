class Table{
    constructor(){
        this.tableHeaders = ["STATE", "CO", "NO2", "OZONE", "SO2"];

        this.tableElements = null;

        this.cell = {
            "width": 70,
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
        //code for table with stateDataArray
        //select info box svg and make your table
        //be aware bcz some objects in the stateDataArray will be null. Don't display these rows.
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
        // console.log("Inside update table")
        // console.log(this.tableElements)
        let that = this;

        let table = d3.select("#info").select("svg")
            .append("foreignObject")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("xhtml:table")
            .attr('transform','translate(20,0)')

        table.append('thead').append('tr')
            .selectAll('th')
            .data(this.tableHeaders).enter()
            .append('th')
            .text(function(d){return d})
            .exit().remove()


        let tBody = table.append('tbody');
        let tr = tBody.append('tr').data(this.tableElements);
        let td = tr.append('td').data(function(d){
            let rows = [ {vis:"text",value:d["State"]},
                {vis:"CO", value:d["CO Mean"]},
                {vis:"SO2", value:d["SO2 Mean"]},
                {vis:"NO2", value:d["NO2 Mean"]},
                {vis:"Ozone", value:d["O3 Mean"]}
            ]
            return rows;
        }).enter();


        //create all the columns
        // let td = table.selectAll("td").data(function(d){
        //     let rows = [ {vis:"text",value:d["State"]},
        //         {vis:"CO", value:d["CO Mean"]},
        //         {vis:"SO2", value:d["SO2 Mean"]},
        //         {vis:"NO2", value:d["NO2 Mean"]},
        //         {vis:"Ozone", value:d["O3 Mean"]}
        //     ]
        //     return rows;
        // });
        // let td_val = td.enter().append("td");
        // td.exit().remove();
        // td = td_val.merge(td);

        //State column
        let stateColumn = table.selectAll('td').filter(d=>{ return d.vis == 'text';});
        let stateColumnSvg = stateColumn.selectAll("svg").data(function(d){
            return d3.select(this).data();
        });
        let stateColumnSvgEnter = stateColumnSvg.enter().append("svg");
        stateColumnSvg.exit().remove();
        stateColumnSvg = stateColumnSvgEnter.merge(stateColumnSvg);
        stateColumnSvg.attr("width",this.cell.width).attr("height",this.cell.height);
        let stateColumnSvgText = stateColumnSvg.selectAll("text").data(function(d){
            return d3.select(this).data();
        });
        let stateColumnSvgTextEnter = stateColumnSvgText.enter().append("text");
        stateColumnSvgText.exit().remove();
        stateColumnSvgText = stateColumnSvgTextEnter.merge(stateColumnSvgText);
        stateColumnSvgText.text(d=>d.value).attr("transform","translate(0,20)").classed("TableText",true);

        //CO column
        let coColumn = table.selectAll('td').filter(d=>{ return d.vis == 'CO';});
        let coColumnSvg = coColumn.selectAll("svg").data(function(d){
            return d3.select(this).data();
        });
        let coColumnSvgEnter = coColumnSvg.enter().append("svg");
        coColumnSvg.exit().remove();
        coColumnSvg = coColumnSvgEnter.merge(coColumnSvg);
        coColumnSvg.attr("width",this.cell.width).attr("height",this.cell.height);
        let coColumnSvgText = coColumnSvg.selectAll("text").data(function(d){
            return d3.select(this).data();
        });
        let coColumnSvgTextEnter = coColumnSvgText.enter().append("text");
        coColumnSvgText.exit().remove();
        coColumnSvgText = coColumnSvgTextEnter.merge(coColumnSvgText);
        coColumnSvgText.text(d=>d.value).attr("transform","translate(0,20)").classed("TableText",true);

        //SO2 Column
        let so2Column = table.selectAll('td').filter(d=>{ return d.vis == 'SO2';});
        let so2ColumnSvg = so2Column.selectAll("svg").data(function(d){
            return d3.select(this).data();
        });
        let so2ColumnSvgEnter = so2ColumnSvg.enter().append("svg");
        so2ColumnSvg.exit().remove();
        so2ColumnSvg = so2ColumnSvgEnter.merge(so2ColumnSvg);
        so2ColumnSvg.attr("width",this.cell.width).attr("height",this.cell.height);
        let so2ColumnSvgText = so2ColumnSvg.selectAll("text").data(function(d){
            return d3.select(this).data();
        });
        let so2ColumnSvgTextEnter = so2ColumnSvgText.enter().append("text");
        so2ColumnSvgText.exit().remove();
        so2ColumnSvgText = so2ColumnSvgTextEnter.merge(so2ColumnSvgText);
        so2ColumnSvgText.text(d=>d.value).attr("transform","translate(0,20)").classed("TableText",true);

        //NO2 Column
        let no2Column = table.selectAll('td').filter(d=>{ return d.vis == 'NO2';});
        let no2ColumnSvg = no2Column.selectAll("svg").data(function(d){
            return d3.select(this).data();
        });
        let no2ColumnSvgEnter = no2ColumnSvg.enter().append("svg");
        no2ColumnSvg.exit().remove();
        no2ColumnSvg = no2ColumnSvgEnter.merge(no2ColumnSvg);
        no2ColumnSvg.attr("width",this.cell.width).attr("height",this.cell.height);
        let no2ColumnSvgText = no2ColumnSvg.selectAll("text").data(function(d){
            return d3.select(this).data();
        });
        let no2ColumnSvgTextEnter = no2ColumnSvgText.enter().append("text");
        no2ColumnSvgText.exit().remove();
        no2ColumnSvgText = no2ColumnSvgTextEnter.merge(no2ColumnSvgText);
        no2ColumnSvgText.text(d=>d.value).attr("transform","translate(0,20)").classed("TableText",true);


        //Ozone Column
        let OzoneColumn = table.selectAll('td').filter(d=>{ return d.vis == 'Ozone';});
        let OzoneColumnSvg = OzoneColumn.selectAll("svg").data(function(d){
            return d3.select(this).data();
        });
        let OzoneColumnSvgEnter = OzoneColumnSvg.enter().append("svg");
        OzoneColumnSvg.exit().remove();
        OzoneColumnSvg = OzoneColumnSvgEnter.merge(OzoneColumnSvg);
        OzoneColumnSvg.attr("width",this.cell.width).attr("height",this.cell.height);
        let OzoneColumnSvgText = OzoneColumnSvg.selectAll("text").data(function(d){
            return d3.select(this).data();
        });
        let OzoneColumnSvgTextEnter = OzoneColumnSvgText.enter().append("text");
        OzoneColumnSvgText.exit().remove();
        OzoneColumnSvgText = OzoneColumnSvgTextEnter.merge(OzoneColumnSvgText);
        OzoneColumnSvgText.text(d=>d.value).attr("transform","translate(0,20)").classed("TableText",true);

    }

    clearTable(){

        //code to clear the table
        console.log('table disappear')

        d3.select("info-svg").select("foreignObject").remove()


    }

}