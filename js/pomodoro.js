/**
 * @file Pomodoro.js
 * @author AnClark Liu
 * @fileOverview
 *      Pomodoro 番茄时钟的核心库。
 */

/**
 * 当前活跃的番茄钟计时器。
 * 一次只允许一个番茄钟进程运行，因此这里的状态可以决定UI对番茄钟的操作：
 *      ■ 新番茄钟
 *      ■ 暂停番茄钟
 *      ■ 恢复番茄钟
 *      ■ 复位番茄钟
 * @type {PomoTimer|undefined}
 */
let currentTimer = undefined;

/**
 * 指定用于显示番茄钟状态的 DOM 元素。请使用 jQuery 选择器。
 * @type {*|jQuery|HTMLElement}
 */
let timer_monitor = $("#timer-monitor");

/**
 * 指定番茄钟会话时长设置器中用于显示设置值的 DOM 元素。请使用 jQuery 选择器。
 * @type {*|jQuery|HTMLElement}
 */
let pomodoro_session_duration_state = $("#timer-settings__ses-duration__state");

/**
 * 指定番茄钟休息时长设置器中用于显示设置值的 DOM 元素。请使用 jQuery 选择器。
 * @type {*|jQuery|HTMLElement}
 */
let pomodoro_break_duration_state = $("#timer-settings__brk-duration__state");


/**
 * @function Sec2MinuteSecStr
 * 将秒数转换为“分:秒”的形式，以供计时器屏幕显示。
 * @param sec
 * @return {string}
 */
function Sec2MinuteSecStr(sec) {
    let minute = Math.floor(sec / 60);
    let second = sec % 60;

    return minute + ":" + (second < 10 ? "0"+second : second);

}


/**
 * @function PomoTimer
 * 番茄钟计时器对象。这是本程序的核心。
 * ■ 使用方法：
 *      用 new 关键字新建一个新实例即可。
 *
 * @param ses_duration_sec {Number} 指定番茄钟会话时长。单位为秒。
 * @param timer_monitor {*|jQuery|HTMLElement} 指定番茄钟状态显示器（DOM 元素）。
 * @param brk_duration_sec {Number} 指定番茄钟休息时长。单位为秒。
 *
 * @constructor 配合 new 关键字使用，建立一个番茄钟计时器的新实例。
 */
var PomoTimer = function (ses_duration_sec, timer_monitor, brk_duration_sec) {
    // 作为设置参数使用的会话时长和休息时长。加一是为了使计时器从整分钟（如25:00）开始计时，而不是从59秒开始（如24:59）。
    let sessionDurationSec = Number(ses_duration_sec) + 1;
    let breakDurationSec = Number(brk_duration_sec) + 1;

    let currentSec = sessionDurationSec;        // 当前剩余的秒数。初始为会话时长。
    let runningState = "pomo";                  // 指定番茄钟计时状态，包括番茄计时时间（“pomo”）和休息时间（“break”）。
    let interval;                               // 当前用 setInterval 生成的 Timeout 对象
    let running = false;                        // 显示番茄钟是否在工作中

    /**
     * @method startTimer
     * 用于启动计时器。
     */
    this.startTimer = function () {
        clearInterval(interval);          // 先停止当前计时器，防止用户私自调用此方法导致计时混乱


        interval = setInterval(function() {
            // 设置停止计时时的动作
            if(currentSec <= 0)
            {
                // 每轮计时结束后，在番茄会话时间和休息时间中切换
                switch(runningState) {
                  case "pomo":
                      runningState = "break";
                      currentSec = breakDurationSec;
                      break;
                  case "break":
                      runningState = "pomo";
                      currentSec = sessionDurationSec;
                      break;
                }

            }

            // 计时过程，持续倒数秒
            currentSec--;

            // 显示当前倒计时
            timer_monitor.text(Sec2MinuteSecStr(currentSec));

        }, 1000);

        running = true;
    };

    /**
     * @method pauseTimer
     * 用于暂停计时器。
     */
    this.pauseTimer = function () {
        clearInterval(interval);

        running = false;
    };

    /**
     * @method resetTimer
     * 停止计时器，并将计时器复位为初始状态。
     */
    this.resetTimer = function () {
        clearInterval(interval);

        // 重置番茄计时器为准备开启番茄会话，以重新开始番茄计时
        currentSec = sessionDurationSec;
        runningState = "pomo";

        running = false;
    };

    /**
     * @method getInterval
     * 返回当前活动的 Timeout 对象。
     * @return {*}
     */
    this.getInterval = function () {
        return interval;
    };

    /**
     * @method getState
     * 返回当前计时器的状态。
     * @return {string}
     */
    this.getState = function() {
        return runningState;
    };

    /**
     * @method isRunning
     * 告诉用户当前计时器是否在运行中。
     * @return {boolean}
     */
    this.isRunning = function () {
        return running;
    }
};


/**
 * @function startPomodoro
 * 启动番茄计时。
 *  ■ 没有番茄计时会话时，启动一个新的番茄计时会话
 *  ■ 若当前会话计时被暂停，则继续计时
 */
function startPomodoro(){
    if(currentTimer instanceof PomoTimer){
        currentTimer.startTimer();
    }
    else{
        timer_monitor.text(pomodoro_session_duration_state.text());
        currentTimer = new PomoTimer(parseInt(pomodoro_session_duration_state.text()) * 60, timer_monitor, pomodoro_break_duration_state.text() * 60);
        currentTimer.startTimer();
    }
}

/**
 * @function resetPomodoro
 * 重置番茄计时器。
 */
function resetPomodoro() {
    if(currentTimer instanceof PomoTimer){
        timer_monitor.text(pomodoro_session_duration_state.text());
        currentTimer.resetTimer();
        currentTimer = undefined;

    }

}

/**
 * @function pausePomodoro
 * 暂停番茄计时器。
 */
function pausePomodoro() {
    if(currentTimer instanceof PomoTimer){
        currentTimer.pauseTimer();
    }
}

/**
 * @function tuneTimeAndReset
 * 调节番茄时间时使用，用于在调节为新的时间后自动停止当前番茄计时，以便按新时间重新计时。
 */
function tuneTimeAndReset() {
    resetPomodoro();
    timer_monitor.text(pomodoro_session_duration_state.text());
}

