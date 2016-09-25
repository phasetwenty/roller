/**
 * Created by Chris on 9/18/16.
 **/
import 'whatwg-fetch';
import React, { Component, PropTypes } from 'react';

import AutoSuccessesInput from './AutoSuccessInput';
import Die from './Die';

class Roll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoSuccesses: 0,
            rollValue: null,
        };
    }
    render() {
        return (
            <div className="row">
                <Die faces={10}/>
                <AutoSuccessesInput onChange={(event) => this._onChangeSuccesses(event)}
                                  value={this.state.autoSuccesses}/>
                <span className="btn btn-primary"
                      onClick={(event) => this._onClickRoll(event)}>
                    Roll
                </span>
                <div>
                    Roll value: {this.state.rollValue}
                </div>
            </div>
        );
    }

    _onClickRoll(event) {
        // TODO: remove hardcoding
        fetch('http://localhost:8000/roll?pool=1').then((response) => {
            response.json().then((obj) => {
                let value = obj.data[0];
                this.setState({rollValue: value});
            });
        }, (error) => {
            // TODO: use better error handling.
            console.log('error!');
            console.log(error)
        });
    }

    _onChangeSuccesses(event) {
        this.setState({autoSuccesses: event.target.value});
    }
}

export default Roll;
