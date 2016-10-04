/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/

import React, { Component, PropTypes } from 'react';

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
                  onClick={(event) => this.props.onAnyFaceClick(event, value)}
                  type="button">
                {value}
            </span>
        );
    }
}

DieOptionGroup.propTypes = {
    // Count of faces to represent in this group of options.
    facesCount: (props, propName, componentName) => {
        if (!('facesCount' in props)) {
            return new Error(`'facesCount' is a required prop of ${componentName}.`);
        }
        const facesCount = parseInt(props.facesCount);
        if (Number.isNaN(facesCount) || facesCount < 1) {
            const message = `'facesCount' prop of ${componentName} must be a nonnegative integer.`;
            return new Error(message);
        }
    },
    // PropTypes.number.isRequired,
    // The values of the faces which are turned on.
    facesOn: PropTypes.array.isRequired,
    /**
     * Callback accepting the following arguments:
     * * event: the click event
     * * value: the value of the face that was clicked.
     **/
    onAnyFaceClick: PropTypes.func.isRequired
};

export default DieOptionGroup;
