/**
 * Created by Chris on 9/18/16.
 **/
import React, { Component, PropTypes } from 'react';

import AutoSuccessesInput from './AutoSuccessInput';
import Die from './Die';

class Roll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoSuccesses: 0
        };
    }
    render() {
        console.log(`auto successes: ${this.state.autoSuccesses}`);
        return (
            <div className="row">
                <Die faces={10}/>
                <AutoSuccessesInput onChange={(event) => this._onChangeSuccesses(event)}
                                  value={this.state.autoSuccesses}/>
            </div>
        );
    }

    _onChangeSuccesses(event) {
        this.setState({autoSuccesses: event.target.value});
    }
}

export default Roll;
