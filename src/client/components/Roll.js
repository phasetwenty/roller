/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import React, {Component, PropTypes} from 'react';

import AutoSuccessesInput from './AutoSuccessInput';
import DieOptionGroup from './DieOptionGroup';

class Roll extends Component {
    render() {
        return (
            <div className="form-horizontal">
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
                                    onAnyFaceClick={this.props.onAnyDieFaceClick}/>
                </div>
                <div className="form-group">
                    <label htmlFor="id-auto-sux" className="col-md-2 control-label">
                        Auto Successes
                    </label>
                    <AutoSuccessesInput onChange={this.props.onAutoSuccessesUpdate}
                                        value={this.props.autoSuccessesValue}/>
                </div>
                <div className="center-block unfloat col-md-3">
                    <span className="btn btn-primary btn-lg"
                          onClick={this.props.onClickRoll}>
                        Roll
                    </span>
                </div>
            </div>
        );
    }
}

Roll.propTypes = {
    autoSuccessesValue: PropTypes.number.isRequired,
    doubleSuccessesFacesOn: PropTypes.array.isRequired,
    facesCount: PropTypes.number.isRequired,
    onAnyDieFaceClick: PropTypes.func.isRequired,
    onAutoSuccessesUpdate: PropTypes.func.isRequired,
    onChangePoolSize: PropTypes.func.isRequired,
    onClickRoll: PropTypes.func.isRequired,
    poolSize: PropTypes.number.isRequired,
};

export default Roll;
