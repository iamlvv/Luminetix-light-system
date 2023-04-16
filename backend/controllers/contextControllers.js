const Context = require("../models/contextModel.js");
const User = require("../models/userModel.js");
const { addNoti } = require("../controllers/notiControllers.js");
const asyncHandler = require("express-async-handler");

// @desc    Create a new context
// @route   POST /api/contexts
// @access  Private
const createContext = asyncHandler(async (req, res) => {
  const { name, description, input, output } = req.body;
  try {
    const context = await Context.create({
      name,
      description,
      input,
      output,
    });
    res.status(201).json(context);
    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: `New context`,
          type: "context",
          message: "Create new context: ${context.name}",
        },
        user: user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating context" });
  }
});

// @desc    Delete a context by ID
// @route   DELETE /api/contexts/:id
// @access  Private
const deleteContext = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const context = await Context.findById(id);
    if (!context) {
      return res.status(404).json({ message: "Context not found" });
    }
    await context.deleteOne();
    res.status(200).json({ message: "Context deleted successfully" });
    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: `Delete context`,
          type: "context",
          message: "Delete context: ${context.name}",
        },
        user: user,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting context" });
  }
});

// @desc    Get all contexts
// @route   GET /api/contexts
// @access  Private
const getAllContexts = asyncHandler(async (req, res) => {
  try {
    const contexts = await Context.find();
    res.status(200).json(contexts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting contexts" });
  }
});

// @desc    Turn context on or off
// @route   PATCH /api/contexts/:id
// @access  Private
const toggleContext = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const context = await Context.findById(id);
    if (!context) {
      return res.status(404).json({ error: `Context id ${id} not found` });
    }
    const updatedContext = await Context.findByIdAndUpdate(
      id,
      { active: !context.active },
      { new: true }
    );

    const users = await User.find({});
    for (const user of users) {
      await addNoti({
        body: {
          name: `Adjust context`,
          type: "context",
          message: `Context "${updatedContext.name}" turned ${
            updatedContext.active ? "on" : "off"
          }`,
        },
        user: user,
      });
    }
    return res.json({
      message: `Context "${updatedContext.name}" turned ${
        updatedContext.active ? "on" : "off"
      }`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  createContext,
  deleteContext,
  getAllContexts,
  toggleContext,
};
