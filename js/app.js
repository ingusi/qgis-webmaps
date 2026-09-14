"use strict";

/*
 * Main application for the QGIS web map viewer.
 * All paths are relative to the repository root.
 */

const MAPS = {
    submarinecable: {
        category: "SUBMARINE CABLES",
        title: "Submarine Cable",
        description:
            "Interactive overview of submarine cable infrastructure and associated landing points.",

        url: "maps/submarinecable/index.html",

        legend: "assets/legends/submarinecable.png",

        chart: {
            enabled: true,
            csv: "assets/charts/submarinecable.csv",
            title: "Submarine Cable Landing Points by Country"
        }
    },

    mndwi: {
        category: "SATELLITE REMOTE SENSING",
        title: "Landsat / Sentinel MNDWI",
        description:
            "Interactive satellite-based analysis using the Modified Normalized Difference Water Index (MNDWI).",

        url: "maps/mndwi/index.html"

        /*
         * Enable these when the corresponding files are available.
         *
         * legend: "assets/legends/mndwi.png",
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

        url: "maps/wind-solar/index.html"

        /*
         * Enable these when the corresponding files are available.
         *
         * legend: "assets/legends/wind-solar.png",
         *
         * chart: {
         *     enabled: true,
         *     csv: "assets/charts/wind-solar.csv",
         *     title: "Wind / Solar Statistics"
         * }
         */
    }
};


/* -------------------------------------------------------
   DOM elements
------------------------------------------------------- */

const mapButtons = document.querySelectorAll(".map-button");

const mapFrame = document.getElementById("map-frame");

const mapCategory = document.getElementById("map-category");
const mapTitle = document.getElementById("map-title");
const mapDescription = document.getElementById("map-description");

const legendButton = document.getElementById("legend-button");
const chartButton = document.getElementById("chart-button");

const legendModal = document.getElementById("legend-modal");
const chartModal = document.getElementById("chart-modal");

const legendImage = document.getElementById("legend-image");

const chartTitle = document.getElementById("chart-title");
const chartContainer = document.getElementById("chart-container");

const mapLoading = document.getElementById("map-loading");

let currentMapId = "submarinecable";
let chartInstance = null;


/* -------------------------------------------------------
   Utility functions
------------------------------------------------------- */

function getElement(selector, parent = document) {
    return parent.querySelector(selector);
}


function showElement(element) {
    if (!element) {
        return;
    }

    element.hidden = false;
    element.style.display = "";
}


function hideElement(element) {
    if (!element) {
        return;
    }

    element.hidden = true;
    element.style.display = "none";
}


/* -------------------------------------------------------
   Map loading
------------------------------------------------------- */

function loadMap(mapId) {
    const config = MAPS[mapId];

    if (!config) {
        console.error(`Unknown map: ${mapId}`);
        return;
    }

    currentMapId = mapId;

    updateNavigation(mapId);
    updateMapInformation(config);
    updateMapTools(config);

    if (mapFrame) {
        if (mapLoading) {
            showElement(mapLoading);
        }

        mapFrame.src = config.url;
    }

    closeModal(legendModal);
    closeModal(chartModal);
}


function updateNavigation(mapId) {
    mapButtons.forEach((button) => {
        const buttonMapId = button.dataset.map;

        const isActive = buttonMapId === mapId;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });
}


function updateMapInformation(config) {
    if (mapCategory) {
        mapCategory.textContent = config.category || "";
    }

    if (mapTitle) {
        mapTitle.textContent = config.title || "";
    }

    if (mapDescription) {
        mapDescription.textContent = config.description || "";
    }
}


function updateMapTools(config) {
    /*
     * Legend
     */

    if (legendButton) {
        if (config.legend) {
            showElement(legendButton);
            legendButton.disabled = false;
        } else {
            hideElement(legendButton);
            legendButton.disabled = true;
        }
    }


    /*
     * Chart
     */

    if (chartButton) {
        if (config.chart && config.chart.enabled && config.chart.csv) {
            showElement(chartButton);
            chartButton.disabled = false;
        } else {
            hideElement(chartButton);
            chartButton.disabled = true;
        }
    }
}


/* -------------------------------------------------------
   Map iframe loading indicator
------------------------------------------------------- */

