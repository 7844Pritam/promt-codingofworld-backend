const express = require("express");
const router = express.Router();
const {
  createPrompt,
  getPrompts,
  getPromptByCategory,

} = require("../controllers/promptController");
const  protect  = require("../middleware/authMiddleware");

router.post("/", protect, createPrompt);
router.get("/", getPrompts);
router.get("/category/:id", getPromptByCategory);

module.exports = router;
