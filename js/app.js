"use strict";

/* =========================================================
MAP CONFIGURATION
========================================================= */

const MAPS = {


submarinecable: {

    category:
        "SUBMARINE CABLES",

    title:
        "Submarine Cable",

    description:
        "This interactive map shows submarine cable infrastructure " +
        "and the geographic distribution of submarine cable landing " +
        "points.",

    url:
        "maps/submarinecable/index.html",

    legend:
        "assets/legends/submarinecable.png",

    chart: {

        enabled:
            true,

        csv:
            "assets/charts/submarinecable.csv",

        title:
            "Submarine Cable Landing Points by Country"

    }

},


mndwi: {

    category:
        "SATELLITE REMOTE SENSING",

    title:
        "Landsat / Sentinel MNDWI",

    description:
        "This interactive map presents water-related information " +
        "derived from Landsat and Sentinel satellite imagery using " +
        "the Modified Normalized Difference Water Index (MNDWI).",

    url:
        "maps/mndwi/index.html",


    /*
    =========================================================
    MNDWI LEGEND — CURRENTLY DISABLED

    Enable when:

    assets/legends/mndwi.png

    is available.

    legend:
        "assets/legends/mndwi.png",
    =========================================================
    */


    /*
    =========================================================
    MNDWI CHART — CURRENTLY DISABLED

    Enable when:

    assets/charts/mndwi.csv

    is available.

    chart: {

        enabled: true,

        csv:
            "assets/charts/mndwi.csv",

        title:
            "MNDWI Analysis"

    }
    =========================================================
    */

},


"wind-solar": {

    category:
        "RENEWABLE ENERGY",

    title:
        "Wind / Solar",

    description:
        "This interactive map presents spatial information related " +
        "to wind and solar energy potential and allows the geographic " +
        "distribution of renewable energy resources to be explored.",

    url:
        "maps/wind-solar/index.html",


    /*
    =========================================================
    WIND / SOLAR LEGEND — CURRENTLY DISABLED

    Enable when:

    assets/legends/wind-solar.png

    is available.

    legend:
        "assets/legends/wind-solar.png",
    =========================================================
    */


    /*
    =========================================================
    WIND / SOLAR CHART — CURRENTLY DISABLED

    Enable when:

    assets/charts/wind-solar.csv

    is available.

    chart: {

        enabled: true,

        csv:
            "assets/charts/wind-solar.csv",

        title:
            "Wind / Solar Statistics"

    }
    =========================================================
    */

}


};

/* =========================================================
DOM ELEMENTS
========================================================= */

const mapButtons =
document.querySelectorAll(".map-button");

const mapCategory =
document.getElementById("map-category");

const mapTitle =
document.getElementById("map-title");

const mapDescription =
document.getElementById("map-description");

const mapFrame =
document.getElementById("map-frame");

const mapLoading =
document.querySelector(".map-loading");

const legendButton =
document.getElementById("legend-button");

const chartButton =
document.getElementById("chart-button");

const legendModal =
document.getElementById("legend-modal");

const chartModal =
document.getElementById("chart-modal");

const legendImage =
document.getElementById("legend-image");

const closeLegendButton =
document.getElementById("close-legend");

const closeChartButton =
document.getElementById("close-chart");

const chartStatus =
document.getElementById("chart-status");

const chartContainer =
document.getElementById("chart-container");

const chartCanvas =
document.getElementById("landing-points-chart");

/* =========================================================
STATE
========================================================= */

let currentMapId =
"submarinecable";

let landingPointsChart =
null;

let submarineCableData =
null;

/* =========================================================
LOAD CHART.JS
========================================================= */

/*
Chart.js is loaded dynamically.


This avoids putting another <script> element into
index.html and keeps the application logic in one place.


*/

function loadChartLibrary() {


return new Promise(
    (resolve, reject) => {

        if (
            typeof window.Chart !==
            "undefined"
        ) {

            resolve();

            return;
        }


        const script =
            document.createElement("script");


        script.src =
            "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js";


        script.onload =
            () => resolve();


        script.onerror =
            () => {

                reject(
                    new Error(
                        "Chart.js could not be loaded."
                    )
                );

            };


        document.head.appendChild(
            script
        );

    }
);


}

/* =========================================================
MAP LOADING
========================================================= */

