/**
 * Created by Chris on 9/25/16.
 **/

import React, {Component, PropTypes} from 'react';

class Presets extends Component {
    static propTypes: {
        currentSelection: PropTypes.array,
        items: PropTypes.array.isRequired
    };

    render() {
        return (
            <ul className="list-group">
                {this.props.items.map((name, i) =>
                    <li className="list-group-item" key={i}>
                        {name}
                    </li>)
                }
            </ul>
        );
    }
}

export default Presets;
