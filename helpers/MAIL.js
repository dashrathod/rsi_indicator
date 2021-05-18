const nodemailer = require("nodemailer");
try {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    var mails = {};
    mails.sendNotificationMail = async function (to, subject, html, text = "", from = process.env.MAIL_FROM) {

        /**
         * from needs to be same as username
         */
        from = process.env.MAIL_USERNAME;

        var info = await transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
        }).catch(function (err) {
            console.log('sending_mail_error', to, subject, err);
            throw err;
        });

        console.log('sending_mail_response', to, subject, info);
        return info;

        // send mail with defined transport object
        /* var mailOptions = {
             from: from, // sender address
             to: to, // list of receivers
             subject: subject, // Subject line
             text: text, // plain text body
             html: html // html body
         };
 
         transporter.sendMail(mailOptions, await function (error, info) {
             if (error) {
                 throw err;
             } else {
                 return 22222222222;
             }
         }); */

    };
} catch (error) {
    throw error;
    // res.send(JSON.stringify(error,null,2));
}



module.exports = mails;
global.MAIL = mails;
