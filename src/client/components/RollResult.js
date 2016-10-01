/**
 * Created by Chris on 10/1/16.
 **/

import React, {Component, PropTypes} from 'react';

class RollResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.facesValues.length === 0) {
            return this._emptyComponent();
        }
    }

    _emptyComponent() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center">Results</h2>
                </div>
                <div className="col-md-12">
                    <h3 className="text-center">Click &quot;Roll&quot; above to get results.</h3>
                </div>
            </div>
        );
    }
}

RollResult.propTypes = {
    facesCount: PropTypes.number,
    facesValues: PropTypes.array.isRequired,
    resultsResolver: PropTypes.object.isRequired
};

export default RollResult;
