/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import Roll from './roll';

/**
 * Provides the routes available in this app.
 **/
class Router {
    constructor(api_path) {
        this._api_path = api_path;
    }

    get routes() {
        return [{handler: Roll, path: `${this._api_path}/roll`}];
    }
}

export default Router;
