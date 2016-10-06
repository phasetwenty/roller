/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/
import express from 'express';

import Roll from './routes/roll';
import {API_PATH, PORT} from '../settings';

let app = express();
app.use(express.static('public'));

app.get(`${API_PATH}/roll`, Roll);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
});
