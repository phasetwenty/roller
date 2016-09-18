/**
 * Created by Chris on 9/14/16.
 **/

import React, { Component, PropTypes } from 'react';

class DieFace extends Component {
    static propTypes: {
        value: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            highlightClass: 'btn-default'
        };
    }

    render() {
        //noinspection CheckTagEmptyBody
        return (
            <div className="btn-group col-md-1">
                <span className={`text-center btn dropdown-toggle ${this.state.highlightClass}`}
                      // onClick={() => this._onClick()}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                  {this.props.value} <span className="caret"></span>
                </span>
                <ul className="dropdown-menu">
                    <li><a href="#">Double</a></li>
                </ul>
            </div>
        );
    }

    _onClick() {
        this.setState({
            highlightClass: this._toggleHighlight(this.state.highlightClass)
        });
    }

    _toggleHighlight(currentValue) {
        return currentValue === 'btn-default' ? 'btn-primary' : 'btn-default';
    }
}

class Die extends Component {
    static propTypes: {
        faces: PropTypes.number.isRequired
    };

    render() {
        return (
            <div className="center-block">
                {[...new Array(this.props.faces)].map((e, i) => <DieFace key={i} value={i}/>)}
            </div>
        );
    }
}

export default Die;
