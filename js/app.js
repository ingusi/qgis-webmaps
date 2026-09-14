"use strict";


/* =========================================================
   MAP CONFIGURATION
========================================================== */

const MAPS = {

    submarinecable: {
        category: "SUBMARINE CABLES",

        title: "Submarine Cable",

        description:
            "Interactive overview of submarine cable infrastructure and associated landing points.",

        url:
            "maps/submarinecable/index.html",

        legend:
            "assets/legends/submarinecable.png",

        chart: {
            enabled: true,

            csv:
                "assets/charts/submarinecable.csv",

            title:
                "Submarine Cable Landing Points by Country"
        }
    },


    mndwi: {
        category: "SATELLITE REMOTE SENSING",

        title: "Landsat / Sentinel MNDWI",

        description:
            "Interactive satellite-based analysis using the Modified Normalized Difference Water Index (MNDWI).",

        url:
            "maps/mndwi/index.html"

        /*
         * Enable later when the files are available:
         *
         * legend:
         *     "assets/legends/mndwi.png",
         *
         * chart: {
         *     enabled: true,
         *     csv: "assets/charts/mndwi.csv",
         *     title: "MNDWI Analysis"
         * }
         */
    },


    "wind-solar": {
        category: "RENEWABLE ENERGY",

        title: "Wind / Solar",

        description:
            "Interactive overview of selected wind and solar energy potential and related spatial information.",

        url:
            "maps/wind-solar/index.html"

        /*
         * Enable later when the files are available:
         *
         * legend:
         *     "assets/legends/wind-solar.png",
         *
         * chart: {
         *     enabled: true,
         *     csv: "assets/charts/wind-solar.csv",
         *     title: "Wind / Solar Statistics"
         * }
         */
    }
};


/* =========================================================
   DOM ELEMENTS
========================================================== */

const mapButtons =
    document.querySelectorAll(".map-button");


const mapFrame =
    document.getElementById("map-frame");


const mapLoading =
    document.getElementById("map-loading");


const mapCategory =
    document.getElementById("map-category");


const mapTitle =
    document.getElementById("map-title");


const mapDescription =
    document.getElementById("map-description");


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


const legendModalTitle =
    document.getElementById("legend-modal-title");


const chartModalTitle =
    document.getElementById("chart-modal-title");


const chartStatus =
    document.getElementById("chart-status");


const chartContainer =
    document.getElementById("chart-container");


let currentMapId =
    "submarinecable";


/* =========================================================
   MAP NAVIGATION
========================================================== */

function setActiveMapButton(mapId) {

    mapButtons.forEach((button) => {

        const isActive =
            button.dataset.map === mapId;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-selected",
            String(isActive)
        );
    });
}


function updateMapInformation(config) {

    mapCategory.textContent =
        config.category || "";


    mapTitle.textContent =
        config.title || "";


    mapDescription.textContent =
        config.description || "";
}


/* =========================================================
   MAP TOOLS
========================================================== */

function resetMapTools() {

    /*
     * This is important:
     *
     * When changing maps, the old legend/chart state
     * must never remain visible.
     */

    closeModal(legendModal);
    closeModal(chartModal);


    legendImage.removeAttribute("src");
    legendImage.removeAttribute("alt");


    legendButton.hidden = true;
    chartButton.hidden = true;


    chartStatus.classList.remove(
        "visible",
        "error"
    );


    chartStatus.textContent = "";


    chartContainer.innerHTML = "";
}


function updateMapTools(config) {

    resetMapTools();


    if (config.legend) {

        legendButton.hidden = false;
    }


    if (
        config.chart &&
        config.chart.enabled &&
        config.chart.csv
    ) {

        chartButton.hidden = false;
    }
}


/* =========================================================
   LOAD MAP
========================================================== */

function loadMap(mapId) {

    const config =
        MAPS[mapId];


    if (!config) {

        console.error(
            `Unknown map: ${mapId}`
        );

        return;
    }


    currentMapId =
        mapId;


    setActiveMapButton(
        mapId
    );


    updateMapInformation(
        config
    );


    updateMapTools(
        config
    );


    mapLoading.classList.remove(
        "hidden"
    );


    mapFrame.src =
        config.url;
}


