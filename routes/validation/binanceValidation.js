const {
    body,
    check,
    validationResult
} = require('express-validator');
module.exports = {
    getRSIValidation: async function (req, res, next) {
        try {
            await check('symbol', 'Invalid symbol').notEmpty().isString().trim().escape().run(req);

            await check('interval', 'Invalid interval').notEmpty().isString().trim().escape().isIn(["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"]).run(req);

            await check('limit', 'Invalid limit').optional().isInt({ max: 1000, min: 0 }).toInt().run(req);

            //checking validation
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return responseHelper.error(res, errors.array()[0].param + ' : ' + errors.array()[0].msg);
            } else {
                next();
            }
        } catch (error) {
            return responseHelper.serverError(res, error);
        }
    },
}