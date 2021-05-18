var binance = require(`../helpers/binance`);
const { makeGETRequest } = require('../helpers/axiosHelper');
const BinanceHelper = require('./binancehelper/BinanceHelper.js');


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

    getRSI: async function (req, res) {
        try {
            let result = await BinanceHelper.binanceGetRSI(req.body);
            if (result && result != 'error') {
                if (result.length) {
                    let prevValue = 0;
                    let first = false;
                    let avgGain = 0;
                    let avgLoss = 0;

                    //get average gain/loss
                    for (let itm of result) {
                        if (first) {
                            let change = itm[4] - prevValue;
                            if (Math.sign(change) == 1) {
                                avgGain += change;
                            } else {
                                avgLoss += Math.abs(change);
                            }
                            prevValue = itm[4];
                        } else {
                            first = true;
                            prevValue = itm[4];
                        }
                    }

                    //get rs
                    avgGain = avgGain / 14;
                    avgLoss = avgLoss / 14;
                    rsi = 100;
                    if (avgLoss > 0) {
                        let rs = (avgGain / avgLoss);
                        rsi = 100 - (100 / (1 + rs));
                    }
                    if (rsi >= 70) {
                        let mailData = `<h1>OVER BOUGHT : ${req.body.symbol}</h1>`;
                        MAIL.sendNotificationMail(process.env.toEmailAddress, `OVER BOUGHT : ${req.body.symbol}`, mailData);
                    } else if (rsi <= 30) {
                        let mailData = `<h1>OVER SOLD : ${req.body.symbol}</h1>`;
                        MAIL.sendNotificationMail(process.env.toEmailAddress, `OVER SOLD : ${req.body.symbol}`, mailData);
                    }
                    return responseHelper.successWithData(res, "binance getRSI", { rsi: rsi });
                    // return res.render('binance/allOrders', { data: data });
                }
                return responseHelper.error(res, "Not proper rsi data");
            } else {
                return responseHelper.error(res, "no data founded..");
            }
        } catch (e) {
            return responseHelper.serverError(res, e);
        }
    },
}