/**
 * @file jquery_init.js
 * @fileOverview
 *      使用 jQuery 初始化页面的过程。用于设置监听器与初始参数。
 */

$(document).ready(function () {
    /**
     * 初始化番茄时钟。
     */
    // 设置默认计时。
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


    var btnStartPause = function () {
        if(currentTimer instanceof PomoTimer && currentTimer.isRunning())
            pausePomodoro();
        else
            startPomodoro();
    };

    $("#timer-start-pause").click(btnStartPause);
});