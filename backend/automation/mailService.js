const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "	novella.jakubowski@ethereal.email",
        pass: "	evVMYpKUMV5bpnRuDk",
    },
});

const sendExpirationEmail = (to, name, listingName, endDate) => {
    try {
        const mailOptions = {
            from: "kingspyder03@gmail.com", // Sender email
            to: to,
            subject: `Your Listing for ${listingName} is Expiring Soon!`,
            text: `Dear ${name},\n\nYour listing for ${listingName} is expiring on ${endDate}.\nPlease renew your listing to continue displaying it on our platform.\n\nBest regards,\The Image Property Team`,
        };

        transporter.sendMail(mailOptions);
    } catch (e) {
        console.log(e);
    }
}
module.exports=sendExpirationEmail;