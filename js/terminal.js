/* =========================================
   CYBER//BREACH — TERMINAL SIMULATION
   Visual cybersecurity interface
   ========================================= */

(() => {
    "use strict";

    const output = document.querySelector(".terminal-output");
    const cursor = document.querySelector("#terminal-cursor");

    if (!output) return;

    const lines = [
        "[SYS] CYBER//BREACH console initialized",
        "[AUTH] Operator session verified",
        "[NET] Secure simulation channel: ONLINE",
        "[OPS] Offensive intelligence: ARMED",
        "[DEF] Defensive response: ACTIVE",
        "[RAD] Threat radar: SYNCHRONIZED",
        "[TEL] Telemetry stream: LIVE",
        "[SCAN] Monitoring simulated threat surface...",
        "[SCAN] No external targets connected",
        "[OK] Environment operating in simulation mode"
    ];

    let index = 0;

    function addLine(text, type = "normal") {
        const line = document.createElement("div");

        line.className = `terminal-line ${type}`;
        line.textContent = text;

        output.appendChild(line);

        output.scrollTop = output.scrollHeight;
    }

    function typeNextLine() {
        if (index >= lines.length) {
            if (cursor) {
                cursor.style.display = "inline-block";
            }

            return;
        }

        addLine(lines[index]);
        index++;

        setTimeout(
            typeNextLine,
            350 + Math.random() * 650
        );
    }

    document.addEventListener(
        "cyberbreach:boot-complete",
        () => {
            setTimeout(typeNextLine, 500);
        },
        { once: true }
    );

    // Fallback when boot screen is skipped before this listener runs.
    setTimeout(() => {
        if (index === 0) {
            typeNextLine();
        }
    }, 2500);
})();
