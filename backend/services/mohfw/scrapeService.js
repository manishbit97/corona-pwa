const config = require('../../config/config.json');
const axios = require('axios');
const cacheHelper = require('../../services/_helper/cacheHelper');
const cheerio = require('cheerio');
const rp = require('request-promise');
const apimap = require('./apimap');
module.exports = {
    scrapeMohfwApi,
    getScrapData
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
            let state_code = 10;
            console.log(state_code, apimap[state_code + '']);
            element['text_code'] = apimap[element['state_code']] ? apimap[element.state_code]["text_code"] : '';
            element['id'] = element['text_code'];
        })
    }
    return apidata;
}

async function scrapeMohfwApi() {
    return new Promise(async (resolve, reject) => {
        const response = await axios('https://www.mohfw.gov.in/data/datanew.json');
        console.log("Data fetched from mohfw succesfully");
        let data = formatApiResponse(response.data);
        let scrap_data = await getScrapData();

        let resObj = { "all_data": data, "scrap_data": scrap_data };
        cacheHelper.setNodeCache(config.cacheApiKey, resObj, config.cacheTTL);
        resolve(resObj);
    })
}

async function getScrapData() {
    return new Promise((resolve, reject) => {
        rp('https://www.mohfw.gov.in')
            .then(function (html) {
                //success!
                const $ = cheerio.load(html);
                const totalVaccin = $('#site-dashboard > div > div > div:nth-child(2) > div.col-xs-8.site-stats-count.sitetotal > div > span.coviddata').text();
                const time = $('#site-dashboard > div > div > div:nth-child(1) > div:nth-child(1) > h5 > span').text().split('IST')[0].split('on :')[1].trim();
                const delta_vaccin = $("#site-dashboard > div > div > div:nth-child(2) > div.col-xs-8.site-stats-count.sitetotal > div > span.coviddataval").text().replace(/[():]/g, '').trim();
                console.log(delta_vaccin);
                const vaccin_timestamp = $('#site-dashboard > div > div > div:nth-child(2) > div.col-xs-2 > h6 > span').text().split("on :")[1].trim()
                const delta_test = $('#main-content > header > div > div > div > div:nth-child(1) > div > marquee > span').text().split('day ')[1].trim()
                let jsonRes = { "total_vaccin": totalVaccin, "delta_vaccin": delta_vaccin, "time": time, "vaccin_timestamp": vaccin_timestamp, "delta_test": delta_test };
                console.log("Webpage scrapped from mohfw");
                resolve(jsonRes);
            })
            .catch(function (err) {
                //handle error
                reject(err);
            });
    })

}