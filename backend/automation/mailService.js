const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: '@ethereal.email',
        pass: ''
    },tls: {
        rejectUnauthorized: false,
    },
});
const sendExpirationEmail = (to, name, listingName, endDate) => {
    const mailOptions = {
        from: process.env.Mail ,
        to: to,
        subject: `Your Listing for ${listingName} is Expiring Soon!`,
        text: `Dear ${name},\n\nYour listing for ${listingName} is expiring on ${endDate}.\nPlease renew your listing to continue displaying it on our platform.\nSteps to renew it:\n1. Go to Profile.\n2. Show Listings.\n3. Update Payment.\n\nBest regards,\nThe Image Property Team`,
    };
};

module.exports=sendExpirationEmail;