$(document).ready(function() {
    if (typeof jQuery === 'undefined') {
        console.error("jQuery is not loaded!");
        return;
    }
    if (!$.fn.turn) {
        console.error("turn.js is not loaded!");
        return;
    }

    $("#flipbook").turn({
        width: 1200,
        height: 900,
        autoCenter: true,
        display: 'double',
        acceleration: true,
        gradients: true,
        elevation: 50,
        page: 1
    });

    console.log("Flipbook initialized with " + $("#flipbook").turn("pages") + " pages");

    function adjustDisplay(page) {
        var totalPages = $("#flipbook").turn("pages");
        var currentDisplay = $("#flipbook").turn("display");

        if (page === 1 || page === totalPages) {
            if (currentDisplay !== 'single') {
                $("#flipbook").turn("display", "single");
                $("#flipbook").turn("size", 600, 900);
                $("#flipbook").css("margin", "20px auto");
            }
        } else {
            if (currentDisplay !== 'double') {
                $("#flipbook").turn("display", "double");
                $("#flipbook").turn("size", 1200, 900);
                $("#flipbook").css("margin", "20px auto");
            }
        }
    }

    $("#flipbook").bind("turned", function(event, page, view) {
        adjustDisplay(page);
    });

    adjustDisplay(1);

    // Arrow click handlers
    $("#prev-arrow").on("click", function() {
        $("#flipbook").turn("previous");
    });

    $("#next-arrow").on("click", function() {
        $("#flipbook").turn("next");
    });

    // Mouse drag functionality
    let isDragging = false;
    let startX;
    let threshold = 200; // Minimum drag distance to turn page

    $("#flipbook").on("mousedown", function(e) {
        isDragging = true;
        startX = e.pageX;
        e.preventDefault(); // Prevent text selection
    });

    $(document).on("mousemove", function(e) {
        if (!isDragging) return;

        let currentX = e.pageX;
        let diffX = currentX - startX;

        // Optional: Add visual feedback during drag
        $("#flipbook").css("cursor", "grabbing");

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Dragging right - go to previous page
                $("#flipbook").turn("previous");
            } else {
                // Dragging left - go to next page
                $("#flipbook").turn("next");
            }
            isDragging = false; // Reset after turning
        }
    });

    $(document).on("mouseup", function() {
        if (isDragging) {
            isDragging = false;
            $("#flipbook").css("cursor", "default");
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode === 37) {
            $("#flipbook").turn("previous");
        } else if (e.keyCode === 39) {
            $("#flipbook").turn("next");
        }
    });
});