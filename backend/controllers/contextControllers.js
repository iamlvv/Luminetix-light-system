const Context = require("../models/contextModel.js");
const asyncHandler = require("express-async-handler");

// @desc    Create a new context
// @route   POST /api/context
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating context" });
  }
});

// @desc    Delete a context by ID
// @route   DELETE /api/context/:id
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting context" });
  }
});

// @desc    Get all contexts
// @route   GET /api/context
// @access  Private
// Retrieve all contexts
const getAllContexts = asyncHandler(async (req, res) => {
  try {
    const contexts = await Context.find();
    res.status(200).json(contexts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting context" });
  }
});

module.exports = {
  createContext,
    deleteContext,
    getAllContexts,
};
