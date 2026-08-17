/* =========================================
   CYBER//BREACH — MAIN CONTROLLER
   Visual cybersecurity simulation
   ========================================= */

(() => {
    "use strict";

    const page = document.body;

    if (!page) return;

    function markReady() {
        page.classList.add("system-ready");

        document.documentElement.setAttribute(
            "data-cyberbreach-status",
            "ONLINE"
        );
    }

    function smoothNavigation() {
        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        links.forEach(link => {
            link.addEventListener("click", event => {
                const targetId =
                    link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }

    function addScrollState() {
        let ticking = false;

        function update() {
            page.classList.toggle(
                "page-scrolled",
                window.scrollY > 80
            );

            ticking = false;
        }

        window.addEventListener(
            "scroll",
            () => {
                if (!ticking) {
                    window.requestAnimationFrame(update);
                    ticking = true;
                }
            },
            { passive: true }
        );

        update();
    }

    function keyboardControls() {
        document.addEventListener("keydown", event => {

            /*
             * ESC:
             * remove temporary visual states.
             */

            if (event.key === "Escape") {
                document
                    .querySelectorAll(".glitch-active")
                    .forEach(element => {
                        element.classList.remove(
                            "glitch-active"
                        );
                    });
            }

        });
    }

    function monitorModules() {
        const modules = {
            boot: false,
            telemetry: false
        };

        document.addEventListener(
            "cyberbreach:boot-complete",
            () => {
                modules.boot = true;

                document.documentElement
                    .setAttribute(
                        "data-boot",
                        "complete"
                    );

                if (modules.telemetry) {
                    markReady();
                }
            },
            { once: true }
        );

        document.addEventListener(
            "cyberbreach:telemetry-ready",
            () => {
                modules.telemetry = true;

                document.documentElement
                    .setAttribute(
                        "data-telemetry",
                        "online"
                    );

                if (modules.boot) {
                    markReady();
                }
            },
            { once: true }
        );

        /*
         * Fallback for cases where the boot module
         * is skipped before this listener initializes.
         */

        setTimeout(() => {
            if (
                !document.querySelector(".boot-screen")
            ) {
                modules.boot = true;
            }

            if (modules.telemetry) {
                markReady();
            }
        }, 3500);
    }

    function initialize() {
        smoothNavigation();
        addScrollState();
        keyboardControls();
        monitorModules();

        document.documentElement.setAttribute(
            "data-interface",
            "CYBER//BREACH"
        );
    }

    initialize();

})();
