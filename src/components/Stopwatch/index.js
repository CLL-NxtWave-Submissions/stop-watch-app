import {Component} from 'react'
import './index.css'

const initialTimerSetting = {
  initialMinutes: 0,
  initialSeconds: 0,
}

export default class StopWatch extends Component {
  state = {
    timerMinutes: initialTimerSetting.initialMinutes,
    timerSeconds: initialTimerSetting.initialSeconds,
    timerIntervalId: null,
  }

  updateTimer = () => {
    this.setState(previousStopWatchState => {
      let {timerMinutes, timerSeconds} = previousStopWatchState

      if (timerSeconds === 59) {
        timerMinutes += 1
        timerSeconds = 0
      } else {
        timerSeconds += 1
      }

      return {
        timerMinutes,
        timerSeconds,
      }
    })
  }

  onStart = () => {
    const {timerIntervalId} = this.state
    let intervalId

    if (timerIntervalId === null) {
      intervalId = setInterval(this.updateTimer, 1000)
      this.setState({
        timerIntervalId: intervalId,
      })
    }
  }

  onStop = () => {
    this.setState(previousStopWatchState => {
      let {timerIntervalId} = previousStopWatchState

      clearInterval(timerIntervalId)
      timerIntervalId = null

      return {
        timerIntervalId,
      }
    })
  }

  onReset = () => {
    this.setState(previousStopWatchState => {
      let {timerIntervalId} = previousStopWatchState

      clearInterval(timerIntervalId)
      timerIntervalId = null

      return {
        timerMinutes: initialTimerSetting.initialMinutes,
        timerSeconds: initialTimerSetting.initialSeconds,
        timerIntervalId,
      }
    })
  }

  render() {
    const {timerMinutes, timerSeconds} = this.state

    const timerMinutesString =
      timerMinutes < 10 ? '0'.concat(timerMinutes) : timerMinutes
    const timerSecondsString =
      timerSeconds < 10 ? '0'.concat(timerSeconds) : timerSeconds

    return (
      <div className="stop-watch-bg-container">
        <div className="stop-watch-content-container">
          <h1 className="stop-watch-header">Stopwatch</h1>
          <div className="stop-watch-container">
            <div className="timer-text-container">
              <img
                className="timer-img"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer-text">Timer</p>
            </div>

            <h1 className="minutes-seconds-counter">{`${timerMinutesString}:${timerSecondsString}`}</h1>

            <div className="timer-controls-container">
              <button
                type="button"
                className="timer-control-button start-button"
                onClick={this.onStart}
              >
                Start
              </button>
              <button
                type="button"
                className="timer-control-button stop-button"
                onClick={this.onStop}
              >
                Stop
              </button>
              <button
                type="button"
                className="timer-control-button reset-button"
                onClick={this.onReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
