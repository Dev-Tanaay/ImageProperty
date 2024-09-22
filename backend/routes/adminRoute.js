const express=require("express");
const {getUsers,deleteUser,getPayment,getListing,totalListing,totalUser}=require("../controllers/adminController");
const verifyToken = require("../utils/verifyUser");
const verifyAdmin=require("../utils/verifyAdmin");
const router=express.Router();


router.get("/user",verifyToken,verifyAdmin,getUsers);
router.delete('/delete/:id', verifyToken, verifyAdmin,deleteUser);
router.get("/pay",verifyToken,verifyAdmin,getPayment);
router.get("/list/:id",verifyToken,verifyAdmin,getListing);
router.get("/list",verifyToken,verifyAdmin,totalListing);
router.get("/users",verifyToken,verifyAdmin,totalUser);
module.exports=router;