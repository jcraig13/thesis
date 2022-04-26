// using d3 for convenience
var main2 = d3.select("main");
var scrolly2 = main2.select("#scrolly-2");
var figure2 = scrolly2.select("figure");
var article2 = scrolly2.select("article");
var step2 = article2.selectAll(".step");

// initialize the scrollama
var scroller2 = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    // var stepH2 = Math.floor(window.innerHeight * 0.5);
    // step2.style("height", stepH2 + "px");

    var figureHeight2 = window.innerHeight / 2;
    var figureMarginTop2 = (window.innerHeight - figureHeight2) / 3;

    figure2
        .style("height", figureHeight2 + "px")
        .style("top", figureMarginTop2 + "px");

    // 3. tell scrollama to update new element dimensions
    scroller2.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    step2.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // update graphic based on step
    figure2.select("p").text(response.index + 1);
}

function setupStickyfill() {
    d3.selectAll(".sticky").each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller2
        .setup({
            step: "#scrolly-2 article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}

// kick things off
init();