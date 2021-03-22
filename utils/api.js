const fetch = require('node-fetch');

/**
 *
 * @param call {string} The API call. eg: /get_user
 * @param params {object} Object containing all params with query param as key. eg: {u: 'Katxu'}
 * @returns {string}
 */
async function $API(call, params) {
    let requestUrl = `${process.env.OSU_URL}${call}`;
    let queryParams = `?k=${process.env.OSU_KEY}`;
    for (const [key, value] of Object.entries(params)) queryParams+=`&${key}=${value}`
    requestUrl+=queryParams;
    const response = await fetch(requestUrl);
    return await response.json();
}

module.exports = $API;