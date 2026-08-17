/* =========================================
   CYBER//BREACH — TELEMETRY ENGINE
   Visual cybersecurity simulation only
   ========================================= */

(() => {
    "use strict";

    const incidentHeader =
        document.querySelector(".incident-header");

    const metricValues =
        document.querySelectorAll(".radar-data .metric strong");

    if (!incidentHeader && !metricValues.length) return;

    const incidentValues =
        incidentHeader
            ? incidentHeader.querySelectorAll("strong")
            : [];

    const states = [
        "CONTAINED",
        "MONITORING",
        "ANALYZING",
        "STABLE"
    ];

    const severityStates = [
        "HIGH",
        "ELEVATED",
        "MEDIUM"
    ];

    const sessionStarted = Date.now();

    function random(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    function pad(value) {
        return String(value).padStart(2, "0");
    }

    function sessionTime() {
        const seconds =
            Math.floor(
                (Date.now() - sessionStarted) / 1000
            );

        const minutes =
            Math.floor(seconds / 60);

        const remaining =
            seconds % 60;

        return `${pad(minutes)}:${pad(remaining)}`;
    }

    function updateIncidentTelemetry() {
        if (incidentValues.length < 4) return;

        /*
         * Preserve:
         * 1. Incident ID
         * 2. Status
         * 3. Vector
         * 4. Severity
         */

        incidentValues[1].textContent =
            states[random(0, states.length - 1)];

        incidentValues[2].textContent =
            "SIMULATED";

        incidentValues[3].textContent =
            severityStates[random(0, severityStates.length - 1)];

        incidentValues[1].classList.add("green-text");
        incidentValues[3].classList.add("red-text");
    }

    function updateRadarTelemetry() {
        if (!metricValues.length) return;

        /*
         * Existing radar metrics are updated
         * without changing the HTML structure.
         */

        metricValues.forEach((metric, index) => {

            switch (index) {

                case 0:
                    metric.textContent =
                        `${random(12, 38)}`;
                    break;

                case 1:
                    metric.textContent =
                        `${random(2, 9)}`;
                    break;

                case 2:
                    metric.textContent =
                        `${random(74, 99)}%`;
                    break;

                case 3:
                    metric.textContent =
                        states[random(0, states.length - 1)];
                    break;

                default:
                    break;
            }

        });
    }

    function updateTimeline() {
        const timelineTimes =
            document.querySelectorAll(
                ".timeline-item small"
            );

        if (!timelineTimes.length) return;

        const base =
            sessionTime();

        timelineTimes.forEach((element, index) => {

            const seconds =
                index * 4 +
                random(1, 3);

            element.textContent =
                `00:${pad(seconds)}.${random(10, 99)}`;
        });
    }

    function update() {
        updateIncidentTelemetry();
        updateRadarTelemetry();
        updateTimeline();

        document.documentElement.style.setProperty(
            "--telemetry-pulse",
            `${random(0.4, 1)}`
        );
    }

    update();

    setInterval(update, 3000);

    document.dispatchEvent(
        new CustomEvent(
            "cyberbreach:telemetry-ready"
        )
    );

})();
