/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
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
                {this._renderTableOrMessage()}
            </div>
        );
    }

    _renderTableOrMessage() {
        return this.props.facesValues.length !== 0 ? this._resultsTable() : this._defaultMessage();
    }

    _resultsTable() {
        return (
            <div className="col-md-10 col-md-offset-2">
                <ul>
                    <li>You rolled {this.props.successesCount} successes.</li>
                    <li>You {this.props.isBotch ? 'botched.' : 'did not botch.'}</li>
                </ul>
                <table className="table table-bordered table-condensed">
                    <thead>
                        <tr>
                            {[...new Array(this.props.facesCount)].map((v, index) => {
                                return (<th key={`header-${index + 1}`}>{index + 1}</th>);
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {this._facesBreakdown().map((value, index) => {
                                return (<td key={`value-${index + 1}`}>{value}</td>);
                            })}
                        </tr>
                    </tbody>
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

    _facesBreakdown() {
        let result = new Array(this.props.facesCount).fill(0);
        this.props.facesValues.forEach(value => { result[value - 1]++; });
        return result;
    }
}

RollResult.propTypes = {
    facesCount: PropTypes.number,
    facesValues: PropTypes.array.isRequired,
    isBotch: PropTypes.bool,
    successesCount: PropTypes.number,
};

export default RollResult;