/* =========================================================
   IFRAME LOADING
========================================================== */

mapFrame.addEventListener(
    "load",
    () => {

        mapLoading.classList.add(
            "hidden"
        );
    }
);


mapFrame.addEventListener(
    "error",
    () => {

        mapLoading.classList.add(
            "hidden"
        );

        console.error(
            "The selected QGIS web map could not be loaded."
        );
    }
);


/* =========================================================
   MAP BUTTON EVENTS
========================================================== */

mapButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const mapId =
                    button.dataset.map;


                if (!mapId) {
                    return;
                }


                loadMap(
                    mapId
                );
            }
        );
    }
);


/* =========================================================
   MODAL FUNCTIONS
========================================================== */

function openModal(modal) {

    if (!modal) {
        return;
    }


    modal.hidden = false;

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


function closeModal(modal) {

    if (!modal) {
        return;
    }


    modal.hidden = true;

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    const anyModalOpen =
        !legendModal.hidden ||
        !chartModal.hidden;


    if (!anyModalOpen) {

        document.body.style.overflow =
            "";
    }
}


/* =========================================================
   CLOSE BUTTONS / BACKDROPS
========================================================== */

document
    .querySelectorAll("[data-close-modal]")
    .forEach(
        (element) => {

            element.addEventListener(
                "click",
                () => {

                    closeModal(
                        element.closest(".modal")
                    );
                }
            );
        }
    );


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        closeModal(
            legendModal
        );


        closeModal(
            chartModal
        );
    }
);


/* =========================================================
   LEGEND
========================================================== */

legendButton.addEventListener(
    "click",
    () => {

        const config =
            MAPS[currentMapId];


        if (!config || !config.legend) {
            return;
        }


        legendImage.src =
            config.legend;


        legendImage.alt =
            `${config.title} legend`;


        legendModalTitle.textContent =
            `${config.title} — Legend`;


        openModal(
            legendModal
        );
    }
);


/* =========================================================
   CSV PARSER
========================================================== */

function parseCSV(text) {

    const rows = [];

    let row = [];

    let value = "";

    let insideQuotes = false;


    for (
        let i = 0;
        i < text.length;
        i += 1
    ) {

        const character =
            text[i];


        const nextCharacter =
            text[i + 1];


        if (insideQuotes) {

            if (
                character === '"' &&
                nextCharacter === '"'
            ) {

                value += '"';

                i += 1;

                continue;
            }


            if (character === '"') {

                insideQuotes = false;

                continue;
            }


            value +=
                character;

            continue;
        }


        if (character === '"') {

            insideQuotes = true;

            continue;
        }


        if (character === ",") {

            row.push(value);

            value = "";

            continue;
        }


        if (character === "\r") {

            if (
                nextCharacter === "\n"
            ) {

                i += 1;
            }


            row.push(value);

            rows.push(row);

            row = [];

            value = "";

            continue;
        }


        if (character === "\n") {

            row.push(value);

            rows.push(row);

            row = [];

            value = "";

            continue;
        }


        value +=
            character;
    }


    if (
        value.length > 0 ||
        row.length > 0
    ) {

        row.push(value);

        rows.push(row);
    }


    if (rows.length === 0) {
        return [];
    }


    const headers =
        rows[0].map(
            (header) =>
                header
                    .replace(/^\uFEFF/, "")
                    .trim()
        );


    return rows
        .slice(1)
        .filter(
            (currentRow) =>
                currentRow.some(
                    (cell) =>
                        cell.trim() !== ""
                )
        )
        .map(
            (currentRow) => {

                const object = {};


                headers.forEach(
                    (header, index) => {

                        object[header] =
                            currentRow[index] !== undefined
                                ? currentRow[index].trim()
                                : "";
                    }
                );


                return object;
            }
        );
}


/* =========================================================
   NUMBER PARSING
========================================================== */

function parseNumber(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return 0;
    }


    const normalized =
        String(value)
            .trim()
            .replace(/\s/g, "")
            .replace(",", ".");


    const number =
        Number(normalized);


    return Number.isFinite(number)
        ? number
        : 0;
}


/* =========================================================
   SUBMARINE CABLE DATA
========================================================== */

