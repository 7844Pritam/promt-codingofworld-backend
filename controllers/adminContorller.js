const User = require("../models/user");

// ✅ Change user role (user <-> admin)
const changeUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body || {};

  // Validate input
  if (!role) {
    return res.status(400).json({
      success: false,
      message: "Missing 'role' in request body.",
    });
  }

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role. Allowed roles: 'user', 'admin'.",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `User role updated to '${role}'`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Change Role Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Toggle prompt creation permission (canCreatePrompt: true/false)
const togglePromptPermission = async (req, res) => {
  const { userId } = req.params;
  const { canCreatePrompt } = req.body || {};

  if (typeof canCreatePrompt !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Invalid 'canCreatePrompt' value. It must be true or false.",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { canCreatePrompt },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `User permission updated: canCreatePrompt = ${canCreatePrompt}`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Toggle Prompt Permission Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  changeUserRole,
  togglePromptPermission,
};
