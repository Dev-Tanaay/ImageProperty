const {deleteAfterExpiry, checkExpiration}=require("../automation/checkListing");
const dailyCheck=()=>{
    setInterval(()=>{
        deleteAfterExpiry() 
        checkExpiration()
    },24*60*60*1000);
}
module.exports=dailyCheck;