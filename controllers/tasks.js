const Task = require("../models/Tasks");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ status: "success", tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    // const error = new Error(`No task with id : ${req.params.id}`);
    // error.status = 404;
    const error = createCustomError(`No task with id : ${req.params.id}`, 404);
    console.log(error);
    return next(error);
    // return res.status(404).json({ msg: `No task with id : ${req.params.id}` });
  }
  return res.status(200).json({ task });
});
const createTasks = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateTask) {
      return res
        .status(404)
        .json({ msg: `No task with id : ${req.params.id}` });
    }
    res.status(200).json({ updateTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id : ${req.params.id}` });
    }
    return res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTask,
};
