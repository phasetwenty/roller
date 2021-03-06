/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/

import React, {Component, PropTypes} from 'react';

class AutoSuccessInput extends Component {

    static propTypes: {
        onChange: PropTypes.fn.isRequired,
        value: PropTypes.number.isRequired
    };

    render() {
        return (
            <div className="col-md-1">
                <input {...this.props} id="id-auto-sux" type="number" className="form-control"/>
            </div>
        );
    }
}

export default AutoSuccessInput;
