const Category = require("../models/Category");

// Create Category
const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Category name is required.",
    });
  }

  try {
    const category = await Category.create({ name: name.trim() });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });

  } catch (err) {
    console.error("Create Category Error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      data: categories,
    });

  } catch (err) {
    console.error("Get Categories Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
    });
  }
};

module.exports = { createCategory, getAllCategories };
