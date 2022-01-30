const cacheHelper = require('../../services/_helper/cacheHelper');
const scrapeService = require('./scrapeService');
const config = require('../../config/config.json')
module.exports = {
    getAllCovidData,
};

async function getAllCovidData() {
    return new Promise(async (resolve, reject) => {
        let cacheResponse = cacheHelper.getNodeCache(config.cacheApiKey);
        if (cacheResponse) {
            console.log("Returning data from cache");
            resolve(cacheResponse);
            return;
        }
        let response = await scrapeService.scrapeMohfwApi();
        resolve(response);
    })
}
