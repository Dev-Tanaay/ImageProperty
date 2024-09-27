const express=require("express");
const {paymentController,updatePayment}=require("../controllers/paymentController.js");
const router = express.Router();

router.post("/payment",paymentController);
router.post("/updatepayment",updatePayment);
module.exports=router;