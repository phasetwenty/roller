/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import {API_PATH, PORT} from '../../settings';


/**
 * Provides standard responses from our routes.
 *
 * The response will be an object with the following schema:
 * {
 *      message: a string explaining the status, if available.
 *      status: either 'ok' or 'error'
 *      timestamp: Unix UTC timestamp representing the time the response was served.
 *      url: URL associated with these results. (WIP)
 * }
 **/
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
        return JSON.stringify({status: 'error', message: message, timestamp: Date.now()});
    }

    /**
     * Provides a JSON-encoded string containing the result.
     *
     * @param value Any object to include in the response
     * @param message String message
     * @return a JSON encoded string representing our response.
     **/
    makeResult(value, message) {
        return JSON.stringify({status: 'ok', data: value, message: message, timestamp: Date.now()});
    }
}

export default RouteHandler;
