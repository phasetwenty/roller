/**
 * Created by Chris on 9/19/16.
 **/

import React, {Component, PropTypes} from 'react';

class AutoSuccessInput extends Component {

    static propTypes: {
        onChange: PropTypes.fn.isRequired,
        value: PropTypes.number.isRequired
    };

    render() {
        return (
            <div className="row">
                <input {...this.props} type="number"/>
            </div>
        );
    }
}

export default AutoSuccessInput;
