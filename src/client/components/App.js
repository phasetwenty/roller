/**
 * Created by Chris on 9/25/16.
 **/
import 'whatwg-fetch';
import React, {Component, PropTypes} from 'react';

import Roll from './Roll';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poolSize: 0,
            rollValue: null
        }
    }

    render() {
        return (
            <div className="row">
                <Roll onChangePoolSize={(event) => this._onChangePoolSize(event)}
                      onClickRoll={(event) => this._onClickRoll(event)}
                      poolSize={this.state.poolSize}
                      rollValue={this.state.rollValue}/>
            </div>
        );
    }

    _onClickRoll(event) {
        let poolSize = this.state.poolSize;
        // TODO: remove hardcoding
        fetch(`http://localhost:8000/roll?pool=${poolSize}`).then((response) => {
            response.json().then((obj) => {
                this.setState({rollValue: obj.data.join(', ')});
            });
        }, (error) => {
            // TODO: use better error handling.
            console.log('error!');
            console.log(error)
        });
    }


    _onChangePoolSize(event) {
        this.setState({poolSize: event.target.value});
    }

}

export default App;
