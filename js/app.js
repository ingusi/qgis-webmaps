"use strict";


/* =========================================
   MAP CONFIGURATION
========================================= */

const maps = {

    submarinecable: {

        title: "Submarine Cable",

        description:
            "This interactive map presents submarine cable infrastructure " +
            "and its geographic distribution. The map provides a spatial " +
            "overview of submarine cable routes and related features.",

        url:
            "maps/submarinecable/index.html",

        legend:
            "assets/legends/submarinecable.png",

        chart: {

            enabled: true,

            title:
                "Submarine Cable Statistics",

            type:
                "bar",

            labels: [
                "Europe",
                "North America",
                "Asia",
                "Africa",
                "South America"
            ],

            data: [
                24,
                31,
                42,
                18,
                13
            ],

            label:
                "Number of cables"

        }

    },


    mndwi: {

        title:
            "Landsat / Sentinel MNDWI",

        description:
            "This interactive map shows water-related information " +
            "derived from Landsat and Sentinel satellite imagery using " +
            "the Modified Normalized Difference Water Index (MNDWI). " +
            "The index can be used to distinguish water surfaces from " +
            "built-up areas and surrounding land.",

        url:
            "maps/mndwi/index.html",

        legend:
            "assets/legends/mndwi.png",

        chart: {

            enabled: true,

            title:
                "MNDWI Analysis",

            type:
                "line",

            labels: [
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "2025"
            ],

            data: [
                42,
                46,
                44,
                51,
                57,
                62,
                68
            ],

            label:
                "Water surface index"

        }

    },


    "wind-solar": {

        title:
            "Wind / Solar",

        description:
            "This interactive map presents spatial information " +
            "related to wind and solar energy potential. The map " +
            "can be used to investigate the geographic distribution " +
            "of renewable energy resources.",

        url:
            "maps/wind-solar/index.html",

        legend:
            "assets/legends/wind-solar.png",

        chart: {

            enabled: true,

            title:
                "Renewable Energy Potential",

            type:
                "bar",

            labels: [
                "North",
                "South",
                "East",
                "West",
                "Central"
            ],

            data: [
                72,
                58,
                81,
                65,
                74
            ],

            label:
                "Potential (%)"

        }

    }

};


/* =========================================
   DOM ELEMENTS
========================================= */

const mapButtons =
    document.querySelectorAll(".map-button");

const mapTitle =
    document.getElementById("map-title");

const mapDescription =
    document.getElementById("map-description");

const mapFrame =
    document.getElementById("map-frame");

const legendImage =
    document.getElementById("legend-image");

const legendButton =
    document.getElementById("legend-button");

const chartButton =
    document.getElementById("chart-button");

const legendPanel =
    document.getElementById("legend-panel");

const chartPanel =
    document.getElementById("chart-panel");

const closeLegend =
    document.getElementById("close-legend");

const closeChart =
    document.getElementById("close-chart");

const chartContainer =
    document.getElementById("chart-container");


/* =========================================
   CHART INSTANCE
========================================= */

let chartInstance = null;


/* =========================================
   CHANGE MAP
========================================= */

function loadMap(mapId) {

    const map = maps[mapId];

    if (!map) {
        console.error(
            `Map "${mapId}" does not exist.`
        );

        return;
    }


    /*
     * Update active navigation button
     */

    mapButtons.forEach(button => {

        const buttonMap =
            button.dataset.map;

        button.classList.toggle(
            "active",
            buttonMap === mapId
        );

    });


    /*
     * Update title
     */

    mapTitle.textContent =
        map.title;


    /*
     * Update description
     */

    mapDescription.textContent =
        map.description;


    /*
     * Load qgis2web map
     */

    mapFrame.src =
        map.url;


    /*
     * Load legend
     */

    legendImage.src =
        map.legend;

    legendImage.alt =
        `${map.title} legend`;


    /*
     * Update chart
     */

    createChart(map.chart);


    /*
     * Close panels when changing map
     */

    legendPanel.classList.add("hidden");

    chartPanel.classList.add("hidden");

}


/* =========================================
   CREATE CHART
========================================= */

function createChart(configuration) {

    /*
     * Remove old chart
     */

    if (chartInstance) {

        chartInstance.destroy();

        chartInstance = null;
    }


    /*
     * Clear container
     */

    chartContainer.innerHTML = "";


    if (!configuration || !configuration.enabled) {

        chartButton.style.display =
            "none";

        return;
    }


    chartButton.style.display =
        "inline-block";


    /*
     * Create canvas
     */

    const canvas =
        document.createElement("canvas");

    canvas.id =
        "map-chart";


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "chart-wrapper";

    wrapper.appendChild(canvas);

    chartContainer.appendChild(wrapper);


    /*
     * Create Chart.js chart
     */

    const context =
        canvas.getContext("2d");


    chartInstance =
        new Chart(context, {

            type:
                configuration.type,

            data: {

                labels:
                    configuration.labels,

                datasets: [

                    {

                        label:
                            configuration.label,

                        data:
                            configuration.data,

                        backgroundColor:
                            "rgba(11, 83, 111, 0.65)",

                        borderColor:
                            "#0b536f",

                        borderWidth:
                            2,

                        borderRadius:
                            5,

                        tension:
                            0.3,

                        fill:
                            configuration.type === "line"

                    }

                ]

            },

            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                plugins: {

                    title: {

                        display:
                            true,

                        text:
                            configuration.title,

                        font: {

                            size:
                                18

                        }

                    },

                    legend: {

                        display:
                            true

                    }

                },

                scales: {

                    y: {

                        beginAtZero:
                            true

                    }

                }

            }

        });

}


/* =========================================
   NAVIGATION EVENTS
========================================= */

mapButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const mapId =
                button.dataset.map;

            loadMap(mapId);

        }
    );

});


/* =========================================
   LEGEND BUTTON
========================================= */

legendButton.addEventListener(
    "click",
    () => {

        legendPanel.classList.remove(
            "hidden"
        );

        chartPanel.classList.add(
            "hidden"
        );

    }
);


/* =========================================
   CHART BUTTON
========================================= */

chartButton.addEventListener(
    "click",
    () => {

        chartPanel.classList.remove(
            "hidden"
        );

        legendPanel.classList.add(
            "hidden"
        );

    }
);


/* =========================================
   CLOSE LEGEND
========================================= */

closeLegend.addEventListener(
    "click",
    () => {

        legendPanel.classList.add(
            "hidden"
        );

    }
);


/* =========================================
   CLOSE CHART
========================================= */

closeChart.addEventListener(
    "click",
    () => {

        chartPanel.classList.add(
            "hidden"
        );

    }
);


/* =========================================
   CLOSE PANELS WITH ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            legendPanel.classList.add(
                "hidden"
            );

            chartPanel.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================
   INITIAL MAP
========================================= */

loadMap("submarinecable");
