
$(document).ready(function () {
    $("#timer-settings__ses-duration__state").text("25");
    $("#timer-settings__brk-duration__state").text("4");
    tuneTimeAndReset();


    $("#timer-settings__ses-duration__up").click(function () {
        let current_val = parseInt($("#timer-settings__ses-duration__state").text());

        $("#timer-settings__ses-duration__state").text(current_val + 1);

        tuneTimeAndReset();
    });

    $("#timer-settings__ses-duration__down").click(function () {
        let current_val = parseInt($("#timer-settings__ses-duration__state").text());

        $("#timer-settings__ses-duration__state").text(current_val > 0 ? current_val - 1 : current_val);

        tuneTimeAndReset();
    });

    $("#timer-settings__brk-duration__up").click(function () {
        let current_val = parseInt($("#timer-settings__brk-duration__state").text());

        $("#timer-settings__brk-duration__state").text(current_val + 1);

        tuneTimeAndReset();
    });

    $("#timer-settings__brk-duration__down").click(function () {
        let current_val = parseInt($("#timer-settings__brk-duration__state").text());

        $("#timer-settings__brk-duration__state").text(current_val > 0 ? current_val - 1 : current_val);

        tuneTimeAndReset();
    });

    $("#timer-start-pause").click(function () {
       startPomodoro();
    });
});