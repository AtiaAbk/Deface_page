/* =========================================
   CYBER//BREACH — GLITCH ENGINE
   Visual-only interface effects
   ========================================= */

(() => {
    "use strict";

    const targets = document.querySelectorAll(".glitch-target");

    if (!targets.length) return;

    targets.forEach(target => {
        if (!target.dataset.text) {
            target.dataset.text = target.textContent.trim();
        }

        target.addEventListener("mouseenter", () => {
            target.classList.add("glitch-active");

            setTimeout(() => {
                target.classList.remove("glitch-active");
            }, 450);
        });
    });

    function randomGlitch() {
        const target =
            targets[Math.floor(Math.random() * targets.length)];

        if (!target) return;

        target.classList.add("glitch-active");

        setTimeout(() => {
            target.classList.remove("glitch-active");
        }, 120 + Math.random() * 350);

        setTimeout(
            randomGlitch,
            2500 + Math.random() * 5000
        );
    }

    setTimeout(randomGlitch, 1800);

    document.addEventListener(
        "cyberbreach:boot-complete",
        () => {
            setTimeout(randomGlitch, 1000);
        }
    );
})();
