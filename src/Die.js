/**
 * Created by Chris on 9/14/16.
 **/

import React, { Component, PropTypes } from 'react';

class DieOption extends Component {
    static propTypes: {
        active: PropTypes.bool,
        description: PropTypes.string.isRequired,
        onClick: PropTypes.fn.isRequired
    };

    static defaultProps: {active: false};

    render() {
        if (this.props.active) {
            return (
                <li>
                    <a href="#" onClick={this.props.onClick}>
                        <i className="glyphicon glyphicon-ok"></i> {this.props.description}
                    </a>
                </li>
            );
        }

        return <li><a href="#" onClick={this.props.onClick}>{this.props.description}</a></li>;
    }
}

class DieFace extends Component {
    static propTypes: {
        value: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};

        //noinspection JSUnresolvedVariable
        this.options = ['Double'];
        this.options.forEach((value) => {
           this.state[value] = false;
        });
    }

    render() {
        return (
            <div className="btn-group col-md-1">
                <span className={'text-center btn dropdown-toggle btn-default'}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                  {this.props.value} <span className="caret"></span>
                </span>
                <ul className="dropdown-menu">
                    {this.options.map((description, i) => this._newOption(description, i))}
                </ul>
            </div>
        );
    }

    _newOption(description, i) {
        return <DieOption active={this.state[description]}
                          description={description}
                          key={i}
                          onClick={this._toggleOption.bind(this, description)}/>;
    }

    _toggleOption(optionName) {
        let newState = {};
        newState[optionName] = !this.state[optionName];
        console.log(newState);
        this.setState(newState);
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
