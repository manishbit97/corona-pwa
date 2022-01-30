const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 15 * 60, checkperiod: 60 });

exports.getNodeCache = (key) => {
    try {
        let data = myCache.get(key, true);
        return JSON.parse(data);
    } catch (e) {
        return false;
    }
};

exports.setNodeCache = (key, data, ttl = 15 * 60) => {
    let success = myCache.set(key, JSON.stringify(data), ttl)
    return success;
};

exports.deleteNodeCache = (key) => {
    let val = myCache.del(key);
    console.log("deleted cache", val);
}
