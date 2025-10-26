import React from 'react';
import './index.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString('fa-IR'),
            hour: 0,
            minute: 0,
            second: 0,
            isRunning: false,
        };
        this.interval = null;
        this.clockInterval = null;
    }

    componentDidMount() {
        this.clockInterval = setInterval(() => {
            this.setState({
                time: new Date().toLocaleTimeString('fa-IR')
            });
        }, 1000);
    }

    componentWillUnmount() {
        this.clearIntervals();
    }

    clearIntervals = () => {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    handleStart = () => {
        if (this.state.isRunning) return;

        this.setState({ isRunning: true });

        this.interval = setInterval(() => {
            this.setState(prevState => {
                let { second, minute, hour } = prevState;
                second += 1;
                if (second === 60) { second = 0; minute += 1; }
                if (minute === 60) { minute = 0; hour += 1; }
                return { second, minute, hour };
            });
        }, 1000);
    };

    handleStop = () => {
        if (!this.state.isRunning) return;
        this.setState({ isRunning: false });
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    handleReset = () => {
        this.handleStop();
        this.setState({ hour: 0, minute: 0, second: 0 });
    };

    formatTime = (value) => String(value).padStart(2, '0');

    // خطا اینجا بود: (render() → render()
    render() {
        const { time, hour, minute, second, isRunning } = this.state;
        const { title = "تایمر" } = this.props;

        return (
            <div className="timer-container">
                <h1 className="timer-title">{title}</h1>

                <div className="timer-clock">
                    <span className="label">ساعت:</span>
                    <span className="value">{time}</span>
                </div>

                <hr className="divider" />

                <div className="timer-stopwatch">
                    <span className="value">
                        {this.formatTime(hour)}:
                        {this.formatTime(minute)}:
                        {this.formatTime(second)}
                    </span>
                    {isRunning && <span className="running-indicator">در حال اجرا</span>}
                </div>

                <div className="timer-controls">
                    <button
                        onClick={this.handleStart}
                        disabled={isRunning}
                        className="btn btn-start"
                    >
                        شروع
                    </button>
                    <button
                        onClick={this.handleStop}
                        disabled={!isRunning}
                        className="btn btn-stop"
                    >
                        توقف
                    </button>
                    <button
                        onClick={this.handleReset}
                        className="btn btn-reset"
                    >
                        ریست
                    </button>
                </div>
            </div>
        );
    }
}

export default Timer;