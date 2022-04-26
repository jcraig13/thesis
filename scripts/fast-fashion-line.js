
function drawLineChart() {
    // write your code here

    d3.csv("./data/brands.csv", function(data) {
        console.log(data)

        const yAccessor = (d) => d.Zara;
        const HAccesor = (d) => d.hM;
        const TAccessor = (d) => d.ThredUp;
        const PAccessor = (d) => d.Poshmark;
        const xAccessor = (d) => d.Year;
        //create margins
    let dimensions = {
        width: window.innerWidth,
        height: 600,
        margin: {
          top: 5,
          right: 280,
          bottom: 40,
          left: 280,
        },
        };
        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
        
        const wrapper = d3
            .select("#brand-line")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);
    
        //Log our new Wrapper Variable to the console to see what it looks like
        console.log("wrapper",wrapper);
        
        const bounds = wrapper
            .append("g")
            .style("transform",
              `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`
            );
    
        //y scale
    
        const yScale = d3
            .scaleLinear()
            // .domain(d3.extent(data, yAccessor))
            .domain([0,25000])
            .range([dimensions.boundedHeight, 0]);
            wrapper.append("g")
            .attr("class","myYaxis")
            
        console.log(yScale(100));
        const referenceBandPlacement = yScale(100);
        const referenceBand = bounds
            .append("rect")
            .attr("x", 0)
            .attr("width", dimensions.boundedWidth)
            .attr("y", referenceBandPlacement)
            .attr("height", dimensions.boundedHeight - referenceBandPlacement);
            
        //x scale
        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, xAccessor))
            .range([0, dimensions.boundedWidth]);
            wrapper.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class","myXaxis")
            
            
        //zara Line
        const zaraGenerator = d3
            .line()
            .x((d) => xScale(xAccessor(d)))
            .y((d) => yScale(yAccessor(d)))
            .curve(d3.curveBasis);
            
            
        const line = bounds
            .append("path")
            .attr("d", zaraGenerator(data))
    
            
        .attr("fill", "none")
            .attr("stroke", "#A743AE")
            .attr("stroke-width", 3);
            
        //hM Line
        const hMLineGenerator = d3
            .line() 
            .x((d) => xScale(xAccessor(d)))
            .y((d) => yScale(HAccesor(d)))
            .curve(d3.curveBasis)
            
                
        const line2 = bounds
            .append("path")
            .attr('d', hMLineGenerator(data))
            
        .attr("fill", "none")
            .attr("stroke", "#E95585")
            .attr("stroke-width", 3);
            
        //thred Line
        const thredLineGenerator = d3
            .line() 
            .x((d) => xScale(xAccessor(d)))
            .y((d) => yScale(TAccessor(d)))
            .curve(d3.curveBasis)
            
                
        const line3 = bounds
            .append("path")
            .attr('d', thredLineGenerator(data))
            
        .attr("fill", "none")
            .attr("stroke", "#AFF066")
            .attr("stroke-width", 3);
            
         //posh Line
        const poshLineGenerator = d3
            .line() 
            .x((d) => xScale(xAccessor(d)))
            .y((d) => yScale(PAccessor(d)))
            .curve(d3.curveBasis)
            
                
        const line4 = bounds
            .append("path")
            .attr('d', poshLineGenerator(data))
            
        .attr("fill", "none")
            .attr("stroke", "#4EB2D0")
            .attr("stroke-width", 3);
            
            
        // Generate Y Axis
    
        const yAxisGenerator = d3.axisLeft().scale(yScale);
        const yAxis = bounds.append("g")
            .call(yAxisGenerator)
            .style("font-size", "12px");
    
        // Generate X Axis
        const xAxisGenerator = d3.axisBottom().scale(xScale);
        const xAxis = bounds
            .append("g")
            .call(xAxisGenerator.tickFormat(d3.format('d')))
            .style("transform", `translateY(${dimensions.boundedHeight}px)`)
            .style("font-size", "12px");
        
    })

    

    
    
    // wrapper
    //     .append("g")
    //     .style("transform", `translate(${50}px,${15}px)`)
    //     .append("rect")
    //     .attr("x", 50)
    //     .attr('y', 50)
        // .attr("class", "title")
        // .attr("x", dimensions.width / 2)
        // .attr("y", dimensions.margin.top / 2)
        // .attr("text-anchor", "middle")
        // .text("Air Quality in NYC")
        // .style("font-size", "36px")
        // .style("font-family", "Helvetica")
}
drawLineChart()


// References:
// https://stackoverflow.com/questions/11189284/d3-axis-labeling
// https://vizartpandey.com/creating-simple-line-charts-using-d3-js-part-01/
// https://www.youtube.com/watch?v=xFI-us1moj0
function update(data) {

    // Create the X axis:
    x.domain([0, d3.max(data, function(d) { return d.Year }) ]);
    wrapper.selectAll(".myXaxis").transition()
      .duration(3000)
      .call(xAxis);
  
    // create the Y axis
    y.domain([0, d3.max(data, function(d) { return d.Zara  }) ]);
    wrapper.selectAll(".myYaxis")
      .transition()
      .duration(3000)
      .call(yAxis);
  
    // Create a update selection: bind to the new data
    var u = wrapper.selectAll(".lineTest")
      .data([data], function(d){ return d.Year });
  
    // Updata the line
    u
      .enter()
      .append("path")
      .attr("class","lineTest")
      .merge(u)
      .transition()
      .duration(3000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Zara); }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
  }
  
  // At the beginning, I run the update function on the first dataset:
  update(data1)

