let currentTimer = undefined;
let timer_monitor = $("#timer-monitor");
let pomodoro_session_duration_state = $("#timer-settings__ses-duration__state");

/**
 *
 * @param sec
 * @return {string}
 */
function Sec2MinuteSecStr(sec) {
    let minute = Math.floor(sec / 60);
    let second = sec % 60;

    return minute + ":" + (second < 10 ? "0"+second : second);

}


var Timer = function (timer_sec, timer_monitor_id) {
  let currentSec = timer_sec;
  let runningState = false;
  let interval;
  let timerMonitor = document.getElementById(timer_monitor_id);

  this.startTimer = function () {
      interval = setInterval(function(){
          if(currentSec <= 1) {
              clearInterval(interval);
              runningState = false;
          }
          currentSec--;

          timerMonitor.innerText = Sec2MinuteSecStr(currentSec);

      }, 1000);

      runningState = true;
  };

  this.pauseTimer = function () {
      clearInterval(interval);
      runningState = false;
  };

  this.resetTimer = function () {
      clearInterval(interval);
      currentSec = 0;

      runningState = false;
  };

  this.getInterval = function () {
      return interval;
  };

  this.isRunning = function() {
      return runningState;
  }


};




function startPomodoro(){
    if(currentTimer instanceof Timer){
        currentTimer.startTimer();
    }
    else{
        timer_monitor.text(pomodoro_session_duration_state.text());
        currentTimer = new Timer(parseInt(pomodoro_session_duration_state.text()) * 60, "timer-monitor");
        currentTimer.startTimer();
    }
}

function resetPomodoro() {
    if(currentTimer instanceof Timer){
        timer_monitor.text(pomodoro_session_duration_state.text());
        currentTimer.resetTimer();
        currentTimer = undefined;
    }

}

function pausePomodoro() {
    if(currentTimer instanceof Timer){
        currentTimer.pauseTimer();
    }
}

function tuneTimeAndReset() {
    resetPomodoro();
    timer_monitor.text(pomodoro_session_duration_state.text());
}

