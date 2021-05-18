const axiosHelper = require('../../helpers/axiosHelper');

const BINANCE_URL = `https://api2.binance.com`; //https://api.binance.com

module.exports = {

    binanceGetRSI: async function (reqData) {
        try {
            let config = {
                "url": `${BINANCE_URL}/api/v3/klines?symbol=${reqData.symbol}&interval=${reqData.interval}&limit=${reqData.limit || 15}`,
                "headers": {
                    'Content-Type': 'application/json',
                },
                "body": '',
            };
            let orderResponse = await axiosHelper.makeGETHeaderRequest(config);
            return orderResponse.data;
        }
        catch (error) {
            console.log('binanacePlaceOrder_error', error);
            return 'error';
        }
    },

}