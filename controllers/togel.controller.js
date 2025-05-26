import TogelModel from "../models/togel.model.js";

// ✅ Get all toggles
export const getAllToggles = async (req, res) => {
  try {
    const toggles = await TogelModel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Fetched all toggles!",
      total: toggles.length,
      toggles,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Create new toggle
export const createTogel = async (req, res) => {
  try {
    const { status, type } = req.body;

    if (typeof status !== "boolean" || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide valid status and type." });
    }

    const existing = await TogelModel.findOne({ type });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Type already exists",
      });
    }

    const toggle = new TogelModel({ type, status });
    await toggle.save();

    res.json({
      success: true,
      message: "New toggle created!",
      toggle,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Get toggle by type
export const getTogelByType = async (req, res) => {
  try {
    const { type } = req.params;

    const toggle = await TogelModel.findOne({ type });
    if (!toggle) {
      return res.status(404).json({
        success: false,
        message: `No toggle found for type: ${type}`,
      });
    }

    res.json({
      success: true,
      toggle,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
