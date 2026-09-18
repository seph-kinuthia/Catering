import {
    animate
} from "https://cdn.jsdelivr.net/npm/animejs@4.2.2/+esm";


/* =========================================================
   HELPERS
========================================================= */

const clamp = (
    value,
    min = 0,
    max = 1
) => Math.min(
    Math.max(value, min),
    max
);


const range = (
    progress,
    start,
    end
) => clamp(
    (progress - start) /
    (end - start)
);


const lerp = (
    start,
    end,
    amount
) => start + (
    end - start
) * amount;


function showScene(
    scene,
    opacity,
    scale = 1
) {

    scene.style.opacity = opacity;

    scene.style.visibility =
        opacity > .01
            ? "visible"
            : "hidden";

    scene.style.transform =
        `scale(${scale})`;

}


/* =========================================================
   SCENES
========================================================= */

const scenes = {

    hero:
        document.querySelector(
            ".scene-hero"
        ),

    occasions:
        document.querySelector(
            ".scene-occasions"
        ),

    food:
        document.querySelector(
            ".scene-food"
        ),

    menu:
        document.querySelector(
            ".scene-menu"
        ),

    plate:
        document.querySelector(
            ".scene-plate"
        ),

    process:
        document.querySelector(
            ".scene-process"
        ),

    transformation:
        document.querySelector(
            ".scene-transformation"
        ),

    moments:
        document.querySelector(
            ".scene-moments"
        ),

    numbers:
        document.querySelector(
            ".scene-numbers"
        ),

    testimonials:
        document.querySelector(
            ".scene-testimonials"
        ),

    booking:
        document.querySelector(
            ".scene-booking"
        ),

    final:
        document.querySelector(
            ".scene-final"
        )

};


/* =========================================================
   IMAGE FALLBACKS
========================================================= */

/*
    Missing photos become intentional
    colour blocks instead of broken icons.
*/

const fallbackColors = [
    "#314d32",
    "#d64b2a",
    "#f1cf65",
    "#493124",
    "#a89583"
];


document
    .querySelectorAll("img")
    .forEach(
        (image, index) => {

            image.addEventListener(
                "error",
                () => {

                    const parent =
                        image.parentElement;

                    image.style.display =
                        "none";

                    parent.style.background =
                        fallbackColors[
                            index %
                            fallbackColors.length
                        ];

                }
            );

        }
    );


/* =========================================================
   LOADER
========================================================= */

const loader =
    document.querySelector(
        ".loader"
    );

const loaderNumber =
    document.querySelector(
        ".loader-number"
    );

const loaderProgress =
    document.querySelector(
        ".loader-progress"
    );


let loaded = 0;


const loaderInterval =
    setInterval(
        () => {

            loaded +=
                Math.floor(
                    Math.random() * 9
                ) + 3;


            if (loaded >= 100) {

                loaded = 100;

                clearInterval(
                    loaderInterval
                );

            }


            loaderNumber.textContent =
                String(loaded)
                    .padStart(3, "0");


            loaderProgress.style.width =
                `${loaded}%`;


            if (loaded === 100) {

                setTimeout(
                    closeLoader,
                    300
                );

            }

        },
        55
    );


