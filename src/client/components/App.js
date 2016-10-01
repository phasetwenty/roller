/**
 * Created by Chris on 9/25/16.
 **/
import 'whatwg-fetch';
import React, {Component, PropTypes} from 'react';

import Presets from './Presets';
import Roll from './Roll';
import RollResult from './RollResult';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doubleSuccessFaces: [],
            poolSize: 0,
            rollValue: null
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-md-12">
                    <h1 className="text-center">Roller</h1>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <Presets items={['item1']}/>
                    </div>
                    <div className="col-md-10">
                        <Roll doubleSuccessesFacesOn={this.state.doubleSuccessFaces}
                              onAnyDieFaceClickCallback={(event, faceNumber) => { this._onAnyFaceClick(event, faceNumber) }}
                              onChangePoolSize={(event) => this._onChangePoolSize(event)}
                              onClickRoll={(event) => this._onClickRoll(event)}
                              poolSize={this.state.poolSize}/>
                    </div>
                </div>
                <RollResult facesCount={10} facesValues={[1, 2]} resultsResolver={this.state}/>
            </div>
        );
    }

    _onAnyFaceClick(event, faceNumber) {
        let doubleSuccessFaces = this.state.doubleSuccessFaces;
        let index = doubleSuccessFaces.findIndex((e) => { return e === faceNumber; });
        if (index !== -1) {
            doubleSuccessFaces.splice(index, 1);
        } else {
            doubleSuccessFaces.push(faceNumber);
        }
        this.setState({doubleSuccessFaces: doubleSuccessFaces});
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
