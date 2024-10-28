const moment=require("moment");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const errorHandler = require("../utils/error");
const sendExpirationEmail=require("../automation/mailService");

const deleteAfterExpiry = async (next) => {
    try {
        const currentDate = new Date();
        const listings = await Listing.deleteMany({ endDate: { $lt: currentDate } });
    } catch (error) {
        next(errorHandler("401", error));
    }
}



const checkExpiration = async () => {
    const today = moment().startOf('day');
    try {
        const listings = await Listing.find();
        for (const listing of listings) {
            const endDate = moment(listing.endDate).startOf('day');
            const daysToEnd = endDate.diff(today, 'days');
            console.log(`Days to end for listing ${listing.name}: ${daysToEnd}`);
            
            if (daysToEnd <= 3 && daysToEnd !== 0 && daysToEnd >= 0) {
                const user = await User.findOne({ _id: listing.userRef });
                if (user) {
                    console.log(`Sending email to ${user.email} for listing ${listing.name}`);
                    sendExpirationEmail(user.email, user.username, listing.name, listing.endDate.toDateString());
                    console.log("Email has been sent");
                }
            }
        }
    } catch (error) {
        errorHandler('401', "error");
    }
};



module.exports = { deleteAfterExpiry, checkExpiration };