function closeLoader() {

    animate(
        loader,
        {

            translateY: [
                "0%",
                "-100%"
            ],

            duration: 900,

            ease: "inOutExpo",

            onComplete: () => {

                loader.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   CURSOR
========================================================= */

const cursor =
    document.querySelector(
        ".cursor"
    );

const cursorLabel =
    document.querySelector(
        ".cursor-label"
    );


let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


window.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


function cursorLoop() {

    cursorX +=
        (mouseX - cursorX) * .16;

    cursorY +=
        (mouseY - cursorY) * .16;


    cursor.style.left =
        `${cursorX}px`;

    cursor.style.top =
        `${cursorY}px`;


    requestAnimationFrame(
        cursorLoop
    );

}


cursorLoop();


const cursorTargets =
    document.querySelectorAll(
        `
        .food-photo,
        .menu-course,
        .occasion-options button,
        .booking-submit,
        .final-cta
        `
    );


cursorTargets.forEach(
    target => {

        target.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add(
                    "active"
                );


                if (
                    target.classList.contains(
                        "booking-submit"
                    ) ||
                    target.classList.contains(
                        "final-cta"
                    )
                ) {

                    cursorLabel.textContent =
                        "BOOK";

                }

                else {

                    cursorLabel.textContent =
                        "VIEW";

                }

            }
        );


        target.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   BOOKING INTERACTION
========================================================= */

let guestCount = 50;


const guestDisplay =
    document.querySelector(
        "#guestCount"
    );


document
    .querySelector(
        "#guestPlus"
    )
    ?.addEventListener(
        "click",
        () => {

            guestCount += 10;

            guestDisplay.textContent =
                guestCount;

        }
    );


document
    .querySelector(
        "#guestMinus"
    )
    ?.addEventListener(
        "click",
        () => {

            guestCount =
                Math.max(
                    10,
                    guestCount - 10
                );

            guestDisplay.textContent =
                guestCount;

        }
    );


document
    .querySelectorAll(
        ".occasion-options button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".occasion-options button"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "selected"
                                )
                        );


                    button.classList.add(
                        "selected"
                    );

                }
            );

        }
    );


/* =========================================================
   GLOBAL PROGRESS
========================================================= */

const progressFill =
    document.querySelector(
        "#progressFill"
    );

const currentScene =
    document.querySelector(
        "#currentScene"
    );


/* =========================================================
   MAIN SCROLL ENGINE
========================================================= */

