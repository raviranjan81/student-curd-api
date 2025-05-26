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
        .json({
          success: false,
          message: "Please provide valid status and type.",
        });
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
export const updateTogelStatus = async (req, res) => {
  try {
    const { type } = req.params;
    const status = req.body?.status; // may be undefined

    // 1️⃣ Find the toggle by type
    const toggle = await TogelModel.findOne({ type });

    if (!toggle) {
      return res.status(404).json({
        success: false,
        message: `No toggle found for type: ${type}`
      });
    }

    // 2️⃣ If status is provided, update it
    if (typeof status === "boolean") {
      toggle.status = status;
      await toggle.save();

      // 3️⃣ Emit real-time update if status changed
      req.io.emit("toggle-updated", {
        type: toggle.type,
        status: toggle.status
      });
    }

    // 4️⃣ Always return current data
    res.json({
      success: true,
      data: {
        type: toggle.type,
        status: toggle.status
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
