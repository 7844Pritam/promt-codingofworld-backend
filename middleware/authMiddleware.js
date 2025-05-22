const jwt = require("jsonwebtoken");
const User = require("../models/user"); 

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("No token found in the request");
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; 
    console.log("User from DB:", req.user);
    next();
  } catch (error) {
    console.log("Invalid token:", error.message);
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
