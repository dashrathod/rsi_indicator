'use strict';
const axios = require('axios');


module.exports = {
    makeGETRequest: async function (reqObject) {
        const config = {
            method: 'get',
            url: reqObject.url,
            timeout: 2 * 60 * 1000, // Wait for 2 minute
            headers: {
                'Content-Type': reqObject.contentType || 'application/json',
            }
        }
        let result = await axios(config);
        return result;
    },

    makePOSTRequest: async function (reqObject) {
        const config = {
            method: 'post',
            url: reqObject.url,
            timeout: 2 * 60 * 1000, // Wait for 2 minute
            headers: {
                'Content-Type': reqObject.contentType || 'application/json',
            },
            data: reqObject.data
        }
        let result = await axios(config);
        return result;
    },

    makeGETHeaderRequest: async function (reqObject) {
        const config = {
            method: 'get',
            url: reqObject.url,
            timeout: 2 * 60 * 1000, // Wait for 2 minute
            headers: reqObject.headers
        }
        let result = await axios(config);
        return result;
    },

    makePOSTHeaderRequest: async function (reqObject) {
        const config = {
            method: 'post',
            url: reqObject.url,
            headers: reqObject.headers,
            data: reqObject.body
        };
        let result = await axios(config);
        return result;
    },

    makePOSTRequestWithToken: async function (reqObject) {
        const config = {
            method: 'post',
            url: reqObject.url,
            timeout: 2 * 60 * 1000, // Wait for 2 minute
            headers: {
                'Content-Type': reqObject.contentType || 'application/json',
                'Authorization': reqObject.token
            },
            data: reqObject.data
        }
        let result = await axios(config);
        return result;
    },

    makePUTHeaderRequest: async function (reqObject) {
        const config = {
            method: 'put',
            url: reqObject.url,
            headers: reqObject.headers,
            data: reqObject.body
        };
        let result = await axios(config);
        return result;
    },

    makeDELETEHeaderRequest: async function (reqObject) {
        const config = {
            method: 'delete',
            url: reqObject.url,
            headers: reqObject.headers,
            data: reqObject.body
        };
        let result = await axios(config);
        return result;
    },
};
