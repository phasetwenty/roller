/**
 * Provides a standard way of providing responses from our routes.
 *
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import {API_PATH, PORT} from '../../settings';

class RouteHandler {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.response.set('Content-Type', 'application/json');
        this.response.set('Access-Control-Allow-Origin', `${API_PATH}/roll:${PORT}`);
    }

    /**
     * Provides a JSON-encoded string containing an error.
     *
     * @param message String message to encode.
     **/
    makeError(message) {
        return JSON.stringify({status: 'error', message: message});
    }

    /**
     * Provides a JSON-encoded string containing the result.
     *
     * @param value Any object to include in the response
     * @param message String message
     * @return a JSON encoded string representing our response.
     **/
    makeResult(value, message) {
        return JSON.stringify({status: 'ok', data: value, message: message});
    }
}

export default RouteHandler;
