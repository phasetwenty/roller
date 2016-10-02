/**
 * Created by Chris on 9/18/16.
 **/
import React, {Component, PropTypes} from 'react';

import AutoSuccessesInput from './AutoSuccessInput';
import DieOptionGroup from './DieOptionGroup';

class Roll extends Component {
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
                        <label htmlFor="id-pool-size" className="col-md-2 control-label">
                            # Dice to roll
                        </label>
                        <div className="col-md-1">
                            <input className="form-control"
                                   id="id-pool-size"
                                   onChange={(event) => this.props.onChangePoolSize(event)}
                                   type="number"
                                   value={this.props.poolSize}/>
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="id-double-sux" className="col-md-2 control-label">
                            Double
                        </label>
                        <DieOptionGroup facesOn={this.props.doubleSuccessesFacesOn}
                                        facesCount={this.props.facesCount}
                                        onAnyFaceClickCallback={this.props.onAnyDieFaceClickCallback}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="id-auto-sux" className="col-md-2 control-label">
                            Auto Successes
                        </label>
                        <AutoSuccessesInput onChange={(event) => this._onChangeSuccesses(event)}
                                            value={this.state.autoSuccesses}/>
                    </div>
                </form>
                <span className="btn btn-primary"
                      onClick={this.props.onClickRoll}>
                    Roll
                </span>
            </div>
        );
    }

    _onChangeSuccesses(event) {
        this.setState({autoSuccesses: event.target.value});
    }
}

Roll.propTypes = {
    doubleSuccessesFacesOn: PropTypes.array.isRequired,
    facesCount: PropTypes.number.isRequired,
    onAnyDieFaceClickCallback: PropTypes.func.isRequired,
    onChangePoolSize: PropTypes.func.isRequired,
    onClickRoll: PropTypes.func.isRequired,
    poolSize: PropTypes.number.isRequired,
};

export default Roll;