function loadMap(mapId) {


const map =
    MAPS[mapId];


if (!map) {

    console.error(
        `Unknown map ID: ${mapId}`
    );

    return;
}


currentMapId =
    mapId;


/*
 * Update active navigation button
 */

mapButtons.forEach(
    button => {

        const isActive =
            button.dataset.map ===
            mapId;


        button.classList.toggle(
            "active",
            isActive
        );

    }
);


/*
 * Update text
 */

mapCategory.textContent =
    map.category;


mapTitle.textContent =
    map.title;


mapDescription.textContent =
    map.description;


/*
 * Close any open modal
 */

closeAllModals();


/*
 * Update map
 */

mapLoading.style.display =
    "flex";


mapFrame.title =
    `${map.title} interactive QGIS map`;


mapFrame.src =
    map.url;


/*
 * Enable / disable tools
 */

updateTools(map);


}

/* =========================================================
MAP IFRAME LOADED
========================================================= */

mapFrame.addEventListener(
"load",
() => {


    mapLoading.style.display =
        "none";

}


);

/* =========================================================
UPDATE TOOLS
========================================================= */

function updateTools(map) {


/*
 * Submarine Cable currently has
 * a legend and a chart.
 */

const hasLegend =
    Boolean(map.legend);


const hasChart =
    Boolean(
        map.chart &&
        map.chart.enabled
    );


legendButton.style.display =
    hasLegend
        ? "inline-flex"
        : "none";


chartButton.style.display =
    hasChart
        ? "inline-flex"
        : "none";


/*
 * Update legend source
 */

if (hasLegend) {

    legendImage.src =
        map.legend;


    legendImage.alt =
        `${map.title} legend`;

}


}

/* =========================================================
NAVIGATION EVENTS
========================================================= */

mapButtons.forEach(
button => {


    button.addEventListener(
        "click",
        () => {

            const mapId =
                button.dataset.map;


            loadMap(mapId);

        }
    );

}


);

/* =========================================================
LEGEND MODAL
========================================================= */

legendButton.addEventListener(
"click",
() => {


    const map =
        MAPS[currentMapId];


    if (!map || !map.legend) {

        return;
    }


    legendImage.src =
        map.legend;


    legendImage.alt =
        `${map.title} legend`;


    openModal(
        legendModal
    );

}


);

/* =========================================================
CHART MODAL
========================================================= */

chartButton.addEventListener(
"click",
async () => {


    const map =
        MAPS[currentMapId];


    if (
        !map ||
        !map.chart ||
        !map.chart.enabled
    ) {

        return;
    }


    openModal(
        chartModal
    );


    await loadSubmarineCableChart(
        map.chart
    );

}


);

/* =========================================================
OPEN MODAL
========================================================= */

function openModal(modal) {


modal.classList.remove(
    "hidden"
);


modal.setAttribute(
    "aria-hidden",
    "false"
);


document.body.style.overflow =
    "hidden";


}

/* =========================================================
CLOSE MODAL
========================================================= */

function closeModal(modal) {


modal.classList.add(
    "hidden"
);


modal.setAttribute(
    "aria-hidden",
    "true"
);


if (
    legendModal.classList.contains(
        "hidden"
    ) &&
    chartModal.classList.contains(
        "hidden"
    )
) {

    document.body.style.overflow =
        "";

}


}

/* =========================================================
CLOSE ALL MODALS
========================================================= */

function closeAllModals() {


closeModal(
    legendModal
);


closeModal(
    chartModal
);


}

/* =========================================================
CLOSE BUTTONS
========================================================= */

closeLegendButton.addEventListener(
"click",
() => {


    closeModal(
        legendModal
    );

}


);

closeChartButton.addEventListener(
"click",
() => {


    closeModal(
        chartModal
    );

}


);

/* =========================================================
CLICK OUTSIDE MODAL
========================================================= */

document.querySelectorAll(
".modal-backdrop"
).forEach(
backdrop => {


    backdrop.addEventListener(
        "click",
        () => {

            const modalType =
                backdrop.dataset.closeModal;


            if (
                modalType ===
                "legend"
            ) {

                closeModal(
                    legendModal
                );

            }


            if (
                modalType ===
                "chart"
            ) {

                closeModal(
                    chartModal
                );

            }

        }
    );

}


);

/* =========================================================
ESC KEY
========================================================= */

document.addEventListener(
"keydown",
event => {


    if (
        event.key ===
        "Escape"
    ) {

        closeAllModals();

    }

}


);