function prepareSubmarineCableData(rows) {

    /*
     * Aggregate by country.
     *
     * This makes the chart robust even if the CSV later contains
     * multiple rows for the same country.
     */

    const countryTotals =
        new Map();


    rows.forEach(
        (row) => {

            const country =
                String(
                    row.name_de || ""
                ).trim();


            if (!country) {
                return;
            }


            const landingPoints =
                parseNumber(
                    row.anzahl_landepunkte
                );


            const previous =
                countryTotals.get(country) || 0;


            countryTotals.set(
                country,
                previous + landingPoints
            );
        }
    );


    return Array.from(
        countryTotals.entries()
    )
        .map(
            ([country, landingPoints]) => ({
                country,
                landingPoints
            })
        )
        .sort(
            (a, b) =>
                b.landingPoints -
                a.landingPoints
        );
}


/* =========================================================
   LOAD CSV
========================================================== */

async function loadCSV(url) {

    const response =
        await fetch(
            url,
            {
                cache: "no-store"
            }
        );


    if (!response.ok) {

        throw new Error(
            `CSV could not be loaded: ${response.status} ${response.statusText}`
        );
    }


    const text =
        await response.text();


    if (!text.trim()) {

        throw new Error(
            "The CSV file is empty."
        );
    }


    return parseCSV(
        text
    );
}


/* =========================================================
   CREATE CHART
========================================================== */

function createSubmarineCableChart(data) {

    chartContainer.innerHTML = "";


    if (!data.length) {

        chartContainer.innerHTML =
            `
            <div class="chart-empty">
                No chart data was found.
            </div>
            `;

        return;
    }


    const maxValue =
        Math.max(
            ...data.map(
                (item) =>
                    item.landingPoints
            )
        );


    const scroll =
        document.createElement(
            "div"
        );

    scroll.className =
        "chart-scroll";


    const list =
        document.createElement(
            "div"
        );

    list.className =
        "chart-list";


    data.forEach(
        (item) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "chart-row";


            const country =
                document.createElement(
                    "div"
                );

            country.className =
                "chart-country";


            country.textContent =
                item.country;


            country.title =
                item.country;


            const barArea =
                document.createElement(
                    "div"
                );

            barArea.className =
                "chart-bar-area";


            const bar =
                document.createElement(
                    "div"
                );

            bar.className =
                "chart-bar";


            const percentage =
                maxValue > 0
                    ? (
                        item.landingPoints /
                        maxValue
                    ) * 100
                    : 0;


            bar.style.width =
                `${percentage}%`;


            barArea.appendChild(
                bar
            );


            const value =
                document.createElement(
                    "div"
                );

            value.className =
                "chart-value";


            value.textContent =
                item.landingPoints;


            row.appendChild(
                country
            );

            row.appendChild(
                barArea
            );

            row.appendChild(
                value
            );


            list.appendChild(
                row
            );
        }
    );


    scroll.appendChild(
        list
    );


    chartContainer.appendChild(
        scroll
    );
}


/* =========================================================
   CHART
========================================================== */

async function showChart() {

    const config =
        MAPS[currentMapId];


    if (
        !config ||
        !config.chart ||
        !config.chart.enabled
    ) {

        return;
    }


    chartModalTitle.textContent =
        config.chart.title;


    chartStatus.classList.remove(
        "error"
    );


    chartStatus.textContent =
        "Loading CSV data...";


    chartStatus.classList.add(
        "visible"
    );


    chartContainer.innerHTML =
        "";


    openModal(
        chartModal
    );


    try {

        const rows =
            await loadCSV(
                config.chart.csv
            );


        const data =
            prepareSubmarineCableData(
                rows
            );


        createSubmarineCableChart(
            data
        );


        chartStatus.classList.remove(
            "visible"
        );

    } catch (error) {

        console.error(
            "Chart loading error:",
            error
        );


        chartStatus.textContent =
            `Could not load chart data: ${error.message}`;


        chartStatus.classList.add(
            "visible",
            "error"
        );
    }
}


/* =========================================================
   CHART BUTTON
========================================================== */

chartButton.addEventListener(
    "click",
    () => {

        showChart();
    }
);


/* =========================================================
   INITIALIZE
========================================================== */

loadMap(
    "submarinecable"
);
