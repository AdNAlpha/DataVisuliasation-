function init() {
    
    var margin = { top: 20, right: 20, bottom: 20, left: 40 };
    var w = 500 - margin.left - margin.right;
    var h = 250 - margin.top - margin.bottom;
    var maxValue = 25; // Set maxValue for random number generation
    var barPadding = 3;

    // dataset for the bars
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

    // xScale for the bars
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, w])
        .paddingInner(0.05);

    // yScale for the bars
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([h, 0]);

    // SVG container
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("fill", "rgb(106, 90, 205)");

    // Function to draw the bars
    function drawBars(data) {
        // Bind the data to the rectangles
        var bars = svg.selectAll("rect")
            .data(data);

        // Create new bars
        bars.enter()
            .append("rect")
            .attr("x", w)
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function(d, i) 
                { return xScale(i); })

            .attr("y", function(d) 
                { return yScale(d); })

            .attr("width", xScale.bandwidth())

            .attr("height", function(d) 
                { return h - yScale(d); });

        // Remove old bars
        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove();

        // Bind and update labels
        var labels = svg.selectAll("text")
            .data(data);

        // Create new labels
        labels.enter()
            .append("text")
            .merge(labels)
            .transition()
            .duration(500)
            .text(function(d)
                 { return d; })

            .attr("x", function(d, i) 
                { return xScale(i) + xScale.bandwidth() / 2; })

            .attr("y", function(d) 
                { return yScale(d) - 4; })

            .attr("fill", "Black")
            .attr("text-anchor", "middle");

        // Remove old labels
        labels.exit()
            .remove();
    }

    // Initial drawing of the bars
    drawBars(dataset);

    // Click event for the Add button
    d3.select("#AddButton")
        .on("click", function() {
            // Add new random number to the dataset
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);

            // Update xScale 
            xScale.domain(d3.range(dataset.length));

            // Update yScale domain 
            yScale.domain([0, d3.max(dataset)]);

            // Redraw the bars with the updated dataset
            drawBars(dataset);
        });
        
        // Remove button 
        d3.select("#RemoveButton")
        .on("click", function(){
            dataset.pop(); 
            drawBars(dataset);
        })
}

window.onload = init;