/* =========================================================
CSV LOADING
========================================================= */

async function loadCSV(url) {


const response =
    await fetch(url, {
        cache: "no-cache"
    });


if (!response.ok) {

    throw new Error(
        `CSV could not be loaded. HTTP status: ${response.status}`
    );

}


/*
 * Read as text.

 * UTF-8 is expected, which preserves German
 * characters such as:
 *
 * Österreich
 * Südkorea
 * Saudi-Arabien
 */

const text =
    await response.text();


return text;


}

/* =========================================================
CSV PARSER
========================================================= */

/*
This parser handles:


- commas
- quoted values
- commas inside quoted values
- escaped quotes
- Windows line endings
- UTF-8 text


*/

function parseCSV(text) {


const rows = [];

let row = [];

let value = "";

let insideQuotes =
    false;


for (
    let i = 0;
    i < text.length;
    i++
) {

    const character =
        text[i];


    const nextCharacter =
        text[i + 1];


    /*
     * Quoted field
     */

    if (
        character === '"'
    ) {

        if (
            insideQuotes &&
            nextCharacter === '"'
        ) {

            value += '"';

            i++;

            continue;
        }


        insideQuotes =
            !insideQuotes;

        continue;

    }


    /*
     * Comma outside quotes
     */

    if (
        character === "," &&
        !insideQuotes
    ) {

        row.push(
            value
        );

        value =
            "";

        continue;

    }


    /*
     * New line outside quotes
     */

    if (
        (
            character === "\n" ||
            character === "\r"
        ) &&
        !insideQuotes
    ) {

        /*
         * Handle Windows CRLF.
         */

        if (
            character === "\r" &&
            nextCharacter === "\n"
        ) {

            i++;

        }


        row.push(
            value
        );

        value =
            "";


        if (
            row.some(
                cell =>
                    cell.trim() !== ""
            )
        ) {

            rows.push(
                row
            );

        }


        row =
            [];

        continue;

    }


    value +=
        character;

}


/*
 * Add final value
 */

if (
    value.length > 0 ||
    row.length > 0
) {

    row.push(
        value
    );


    if (
        row.some(
            cell =>
                cell.trim() !== ""
        )
    ) {

        rows.push(
            row
        );

    }

}


if (
    rows.length === 0
) {

    return [];

}


/*
 * First row = headers
 */

const headers =
    rows[0].map(
        header =>
            header
                .replace(
                    /^\uFEFF/,
                    ""
                )
                .trim()
    );


/*
 * Remaining rows = data
 */

return rows
    .slice(1)
    .map(
        row => {

            const object = {};


            headers.forEach(
                (header, index) => {

                    object[header] =
                        row[index] !== undefined
                            ? row[index].trim()
                            : "";

                }
            );


            return object;

        }
    );


}

/* =========================================================
PREPARE SUBMARINE CABLE DATA
========================================================= */

function prepareSubmarineCableData(
rows
) {


/*
 * Only rows with a country name and a valid
 * landing-point number are used.
 */

const validRows =
    rows.filter(
        row => {

            const country =
                row.name_de?.trim();


            const value =
                Number(
                    row.anzahl_landepunkte
                );


            return (
                country &&
                Number.isFinite(value)
            );

        }
    );


/*
 * Sort descending:
 *
 * highest number of landing points
 * -> lowest number
 */

validRows.sort(
    (a, b) => {

        return (
            Number(
                b.anzahl_landepunkte
            ) -
            Number(
                a.anzahl_landepunkte
            )
        );

    }
);


return validRows;


}

/* =========================================================
CREATE SUBMARINE CABLE CHART
========================================================= */

async function loadSubmarineCableChart(
configuration
) {


chartStatus.className =
    "chart-status";


chartStatus.textContent =
    "Loading CSV data...";


try {

    /*
     * Use cached data when possible.
     */

    if (
        !submarineCableData
    ) {

        const csvText =
            await loadCSV(
                configuration.csv
            );


        const rows =
            parseCSV(
                csvText
            );


        submarineCableData =
            prepareSubmarineCableData(
                rows
            );

    }


    if (
        submarineCableData.length === 0
    ) {

        throw new Error(
            "The CSV contains no valid country data."
        );

    }


    /*
     * Render chart
     */

    await loadChartLibrary();


    createLandingPointsChart(
        submarineCableData,
        configuration.title
    );


    chartStatus.className =
        "chart-status success";


    chartStatus.textContent =
        `${submarineCableData.length} countries loaded from submarinecable.csv.`;

}
catch (error) {

    console.error(
        "Chart error:",
        error
    );


    chartStatus.className =
        "chart-status error";


    chartStatus.textContent =
        `Could not load the chart: ${error.message}`;

}


}