if (mapFrame) {
    mapFrame.addEventListener("load", () => {
        if (mapLoading) {
            hideElement(mapLoading);
        }
    });

    mapFrame.addEventListener("error", () => {
        if (mapLoading) {
            hideElement(mapLoading);
        }

        console.error("The selected web map could not be loaded.");
    });
}


/* -------------------------------------------------------
   Navigation buttons
------------------------------------------------------- */

mapButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const mapId = button.dataset.map;

        if (!mapId) {
            console.error("Map button has no data-map attribute.");
            return;
        }

        loadMap(mapId);
    });
});


/* -------------------------------------------------------
   Modal handling
------------------------------------------------------- */

function openModal(modal) {
    if (!modal) {
        return;
    }

    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");

    const closeButton = getElement("[data-close-modal]", modal);

    if (closeButton) {
        closeButton.focus();
    }
}


function closeModal(modal) {
    if (!modal) {
        return;
    }

    modal.hidden = true;
    modal.classList.remove("is-open");

    if (!document.querySelector(".modal.is-open")) {
        document.body.classList.remove("modal-open");
    }
}


/*
 * Close buttons
 */

document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");

        closeModal(modal);
    });
});


/*
 * Close when clicking the dark backdrop
 */

document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});


/*
 * Escape key
 */

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    closeModal(legendModal);
    closeModal(chartModal);
});


/* -------------------------------------------------------
   Legend
------------------------------------------------------- */

if (legendButton) {
    legendButton.addEventListener("click", () => {
        const config = MAPS[currentMapId];

        if (!config || !config.legend) {
            return;
        }

        if (legendImage) {
            legendImage.src = config.legend;
            legendImage.alt = `${config.title} legend`;
        }

        openModal(legendModal);
    });
}


/* -------------------------------------------------------
   Chart.js
------------------------------------------------------- */

let chartJsPromise = null;


