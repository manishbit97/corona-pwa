const express = require('express');
const router = express.Router();
const mohfwService = require('../../services/mohfw/mohfwService.js');

// routes
router.get('/getalldata', getAllCovidData);
router.get("/test", (req, res) => res.json({ "success":"true" }));

module.exports = router;

function getAllCovidData(req, res, next) {
    mohfwService.getAllCovidData()
        .then(list => res.json(list))
        .catch(err => next(err));
}
