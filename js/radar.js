/* =========================================
   CYBER//BREACH — THREAT RADAR
   Visual cybersecurity simulation only
   ========================================= */

(() => {
    "use strict";

    const radar = document.querySelector(".radar-container");

    if (!radar) return;

    const nodes = radar.querySelectorAll(".radar-node");
    const metrics = document.querySelectorAll(".radar-data .metric strong");

    const states = [
        "MONITORING",
        "ANALYZING",
        "TRACKING",
        "STABLE",
        "ALERT"
    ];

    function random(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    function moveNode(node) {
        node.style.top = `${random(18, 78)}%`;
        node.style.left = `${random(18, 78)}%`;
    }

    function updateMetrics() {
        if (!metrics.length) return;

        const values = [
            `${random(12, 38)}`,
            `${random(2, 9)}`,
            `${random(74, 99)}%`,
            states[random(0, states.length - 1)]
        ];

        metrics.forEach((metric, index) => {
            if (values[index] !== undefined) {
                metric.textContent = values[index];
            }
        });
    }

    function simulatePulse() {
        nodes.forEach((node, index) => {
            if (Math.random() > 0.45) {
                moveNode(node);
            }

            node.style.animationDelay =
                `${index * 0.15}s`;
        });

        updateMetrics();
    }

    document.addEventListener(
        "cyberbreach:boot-complete",
        () => {
            simulatePulse();

            setInterval(
                simulatePulse,
                3500
            );
        },
        { once: true }
    );

    // Fallback if boot is skipped very early.
    setTimeout(() => {
        if (!document.querySelector(".boot-screen")) {
            simulatePulse();

            setInterval(
                simulatePulse,
                3500
            );
        }
    }, 3000);

})();
