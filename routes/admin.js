const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const {
  changeUserRole,
  togglePromptPermission,
} = require("../controllers/adminContorller");

// router.use(authenticate); 
// router.use(authorizeAdmin); 

router.patch("/user/:userId/role",protect,authorizeAdmin, changeUserRole);

router.patch("/user/:userId/permission",protect,authorizeAdmin, togglePromptPermission);

module.exports = router;
