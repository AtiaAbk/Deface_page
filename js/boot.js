/* =========================================
   CYBER//BREACH — BOOT SYSTEM
   Visual cybersecurity simulation
   ========================================= */

(() => {
    "use strict";

    const bootScreen = document.querySelector(".boot-screen");
    const bootLines = document.querySelectorAll(".boot-line");
    const progress = document.querySelector(".boot-progress span");
    const skipButton = document.querySelector(".boot-skip");

    if (!bootScreen) return;

    const messages = [
        "[SYS] Initializing CYBER//BREACH interface...",
        "[NET] Establishing secure simulation channel...",
        "[OPS] Loading offensive intelligence module...",
        "[DEF] Loading defensive response module...",
        "[RAD] Threat radar synchronization...",
        "[TEL] Telemetry subsystem online...",
        "[OK] Operator environment initialized.",
        "[OK] Simulation ready."
    ];

    let skipped = false;
    let finished = false;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeLine(element, text) {
        element.textContent = "";

        for (const char of text) {
            if (skipped) {
                element.textContent = text;
                return;
            }

            element.textContent += char;
            await sleep(12);
        }
    }

    async function runBoot() {
        for (let i = 0; i < bootLines.length; i++) {
            if (skipped) break;

            const message = messages[i % messages.length];

            await typeLine(bootLines[i], message);

            if (progress) {
                const percent =
                    ((i + 1) / bootLines.length) * 100;

                progress.style.width = `${percent}%`;
            }

            await sleep(180);
        }

        finishBoot();
    }

    function finishBoot() {
        if (finished) return;

        finished = true;

        if (progress) {
            progress.style.width = "100%";
        }

        bootScreen.classList.add("boot-complete");

        setTimeout(() => {
            bootScreen.style.opacity = "0";
            bootScreen.style.pointerEvents = "none";

            setTimeout(() => {
                bootScreen.remove();

                document.dispatchEvent(
                    new CustomEvent("cyberbreach:boot-complete")
                );
            }, 650);
        }, skipped ? 100 : 700);
    }

    function skipBoot() {
        skipped = true;

        bootLines.forEach((line, index) => {
            line.textContent =
                messages[index % messages.length];
        });

        if (progress) {
            progress.style.width = "100%";
        }

        finishBoot();
    }

    if (skipButton) {
        skipButton.addEventListener("click", skipBoot);
    }

    runBoot();

})();
