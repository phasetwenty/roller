/**
 * Created by Chris on 10/1/16.
 **/

import React, {Component, PropTypes} from 'react';

class RollResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center">Results</h2>
                </div>
                {this._resultInternal()}
            </div>
        );
    }

    _resultInternal() {
        return this.props.facesValues.length !== 0 ? this._resultsTable() : this._defaultMessage();
    }

    _resultsTable() {
        return (
            <div className="col-md-10 col-md-offset-2">
                <table className="table table-bordered table-condensed">
                    <thead>
                        <tr>
                            {[...new Array(this.props._facesCount)].map((v, index) => {
                                return (<th key={`value-${index + 1}`}>{index + 1}</th>);
                            })}
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }

    _defaultMessage() {
        return (
            <div className="col-md-12">
                <h3 className="text-center">Click &quot;Roll&quot; above to get results.</h3>
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
