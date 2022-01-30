const config = require('../../config/config.json');
const axios = require('axios');
const cacheHelper = require('../../services/_helper/cacheHelper');
module.exports = {
    scrapeMohfwApi,
};

let formatApiResponse = (apidata) => {

    if (apidata && Array.isArray(apidata)) {
        apidata.forEach((element) => {
            element['delta_active'] = Number(element['new_active']) - Number(element['active']);
            element['delta_positive'] = Number(element['new_positive']) - Number(element['positive']);
            element['delta_cured'] = Number(element['new_cured']) - Number(element['cured']);
            element['delta_death'] = Number(element['new_death']) - Number(element['death']);
            delete element['active'];
            delete element['cured'];
            delete element['positive'];
            delete element['death'];
        })
    }
    return apidata;
}

async function scrapeMohfwApi() {
    return new Promise(async (resolve, reject) => {
        const response = await axios('https://www.mohfw.gov.in/data/datanew.json');
        console.log("Data fetched from mohfw succesfully");
        let data = formatApiResponse(response.data);
        cacheHelper.setNodeCache(config.cacheApiKey, data, config.cacheTTL);
        resolve(data);
    })
}
