const config = require('../../config/config.json');
const axios = require('axios');
const scrapeService = require('./scrapeService');

module.exports = {
    startCron,
};

function startCron() {
    setInterval(() => {
        console.log("I am cron service , and now hitting the api !");
        scrapeService.scrapeMohfwApi()
            .then(list => {
                console.log("I am cron service , succesfully returning from cron service !");
            })
            .catch(err => {
                console.log("I am cron service throwing error",err);
            });
    }, Number(config.scrapingInterval) * 1000)
}
