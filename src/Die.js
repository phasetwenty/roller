/**
 * Created by Chris on 9/14/16.
 **/

import React, { PropTypes } from 'react';

class DieFace extends React.Component {
    static propTypes: {
        value: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            highlightClass: ''
        };
    }

    render() {
        return (
          <span className={`col-md-1 text-center ${this.state.highlightClass}`}
                onClick={() => this._onClick()}>
              {this.props.value}
          </span>
        );
    }

    _onClick() {
        this.setState({
            highlightClass: this._toggleHighlight(this.state.highlightClass)
        });
    }

    _toggleHighlight(currentValue) {
        return currentValue === '' ? 'bg-primary' : '';
    }
}

class Die extends React.Component {
    static propTypes: {
        faces: PropTypes.number.isRequired
    };

    render() {
        return (
            <div className="center-block">
                {[...new Array(this.props.faces)].map((e, i) => <DieFace key={i} value={i}/>)};
            </div>
        );
    }
}

export default Die;
