const User = require("../models/userModel.js");
const Payment=require("../models/paymentModel.js");
const Listing=require("../models/listingModel.js");

const errorHandler = require("../utils/error.js");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({_id: { $ne: req.user.id } }, { password: 0 });
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
}

const getPayment = async (req, res) => {
    try {
        const pay = await Payment.find({},{_id:0});
        const result = await Payment.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        const totalAmount = result[0]?.totalAmount || 0;
        if (pay.length === 0) {
            return res.status(404).json({ message: "No payments found" });
        }
        return res.status(200).json({pay,totalAmount});
    } catch (error) {
        console.error(error);
    }
}


const getListing = async (req, res) => {
    try {
        const listings = await Listing.find({ userRef: req.params.id },{userRef:0});
        if (listings.length === 0) {
            return res.status(404).json({ message: "No listings found for this user" });
        }
        return res.status(200).json(listings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const totalListing=async (req, res) => {
    try {
        const totalListings = await Listing.countDocuments();
        return res.status(200).json({ totalListings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const totalUser=async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ _id: { $ne: req.user.id } });
        return res.status(200).json({ totalUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUsers, deleteUser,getPayment,getListing,totalListing,totalUser };