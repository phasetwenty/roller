/**
 * Created by Chris on 9/18/16.
 **/
import React, { Component, PropTypes } from 'react';

import AutoSuccessesInput from './AutoSuccessInput';
import Die from './Die';

class Roll extends Component {
    static propTypes: {
        onChangePoolSize: PropTypes.fn.isRequired,
        onClickRoll: PropTyes.fn.isRequired,
        poolSize: PropTypes.number.isRequired,
        rollValue: PropTyes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            autoSuccesses: 0,
        };
    }

    render() {
        return (
            <div className="row">
                <Die faces={10}/>
                <AutoSuccessesInput onChange={(event) => this._onChangeSuccesses(event)}
                                  value={this.state.autoSuccesses}/>

                <label htmlFor="id-pool-size">Number of dice to roll</label>
                <input id="id-pool-size" onChange={(event) => this.props.onChangePoolSize(event)}
                       type="number"
                       value={this.props.poolSize}/>
                <span className="btn btn-primary"
                      onClick={this.props.onClickRoll}>
                    Roll
                </span>
                <div>
                    Roll value: {this.props.rollValue}
                </div>
            </div>
        );
    }

    _onChangeSuccesses(event) {
        this.setState({autoSuccesses: event.target.value});
    }
}

export default Roll;
