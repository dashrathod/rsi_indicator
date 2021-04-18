var binance = require(`../helpers/binance`);
const { makeGETRequest } = require('../helpers/axiosHelper');

module.exports = {
    getCurrency: async function (req, res) {
        try {
            let url = `${binance.base_url}/exchangeInfo`;
            let result = await makeGETRequest({ url: url });
            if (result && result.data && result.status == 200) {
                // return responseHelper.successWithData(res, "new DepositRequest initiated", {data:result.data});
                res.render('index', result.data);
            } else {
                return responseHelper.error(res, "no data founded..");
            }
        } catch (e) {
            return responseHelper.error(res, e);
        }
    },
}