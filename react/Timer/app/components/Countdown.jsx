import React from 'react';
import PropTypes from 'prop-types';
import Clock from 'components/Clock';
import CountdownForm from 'components/CountdownForm';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            countdownStatus: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.countdownStatus !== prevState.countdownStatus) {
            this.tick();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState({
                count: newCount >= 0 ? newCount : 0
            });
        }, 1000);
    }

    handleSetCountdownTime(seconds) {
        this.setState({
            count: seconds,
            countdownStatus: 1
        });
    }

    render() {
        var {count} = this.state;

        return (
            <div>
                <Clock timeInSeconds={count}/>
                <CountdownForm onSetCountdownTime={this.handleSetCountdownTime.bind(this)}/>
            </div>
        );
    }
}

export default Countdown;
