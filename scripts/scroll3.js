// using d3 for convenience
var main3 = d3.select("main");
var scrolly3 = main3.select("#scrolly-3");
var figure3 = scrolly3.select("figure");
var article3 = scrolly3.select("article");
var step3 = article3.selectAll(".step");

// initialize the scrollama
var scroller3 = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    // var stepH2 = Math.floor(window.innerHeight * 0.5);
    // step2.style("height", stepH2 + "px");

    var figureHeight3 = window.innerHeight / 2;
    var figureMarginTop3 = (window.innerHeight - figureHeight3) / 3;

    figure3
        .style("height", figureHeight3 + "px")
        .style("top", figureMarginTop3 + "px");

    // 3. tell scrollama to update new element dimensions
    scroller3.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }
    let currentIndex = response.index;
    let currentDirection = response.direction;

    // add color to current step only
    step3.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // // update graphic based on step
    // figure2.select("p").text(response.index + 1);

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
    scroller3
        .setup({
            step: "#scrolly-3 article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}

// kick things off
init();