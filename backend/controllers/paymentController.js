const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE);
const errorHandler = require("../utils/error");
const Payment = require("../models/paymentModel");
const Listing = require("../models/listingModel");

const getExchange = async () => {
  try {
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
    const rate = response.data.rates.INR;
    return rate;
  } catch (error) {
    throw new Error("Failed to fetch exchange rate");
  }
};

const paymentController = async (req, res, next) => {
  try {
    const exchangeRate = await getExchange();
    const amount = 1;
    const inr = Math.round(exchangeRate * amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Test Product" },
            unit_amount: inr,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success`,
      cancel_url: `http://localhost:5173/payment-cancel`,
    });

    res.json({ success: true, url: session.url });
    const payment_id = session.id;
    await Payment.create({
      payment_id,
      username: req.body.username,
      amount: parseFloat((exchangeRate * amount).toFixed(2)),
      email: req.body.email
    });
  } catch (error) {
    next(errorHandler("500", error));
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const exchangeRate = await getExchange();
    const amount = 1;
    const inr = Math.round(exchangeRate * amount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Test Product" },
            unit_amount: inr,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/profile`,
      cancel_url: `http://localhost:5173/payment-cancel`,
    });
    const payment_id = session.id;
    await Payment.create({
      payment_id,
      username: req.body.username,
      amount: parseFloat((exchangeRate * amount).toFixed(2)),
      email: req.body.email
    });
    res.json({ success: true, url: session.url });
    const { listingId, startDate } = req.body;
    const startDateObj = new Date(startDate);
    const endDate = new Date(startDateObj);
    endDate.setDate(startDateObj.getDate() + 30);
      const listing = await Listing.findById(listingId);

      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      listing.startDate = startDateObj.toISOString();
      listing.endDate = endDate.toISOString();

      await listing.save();

      // return res.status(200).json({ message: "Listing dates updated successfully", listing });
  } catch (error) {
    next(errorHandler("500", error));
  }
};

module.exports = { paymentController, updatePayment };
