const express = require("express");
const mongo = require('./model/mongo.js');
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes');

require('dotenv-defaults').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

mongo.connect();

const server = app.listen(process.env.PORT || 5000, function () {
    console.log('Listening on port ' + server.address().port);
});