function loadChartJs() {
    if (window.Chart) {
        return Promise.resolve(window.Chart);
    }

    if (chartJsPromise) {
        return chartJsPromise;
    }

    chartJsPromise = new Promise((resolve, reject) => {
        const existingScript = document.querySelector(
            'script[data-chartjs="true"]'
        );

        if (existingScript) {
            existingScript.addEventListener("load", () => {
                if (window.Chart) {
                    resolve(window.Chart);
                } else {
                    reject(new Error("Chart.js loaded but Chart is unavailable."));
                }
            });

            existingScript.addEventListener("error", () => {
                reject(new Error("Chart.js could not be loaded."));
            });

            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js";

        script.async = true;
        script.dataset.chartjs = "true";

        script.addEventListener("load", () => {
            if (window.Chart) {
                resolve(window.Chart);
            } else {
                reject(new Error("Chart.js loaded but Chart is unavailable."));
            }
        });

        script.addEventListener("error", () => {
            reject(new Error("Chart.js could not be loaded."));
        });

        document.head.appendChild(script);
    });

    return chartJsPromise;
}


/* -------------------------------------------------------
   CSV parser
------------------------------------------------------- */

function parseCSV(text) {
    const rows = [];

    let row = [];
    let value = "";

    let insideQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
        const character = text[i];
        const nextCharacter = text[i + 1];

        if (insideQuotes) {
            if (character === '"' && nextCharacter === '"') {
                value += '"';
                i += 1;
            } else if (character === '"') {
                insideQuotes = false;
            } else {
                value += character;
            }

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

        if (character === "\n") {
            row.push(value);
            rows.push(row);

            row = [];
            value = "";

            continue;
        }

        if (character === "\r") {
            if (nextCharacter === "\n") {
                i += 1;
            }

            row.push(value);
            rows.push(row);

            row = [];
            value = "";

            continue;
        }

        value += character;
    }

    if (value.length > 0 || row.length > 0) {
        row.push(value);
        rows.push(row);
    }

    if (rows.length === 0) {
        return [];
    }

    const headers = rows[0].map((header) =>
        header.replace(/^\uFEFF/, "").trim()
    );

    return rows
        .slice(1)
        .filter((currentRow) =>
            currentRow.some((cell) => cell.trim() !== "")
        )
        .map((currentRow) => {
            const object = {};

            headers.forEach((header, index) => {
                object[header] =
                    currentRow[index] !== undefined
                        ? currentRow[index].trim()
                        : "";
            });

            return object;
        });
}


/* -------------------------------------------------------
   Submarine cable chart
------------------------------------------------------- */

function prepareSubmarineCableData(rows) {
    return rows
        .map((row) => {
            const country = row.name_de || "";

            const landingPoints = Number(
                String(row.anzahl_landepunkte || "0").replace(",", ".")
            );

            return {
                country,
                landingPoints: Number.isFinite(landingPoints)
                    ? landingPoints
                    : 0
            };
        })
        .filter((row) => row.country !== "")
        .sort((a, b) => b.landingPoints - a.landingPoints);
}


async function renderSubmarineCableChart(csvUrl, title) {
    if (!chartContainer) {
        throw new Error("Chart container not found.");
    }

    chartContainer.innerHTML =
        '<div class="chart-loading">Loading chart data…</div>';

    const response = await fetch(csvUrl, {
        cache: "no-cache"
    });

    if (!response.ok) {
        throw new Error(
            `CSV could not be loaded (${response.status} ${response.statusText}).`
        );
    }

    const csvText = await response.text();

    const rows = parseCSV(csvText);

    const data = prepareSubmarineCableData(rows);

    if (data.length === 0) {
        chartContainer.innerHTML =
            '<div class="chart-error">No chart data was found.</div>';

        return;
    }

    chartContainer.innerHTML = `
        <div class="chart-scroll">
            <div class="chart-canvas-wrapper">
                <canvas id="submarine-cable-chart"></canvas>
            </div>
        </div>
    `;

    const canvas = document.getElementById("submarine-cable-chart");

    if (!canvas) {
        throw new Error("Chart canvas could not be created.");
    }

    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }

    const chartHeight = Math.max(500, data.length * 24);

    const wrapper = getElement(".chart-canvas-wrapper", chartContainer);

    if (wrapper) {
        wrapper.style.height = `${chartHeight}px`;
    }

    const Chart = await loadChartJs();

    chartInstance = new Chart(canvas, {
        type: "bar",

        data: {
            labels: data.map((item) => item.country),

            datasets: [
                {
                    label: "Number of landing points",
                    data: data.map((item) => item.landingPoints),

                    backgroundColor: "rgba(37, 99, 235, 0.75)",
                    borderColor: "rgba(37, 99, 235, 1)",
                    borderWidth: 1,

                    borderRadius: 3
                }
            ]
        },

        options: {
            indexAxis: "y",

            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 400
            },

            plugins: {
                title: {
                    display: Boolean(title),
                    text: title || ""
                },

                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label(context) {
                            return ` ${context.parsed.x} landing points`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    beginAtZero: true,

                    ticks: {
                        precision: 0
                    },

                    title: {
                        display: true,
                        text: "Number of landing points"
                    }
                },

                y: {
                    ticks: {
                        autoSkip: false
                    },

                    title: {
                        display: true,
                        text: "Country"
                    }
                }
            }
        }
    });
}


/* -------------------------------------------------------
   Chart button
------------------------------------------------------- */

if (chartButton) {
    chartButton.addEventListener("click", async () => {
        const config = MAPS[currentMapId];

        if (
            !config ||
            !config.chart ||
            !config.chart.enabled ||
            !config.chart.csv
        ) {
            return;
        }

        if (chartTitle) {
            chartTitle.textContent =
                config.chart.title || "Chart";
        }

        openModal(chartModal);

        try {
            await renderSubmarineCableChart(
                config.chart.csv,
                config.chart.title
            );
        } catch (error) {
            console.error("Chart error:", error);

            if (chartContainer) {
                chartContainer.innerHTML = `
                    <div class="chart-error">
                        The chart could not be loaded.
                        <br>
                        <small>${escapeHtml(error.message)}</small>
                    </div>
                `;
            }
        }
    });
}


/* -------------------------------------------------------
   HTML escaping for error messages
------------------------------------------------------- */

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* -------------------------------------------------------
   Initial state
------------------------------------------------------- */

loadMap("submarinecable");
