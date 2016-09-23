/**
 * Created by Chris on 9/21/16.
 **/
import express from 'express';

import Roll from './routes';

let app = express();

app.get('/roll', Roll);

let port = 8000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
