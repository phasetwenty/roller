/**
 * Created by Chris on 9/18/16.
 **/
import React, { Component, PropTypes } from 'react';

import AutoSuccessesInput from './AutoSuccessInput';
import DieOptionGroup from './DieOptionGroup';

class Roll extends Component {
    static propTypes: {
        doubleSuccessesFacesOn: PropTypes.array.isRequired,
        onAnyDieFaceClickCallback: PropTypes.fn.isRequired,
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
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="id-double-sux" className="col-md-2 control-label">
                            Double
                        </label>
                        <DieOptionGroup facesOn={this.props.doubleSuccessesFacesOn}
                                        facesCount={10}
                                        onAnyFaceClickCallback={this.props.onAnyDieFaceClickCallback}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="id-auto-sux" className="col-md-2 control-label">
                            Auto Successes
                        </label>
                        <AutoSuccessesInput onChange={(event) => this._onChangeSuccesses(event)}
                                          value={this.state.autoSuccesses}/>
                    </div>

                    <label htmlFor="id-pool-size">Number of dice to roll</label>
                    <input id="id-pool-size" onChange={(event) => this.props.onChangePoolSize(event)}
                           type="number"
                           value={this.props.poolSize}/>
                </form>
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
