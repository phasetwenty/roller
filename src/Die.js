/**
 * Created by Chris on 9/14/16.
 **/

import React, { PropTypes } from 'react';

class Die extends React.Component {

    render() {
        return (
            <div className="center-block">
                {[...new Array(this.props.faces)].map((e, i) => <span className="col-md-1 text-center">{i}</span>)}
            </div>
        );
    }
}

Die.propTypes = {
    faces: PropTypes.number.isRequired
};

export default Die;
