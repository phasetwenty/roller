/**
 * Created by Chris on 9/14/16.
 **/

import React, { Component, Error, PropTypes } from 'react';

class DieOptionGroup extends Component {
    render() {
        return (
            <div className="col-md-8">
                <div className="btn-group" role="group" aria-label="label">
                    {[...new Array(this.props.facesCount)].map((e, i) => this._createOption(i + 1))}
                </div>
            </div>
        );
    }

    _createOption(value) {
        let isOnIndex = this.props.facesOn.findIndex((e) => { return e === value; });
        let displayClass = isOnIndex === -1 ? 'btn-default' : 'btn-info';
        return (
            <span className={`btn ${displayClass}`}
                  key={value}
                  onClick={(event) => this.props.onAnyFaceClickCallback(event, value)}
                  type="button">
                {value}
            </span>
        );
    }
}

DieOptionGroup.propTypes = {
    facesCount: PropTypes.number.isRequired,
    facesOn: PropTypes.array.isRequired,
    onAnyFaceClickCallback: PropTypes.func.isRequired
};

export default DieOptionGroup;
