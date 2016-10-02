/**
 * Created by Chris on 10/1/16.
 **/
import {ResolverOptions, Resolver} from '../dice/resolver';
import Roller from '../dice/roller';
import RouteHandler from './handler';

class QueryParams {
    constructor(query) {
        this._query = query;
        this.doubleFaces = [];
        this.errors = [];
        this.poolSize = null;
    }

    get isValid() {
        this._validate();
        return this.errors.length === 0;
    }

    _validate() {
        this.errors = [];
        if ('pool' in this._query) {
            let numberOfDice = parseInt(this._query.pool);
            if (Number.isNaN(numberOfDice)) {
                this.errors.push('\'pool\' must be an integer.');
            } else {
                this.poolSize = numberOfDice;
            }
        } else {
            this.errors.push('You must specify how many dice to roll via the \'pool\' ' +
                'query parameter.');
        }

        if ('doubleFaces' in this._query && this._query.doubleFaces !== '') {
            this.doubleFaces = this._query.doubleFaces.split(',').map(parseInt);
            for (let i = 0; i < this.doubleFaces.length; ++i) {
                const value = this.doubleFaces[i];
                if (Number.isNaN(value)) {
                    this.errors.push('Each face in \'doubleFaces\' must be a number.');
                    break;
                }
            }
        }
    }
}

function Roll(request, response) {
    const handler = new RouteHandler(request, response);

    const params = new QueryParams(request.query);
    if (!params.isValid) {
        response.status(400);
        response.send(handler.makeError(params.errors));
        return;
    }

    // TODO: remove hardcoding.
    const roller = new Roller(10);
    const pool = roller.roll(params.poolSize);
    const resolverOptions = new ResolverOptions({doubleFaces: params.doubleFaces});
    if (!resolverOptions.isValid) {
        response.status(500);
        response.send(handler.makeError('Invalid translation of configuration.'));
        return;
    }
    const resolver = new Resolver(pool, resolverOptions);

    const data = {
        botch: resolver.botch,
        faces: pool,
        successes: resolver.successes
    };

    response.status(200);
    response.send(handler.makeResult(data, 'No message'));
}

export default Roll;
