/**
 * @desc    This file contain APIs that is exposed to recive subsscriptions to the newsletter for the end user 
 * @author  Manish Kumar
 * @since   2022
 */
const express = require('express');
const router = express.Router();
const scrapeService = require('../../services/mohfw/scrapeService');

// routes
router.get('/mohfw', getMohfwData);

module.exports = router;

function getMohfwData(req, res, next) {
    scrapeService.scrapeMohfwApi()
        .then(list => res.json(list))
        .catch(err => next(err));
}


// APIS 
// --------------------------------
// /api/scrape/mohfw -- - this will only scrape data from mohfw and update the cache.
// /api/corona/getdata - -  this api used by frontend to fetch the data only from cache..if not present hit the mohfw.