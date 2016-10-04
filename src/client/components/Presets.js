/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/

import React, {Component, PropTypes} from 'react';

class Presets extends Component {
    static propTypes: {
        currentSelection: PropTypes.array,
        items: PropTypes.array.isRequired
    };

    render() {
        return (
            <div>
                <input type="text" placeholder="Filter"/>
                <ul className="list-group">
                    {this.props.items.map((name, i) =>
                        <li className="list-group-item" key={i}>
                            {name}
                        </li>)
                    }
                </ul>
            </div>

        );
    }
}

export default Presets;