/* =========================================================
CREATE CHART
========================================================= */

function createLandingPointsChart(
data,
title
) {


/*
 * Destroy previous chart.
 */

if (
    landingPointsChart
) {

    landingPointsChart.destroy();

    landingPointsChart =
        null;

}


/*
 * Increase canvas height according to
 * number of countries.

 * This is important because the CSV contains
 * many countries.
 */

const chartHeight =
    Math.max(
        500,
        data.length * 24
    );


chartContainer.style.height =
    `${chartHeight}px`;


/*
 * Create labels.
 */

const labels =
    data.map(
        row =>
            row.name_de
    );


/*
 * Create values.
 */

const values =
    data.map(
        row =>
            Number(
                row.anzahl_landepunkte
            )
    );


/*
 * Create colors.

 * Countries with zero landing points get
 * a lighter color.
 */

const backgroundColors =
    values.map(
        value => {

            if (
                value === 0
            ) {

                return "rgba(160, 174, 181, 0.38)";

            }


            return "rgba(11, 83, 111, 0.72)";

        }
    );


const borderColors =
    values.map(
        value => {

            if (
                value === 0
            ) {

                return "rgba(130, 145, 153, 0.70)";

            }


            return "#0b536f";

        }
    );


/*
 * Create Chart.js chart.
 */

const context =
    chartCanvas.getContext(
        "2d"
    );


landingPointsChart =
    new Chart(
        context,
        {

            type:
                "bar",

            data: {

                labels:
                    labels,

                datasets: [

                    {

                        label:
                            "Landing points",

                        data:
                            values,

                        backgroundColor:
                            backgroundColors,

                        borderColor:
                            borderColors,

                        borderWidth:
                            1,

                        borderRadius:
                            3,

                        barPercentage:
                            0.82,

                        categoryPercentage:
                            0.9

                    }

                ]

            },


            options: {

                indexAxis:
                    "y",


                responsive:
                    true,


                maintainAspectRatio:
                    false,


                animation: {

                    duration:
                        350

                },


                interaction: {

                    mode:
                        "nearest",

                    axis:
                        "y",

                    intersect:
                        false

                },


                plugins: {

                    title: {

                        display:
                            true,

                        text:
                            title,

                        color:
                            "#173847",

                        font: {

                            size:
                                17,

                            weight:
                                "600"

                        },

                        padding: {

                            bottom:
                                18

                        }

                    },


                    legend: {

                        display:
                            false

                    },


                    tooltip: {

                        callbacks: {

                            title:
                                tooltipTitle,

                            label:
                                tooltipLabel

                        }

                    }

                },


                scales: {

                    x: {

                        beginAtZero:
                            true,

                        ticks: {

                            precision:
                                0,

                            color:
                                "#637680"

                        },

                        title: {

                            display:
                                true,

                            text:
                                "Number of landing points",

                            color:
                                "#526672",

                            font: {

                                size:
                                    12,

                                weight:
                                    "600"

                            }

                        },

                        grid: {

                            color:
                                "rgba(30, 60, 70, 0.08)"

                        }

                    },


                    y: {

                        ticks: {

                            color:
                                "#344e5a",

                            font: {

                                size:
                                    11

                            }

                        },

                        grid: {

                            display:
                                false

                        }

                    }

                }

            }

        }
    );


}

/* =========================================================
TOOLTIP TITLE
========================================================= */

function tooltipTitle(
tooltipItems
) {


if (
    !tooltipItems ||
    tooltipItems.length === 0
) {

    return "";

}


return tooltipItems[0].label;


}

/* =========================================================
TOOLTIP LABEL
========================================================= */

function tooltipLabel(
context
) {


const value =
    context.raw;


return ` Landing points: ${value}`;


}

/* =========================================================
INITIALIZATION
========================================================= */

function initializeApplication() {


/*
 * Start with Submarine Cable.
 */

loadMap(
    "submarinecable"
);


}

/* =========================================================
START APPLICATION
========================================================= */

document.addEventListener(
"DOMContentLoaded",
initializeApplication
);
