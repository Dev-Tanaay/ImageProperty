const jwt = require("jsonwebtoken");
const errorHandler = require("./error.js");

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Unauthorized'));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
    const admin=req.user.is_admin;
    if(!admin){
        next(errorHandler(403, 'Access denied'));
    }
    next();
  });
};

module.exports = verifyAdmin;
