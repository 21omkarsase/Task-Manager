const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 5) {
          throw new Error("Task description must be at least 5 characters");
        }
      },
    },
    due: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (value.length < 5) {
          throw new Error("Task description must be at least 5 characters");
        }
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// const task = new Task({
//   description: "",
// });

// task
//   .save()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

module.exports = Task;
