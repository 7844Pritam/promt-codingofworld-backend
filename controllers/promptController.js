const Prompt = require("../models/prompt");


const createPrompt = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found in request",
      });
    }

    if (!req.user.canCreatePrompt) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to create prompts. Contact admin.",
      });
    }

    const prompt = await Prompt.create({
      title,
      content,
      category,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Prompt created successfully.",
      data: prompt,
    });

  } catch (error) {
    console.error("Create Prompt Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get all prompts
const getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find()
      .populate("category")
      .populate("user", "name email");

    return res.status(200).json({
      success: true,
      message: "Prompts fetched successfully.",
      data: prompts,
    });

  } catch (error) {
    console.error("Get Prompts Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get prompts by category
const getPromptByCategory = async (req, res) => {
  try {
    const prompts = await Prompt.find({ category: req.params.id })
      .populate("category")
      .populate("user", "name email");

    return res.status(200).json({
      success: true,
      message: "Prompts fetched by category successfully.",
      data: prompts,
    });

  } catch (error) {
    console.error("Get Prompt by Category Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createPrompt, getPrompts, getPromptByCategory };