function updateExperience() {

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const p =
        clamp(
            window.scrollY /
            maxScroll
        );


    progressFill.style.height =
        `${p * 100}%`;


    const chapter =
        Math.min(
            11,
            Math.floor(p * 11) + 1
        );


    currentScene.textContent =
        String(chapter)
            .padStart(2, "0");


    /* =====================================================
       01 — SETTING THE TABLE
    ===================================================== */

    const heroOut =
        range(
            p,
            .055,
            .105
        );


    showScene(
        scenes.hero,
        1 - heroOut,
        lerp(
            1,
            1.05,
            heroOut
        )
    );


    const heroTable =
        document.querySelector(
            ".hero-table"
        );


    const tableRise =
        range(
            p,
            .005,
            .055
        );


    heroTable.style.bottom =
        `${lerp(
            -20,
            3,
            tableRise
        )}vh`;


    /*
        Each object lands on the table
        one after another.
    */

    const tableObjects = [
        {
            selector: ".object-plate",
            start: .008,
            end: .022,
            x: 0,
            y: -500,
            rotate: -35
        },

        {
            selector: ".object-fork",
            start: .016,
            end: .03,
            x: -350,
            y: -200,
            rotate: -70
        },

        {
            selector: ".object-knife",
            start: .023,
            end: .037,
            x: 350,
            y: -200,
            rotate: 60
        },

        {
            selector: ".object-napkin",
            start: .03,
            end: .044,
            x: -300,
            y: 200,
            rotate: -60
        },

        {
            selector: ".object-glass",
            start: .037,
            end: .051,
            x: 350,
            y: -400,
            rotate: 30
        },

        {
            selector: ".object-flowers",
            start: .044,
            end: .058,
            x: 0,
            y: -450,
            rotate: 50
        },

        {
            selector: ".object-food",
            start: .051,
            end: .067,
            x: 0,
            y: -500,
            rotate: 0
        }
    ];


    tableObjects.forEach(
        object => {

            const element =
                document.querySelector(
                    object.selector
                );


            const objectP =
                range(
                    p,
                    object.start,
                    object.end
                );


            element.style.opacity =
                objectP;


            /*
                Preserve objects that have
                translate centering.
            */

            const centered =
                object.selector ===
                    ".object-plate" ||
                object.selector ===
                    ".object-food";


            element.style.transform =
                `
                ${
                    centered
                        ? "translate(-50%, -50%)"
                        : ""
                }

                translate(
                    ${lerp(
                        object.x,
                        0,
                        objectP
                    )}px,

                    ${lerp(
                        object.y,
                        0,
                        objectP
                    )}px
                )

                rotate(
                    ${lerp(
                        object.rotate,
                        0,
                        objectP
                    )}deg
                )

                scale(
                    ${lerp(
                        .45,
                        1,
                        objectP
                    )}
                )
                `;

        }
    );


    /*
        Typography separates as table
        becomes the hero.
    */

    const tableWord =
        document.querySelector(
            ".word-table"
        );

    const setWord =
        document.querySelector(
            ".word-set"
        );


    tableWord.style.transform =
        `
        translateX(
            ${lerp(
                0,
                -30,
                heroOut
            )}vw
        )
        `;


    setWord.style.transform =
        `
        translateX(
            ${lerp(
                0,
                35,
                heroOut
            )}vw
        )

        scale(
            ${lerp(
                1,
                2,
                heroOut
            )}
        )
        `;


    /* =====================================================
       02 — OCCASIONS
    ===================================================== */

    const occasionIn =
        range(
            p,
            .085,
            .115
        );


    const occasionOut =
        range(
            p,
            .19,
            .215
        );


    showScene(
        scenes.occasions,
        occasionIn *
        (1 - occasionOut)
    );


    const occasionImage =
        document.querySelector(
            ".occasion-table"
        );


    const occasionZoom =
        range(
            p,
            .10,
            .20
        );


    occasionImage.style.transform =
        `
        translateY(-50%)

        scale(
            ${lerp(
                .75,
                1.08,
                occasionZoom
            )}
        )
        `;


    const occasions =
        document.querySelectorAll(
            ".occasion"
        );


    const occasionLocal =
        range(
            p,
            .105,
            .195
        );


    const occasionIndex =
        Math.min(
            3,
            Math.floor(
                occasionLocal * 4
            )
        );


    occasions.forEach(
        (occasion, index) => {

            const active =
                index === occasionIndex;


            occasion.style.opacity =
                active
                    ? 1
                    : 0;


            occasion.style.transform =
                `
                translateY(
                    ${active
                        ? 0
                        : 50
                    }px
                )
                `;

        }
    );


    /* =====================================================
       03 — FOOD COLLISION
    ===================================================== */

    const foodIn =
        range(
            p,
            .205,
            .23
        );


    const foodOut =
        range(
            p,
            .295,
            .32
        );


    showScene(
        scenes.food,
        foodIn *
        (1 - foodOut)
    );


    const foodPhotos =
        document.querySelectorAll(
            ".food-photo"
        );


    const foodStart = [
        [-450, -250, -20],
        [450, -280, 22],
        [0, 450, -12],
        [-400, 300, 18],
        [420, 350, -20]
    ];


    const finalRotation = [
        -5,
        5,
        -2,
        4,
        -5
    ];


    foodPhotos.forEach(
        (photo, index) => {

            const photoP =
                range(
                    p,

                    .21 +
                    index * .009,

                    .245 +
                    index * .009
                );


            photo.style.opacity =
                photoP;


            photo.style.transform =
                `
                translate(
                    ${lerp(
                        foodStart[index][0],
                        0,
                        photoP
                    )}px,

                    ${lerp(
                        foodStart[index][1],
                        0,
                        photoP
                    )}px
                )

                rotate(
                    ${lerp(
                        foodStart[index][2],
                        finalRotation[index],
                        photoP
                    )}deg
                )

                scale(
                    ${lerp(
                        .4,
                        1,
                        photoP
                    )}
                )
                `;

        }
    );


    const foodHeading =
        document.querySelector(
            ".food-heading"
        );


    const headingP =
        range(
            p,
            .225,
            .26
        );


    foodHeading.style.transform =
        `
        translate(-50%, -50%)

        scale(
            ${lerp(
                2,
                1,
                headingP
            )}
        )
        `;


    foodHeading.style.opacity =
        headingP;


    /* =====================================================
       04 — MENU
    ===================================================== */

    const menuIn =
        range(
            p,
            .31,
            .335
        );


    const menuOut =
        range(
            p,
            .40,
            .425
        );


    showScene(
        scenes.menu,
        menuIn *
        (1 - menuOut)
    );


    const menuTrack =
        document.querySelector(
            ".menu-track"
        );


    const menuTravel =
        range(
            p,
            .325,
            .41
        );


    menuTrack.style.transform =
        `
        translateX(
            ${lerp(
                0,
                -90,
                menuTravel
            )}vw
        )
        `;


    document
        .querySelectorAll(
            ".menu-course"
        )
        .forEach(
            (course, index) => {

                const wave =
                    Math.sin(
                        menuTravel *
                        Math.PI * 2 +
                        index
                    ) * 16;


                course.style.transform =
                    `
                    translateY(
                        ${wave}px
                    )
                    `;

            }
        );


    /* =====================================================
       05 — ONE PLATE
    ===================================================== */

    const plateIn =
        range(
            p,
            .415,
            .44
        );


    const plateOut =
        range(
            p,
            .495,
            .52
        );


    showScene(
        scenes.plate,
        plateIn *
        (1 - plateOut)
    );


    const mainPlate =
        document.querySelector(
            ".main-plate"
        );


    const plateP =
        range(
            p,
            .42,
            .49
        );


    mainPlate.style.transform =
        `
        translate(-50%, -50%)

        rotate(
            ${lerp(
                -18,
                0,
                plateP
            )}deg
        )

        scale(
            ${lerp(
                .45,
                1,
                plateP
            )}
        )
        `;


    /*
        Ingredients orbit around plate,
        then collapse inward.
    */

    const ingredients =
        document.querySelectorAll(
            ".ingredient"
        );


    ingredients.forEach(
        (ingredient, index) => {

            const ingredientP =
                range(
                    p,

                    .43 +
                    index * .008,

                    .46 +
                    index * .008
                );


            ingredient.style.opacity =
                ingredientP;


            const angle =
                plateP *
                180 +
                index * 90;


            ingredient.style.transform =
                `
                rotate(
                    ${angle}deg
                )

                translateX(
                    ${lerp(
                        80,
                        0,
                        range(
                            p,
                            .47,
                            .49
                        )
                    )}px
                )

                rotate(
                    ${-angle}deg
                )
                `;

        }
    );


    const plateStatement =
        document.querySelector(
            ".plate-statement"
        );


    plateStatement.style.opacity =
        range(
            p,
            .47,
            .49
        );


    /* =====================================================
       06 — PROCESS
    ===================================================== */

    const processIn =
        range(
            p,
            .51,
            .535
        );


    const processOut =
        range(
            p,
            .605,
            .63
        );


    showScene(
        scenes.process,
        processIn *
        (1 - processOut)
    );


    const processTimes =
        document.querySelectorAll(
            ".process-time"
        );


    processTimes.forEach(
        (time, index) => {

            const timeP =
                range(
                    p,

                    .52 +
                    index * .017,

                    .545 +
                    index * .017
                );


            const timeOut =
                range(
                    p,

                    .55 +
                    index * .017,

                    .57 +
                    index * .017
                );


            time.style.opacity =
                timeP *
                (1 - timeOut);


            time.style.transform =
                `
                translateY(
                    ${lerp(
                        80,
                        0,
                        timeP
                    )}px
                )

                scale(
                    ${lerp(
                        .7,
                        1,
                        timeP
                    )}
                )
                `;

        }
    );


    const showtime =
        document.querySelector(
            ".process-showtime"
        );


    const showtimeP =
        range(
            p,
            .58,
            .61
        );


    showtime.style.opacity =
        showtimeP;


    showtime.style.transform =
        `
        translate(-50%, -50%)

        scale(
            ${lerp(
                .35,
                1,
                showtimeP
            )}
        )
        `;


    /* =====================================================
       07 — BEFORE / AFTER
    ===================================================== */

    const transformIn =
        range(
            p,
            .62,
            .645
        );


    const transformOut =
        range(
            p,
            .695,
            .72
        );


    showScene(
        scenes.transformation,
        transformIn *
        (1 - transformOut)
    );


    const revealP =
        range(
            p,
            .63,
            .705
        );


    const afterImage =
        document.querySelector(
            ".after-image"
        );


    afterImage.style.clipPath =
        `
        inset(
            0
            ${100 - revealP * 100}%
            0
            0
        )
        `;


    const revealLine =
        document.querySelector(
            ".reveal-line"
        );


    revealLine.style.left =
        `${revealP * 100}%`;


    /* =====================================================
       08 — MOMENTS
    ===================================================== */

    const momentsIn =
        range(
            p,
            .71,
            .735
        );


    const momentsOut =
        range(
            p,
            .78,
            .805
        );


    showScene(
        scenes.moments,
        momentsIn *
        (1 - momentsOut)
    );


    const momentPhotos =
        document.querySelectorAll(
            ".moment-photo"
        );


    const momentStarts = [
        [400, -250, 20],
        [-400, 250, -18],
        [0, 400, 20],
        [400, 300, -20]
    ];


    const momentFinalRotations = [
        4,
        -4,
        5,
        -3
    ];


    momentPhotos.forEach(
        (photo, index) => {

            const itemP =
                range(
                    p,

                    .715 +
                    index * .009,

                    .745 +
                    index * .009
                );


            photo.style.opacity =
                itemP;


            photo.style.transform =
                `
                translate(
                    ${lerp(
                        momentStarts[index][0],
                        0,
                        itemP
                    )}px,

                    ${lerp(
                        momentStarts[index][1],
                        0,
                        itemP
                    )}px
                )

                rotate(
                    ${lerp(
                        momentStarts[index][2],
                        momentFinalRotations[index],
                        itemP
                    )}deg
                )
                `;

        }
    );


    const momentsStatement =
        document.querySelector(
            ".moments-statement"
        );


    const momentStatementP =
        range(
            p,
            .75,
            .785
        );


    momentsStatement.style.opacity =
        momentStatementP;


    momentsStatement.style.transform =
        `
        translate(-50%, -50%)

        scale(
            ${lerp(
                .4,
                1,
                momentStatementP
            )}
        )
        `;


    /* =====================================================
       09 — NUMBERS
    ===================================================== */

    const numbersIn =
        range(
            p,
            .795,
            .815
        );


    const numbersOut =
        range(
            p,
            .855,
            .875
        );


    showScene(
        scenes.numbers,
        numbersIn *
        (1 - numbersOut)
    );


    const stats =
        document.querySelectorAll(
            ".number-stat"
        );


    const numberLocal =
        range(
            p,
            .80,
            .86
        );


    stats.forEach(
        (stat, index) => {

            const sectionStart =
                index / 3;

            const sectionEnd =
                (index + 1) / 3;


            const local =
                clamp(
                    (
                        numberLocal -
                        sectionStart
                    ) /
                    (
                        sectionEnd -
                        sectionStart
                    )
                );


            const fadeIn =
                clamp(
                    local * 4
                );


            const fadeOut =
                clamp(
                    (local - .72) * 4
                );


            stat.style.opacity =
                fadeIn *
                (1 - fadeOut);


            stat.style.transform =
                `
                translate(-50%, -50%)

                scale(
                    ${lerp(
                        .45,
                        1,
                        fadeIn
                    )}
                )
                `;

        }
    );


    const numbersNote =
        document.querySelector(
            ".numbers-note"
        );


    numbersNote.style.opacity =
        range(
            p,
            .845,
            .86
        );


    /* =====================================================
       10 — TESTIMONIALS
    ===================================================== */

    const testimonialsIn =
        range(
            p,
            .865,
            .885
        );


    const testimonialsOut =
        range(
            p,
            .915,
            .935
        );


    showScene(
        scenes.testimonials,
        testimonialsIn *
        (1 - testimonialsOut)
    );


    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );


    const testimonialLocal =
        range(
            p,
            .87,
            .92
        );


    testimonials.forEach(
        (testimonial, index) => {

            const sectionStart =
                index / 3;

            const sectionEnd =
                (index + 1) / 3;


            const local =
                clamp(
                    (
                        testimonialLocal -
                        sectionStart
                    ) /
                    (
                        sectionEnd -
                        sectionStart
                    )
                );


            const fadeIn =
                clamp(
                    local * 4
                );


            const fadeOut =
                clamp(
                    (local - .72) * 4
                );


            testimonial.style.opacity =
                fadeIn *
                (1 - fadeOut);


            testimonial.style.transform =
                `
                translate(-50%, -50%)

                translateY(
                    ${lerp(
                        80,
                        -30,
                        local
                    )}px
                )

                scale(
                    ${lerp(
                        .75,
                        1,
                        fadeIn
                    )}
                )
                `;

        }
    );


    /* =====================================================
       11 — BOOKING
    ===================================================== */

    const bookingIn =
        range(
            p,
            .925,
            .945
        );


    const bookingOut =
        range(
            p,
            .975,
            .986
        );


    showScene(
        scenes.booking,
        bookingIn *
        (1 - bookingOut)
    );


    const bookingSteps =
        document.querySelectorAll(
            ".booking-step"
        );


    const bookingLocal =
        range(
            p,
            .93,
            .977
        );


    const activeStep =
        Math.min(
            3,
            Math.floor(
                bookingLocal * 4
            )
        );


    bookingSteps.forEach(
        (step, index) => {

            const active =
                index === activeStep;


            step.style.opacity =
                active
                    ? 1
                    : 0;


            step.style.visibility =
                active
                    ? "visible"
                    : "hidden";


            step.style.transform =
                `
                translateY(
                    ${active
                        ? 0
                        : 60
                    }px
                )
                `;

        }
    );


    if (
        bookingIn > .2 &&
        bookingOut < .8
    ) {

        scenes.booking.style.pointerEvents =
            "auto";

    }

    else {

        scenes.booking.style.pointerEvents =
            "none";

    }


    /* =====================================================
       FINAL TABLE
    ===================================================== */

    const finalIn =
        range(
            p,
            .98,
            .994
        );


    showScene(
        scenes.final,
        finalIn,
        lerp(
            .75,
            1,
            finalIn
        )
    );


    const finalBackground =
        document.querySelector(
            ".final-background"
        );


    finalBackground.style.transform =
        `
        scale(
            ${lerp(
                1.2,
                1,
                finalIn
            )}
        )
        `;


    const finalCopy =
        document.querySelector(
            ".final-copy"
        );


    finalCopy.style.opacity =
        finalIn;


    finalCopy.style.transform =
        `
        translateY(-50%)

        translateX(
            ${lerp(
                -150,
                0,
                finalIn
            )}px
        )
        `;


    const finalCTA =
        document.querySelector(
            ".final-cta"
        );


    finalCTA.style.transform =
        `
        rotate(
            ${lerp(
                40,
                0,
                finalIn
            )}deg
        )

        scale(
            ${lerp(
                .3,
                1,
                finalIn
            )}
        )
        `;


    if (
        finalIn > .8
    ) {

        scenes.final.style.pointerEvents =
            "auto";

    }

    else {

        scenes.final.style.pointerEvents =
            "none";

    }

}


/* =========================================================
   PERFORMANCE
========================================================= */

let ticking = false;


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            requestAnimationFrame(
                () => {

                    updateExperience();

                    ticking = false;

                }
            );


            ticking = true;

        }

    },
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateExperience
);


updateExperience();


/* =========================================================
   AMBIENT MOTION
========================================================= */

animate(
    ".hero-scroll i",
    {

        translateY: [
            0,
            8,
            0
        ],

        duration: 1500,

        loop: true,

        ease: "inOutSine"

    }
);


animate(
    ".status-dot",
    {

        scale: [
            1,
            1.7,
            1
        ],

        opacity: [
            1,
            .5,
            1
        ],

        duration: 2000,

        loop: true,

        ease: "inOutSine"

    }
);


animate(
    ".final-cta",
    {

        scale: [
            1,
            1.04,
            1
        ],

        duration: 2500,

        loop: true,

        ease: "inOutSine"

    }
);