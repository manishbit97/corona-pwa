require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const errorHandler = require('./services/_helper/error-handler');
const dotenv = require('dotenv');
const logger = require('./services/_helper/quick-logger');
global.logger = logger
dotenv.config();
app.use(xss());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json({ limit: '100kb' })); // Body limit is 10

// APIS
// --------------------------------
// /api/scrape/mohfw -- - this will only scrape data from mohfw and update the cache.
// /api/covid/getdata - -  this api used by frontend to fetch the data only from cache..if not present hit the mohfw.

app.use('/pwa/api/scrape', require('./controller/mohfw/scrapeController'));

app.use('/pwa/api/covid', require('./controller/mohfw/mohfwController'));

app.use(errorHandler);
const { startCron } = require('./services/mohfw/cronService');
startCron();

// start server

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

