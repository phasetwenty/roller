/**
 * Created by Chris on 9/21/16.
 **/
import express from 'express';

let app = express();

app.get('/', function(req, res) {
   res.send('Hellow Orld!');
});

app.listen(8000, function() {
    console.log('Listening on http://localhost:8000/');
});
