/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import 'whatwg-fetch';
import React, {Component, PropTypes} from 'react';

import {API_PATH, DIE_FACES} from '../../settings';
import Presets from './Presets';
import Roll from './Roll';
import RollResult from './RollResult';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoSuccesses: 0,
            currentResults: {
                botch: null,
                dateCreated: null,
                faces: [],
                successes: null
            },
            doubleSuccessFaces: [],
            poolSize: 1,
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
                        <Roll autoSuccessesValue={this.state.autoSuccesses}
                              doubleSuccessesFacesOn={this.state.doubleSuccessFaces}
                              facesCount={DIE_FACES}
                              onAnyDieFaceClick={(event, faceNumber) => { this._onAnyFaceClick(event, faceNumber) }}
                              onAutoSuccessesUpdate={(event) => { this._onAutoSuccessesUpdate(event)}}
                              onChangePoolSize={(event) => this._onChangePoolSize(event)}
                              onClickRoll={(event) => this._onClickRoll(event)}
                              poolSize={this.state.poolSize}/>
                    </div>
                </div>
                <RollResult dateCreated={this.state.currentResults.dateCreated}
                            facesCount={DIE_FACES}
                            facesValues={this.state.currentResults.faces}
                            isBotch={this.state.currentResults.botch}
                            successesCount={this.state.currentResults.successes}/>
            </div>
        );
    }

    _applyFetchedDatatoState(response) {
        const {faces, successes, botch} = response.data;
        this.setState({
            currentResults: {
                botch: botch,
                dateCreated: new Date(response.timestamp),
                faces: faces,
                successes: successes
            }
        });
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

    _onAutoSuccessesUpdate(event) {
        this.setState({autoSuccesses: this._normalizeNumericInput(event.target.value, 0)});
    }

    _onClickRoll(event) {
        let {autoSuccesses, poolSize} = this.state;
        let doubleFaces = this.state.doubleSuccessFaces.join(',');
        let url = [
            `${API_PATH}/roll`,
            `?pool=${poolSize}`,
            `&autoSuccesses=${autoSuccesses}`,
            `&doubleFaces=${doubleFaces}`,
        ].join('');
        fetch(url).then((response) => {
            response.json().then((obj) => {
                this._applyFetchedDatatoState(obj);
            });
        }, (error) => {
            // TODO: use better error handling.
            console.log('error!');
            console.log(error)
        });
    }

    _onChangePoolSize(event) {
        this.setState({poolSize: this._normalizeNumericInput(event.target.value, 1)});
    }

    _normalizeNumericInput(rawValue, minimumValue) {
        let value = parseInt(rawValue);
        if (Number.isNaN(value) || value < minimumValue) {
            value = minimumValue;
        }
        return value;
    }
}

export default App;
