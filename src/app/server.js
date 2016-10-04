/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import express from 'express';

import Roll from './routes/roll';

let app = express();
app.use(express.static('public'));

app.get('/api/v1/roll', Roll);

let port = 8000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
