const Thought = require("../models/Thought");
const User = require('../models/User')

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findone({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No Thoughts Found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .then(
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: req.body.thoughtText } },
          { new: true }
        )
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((thought) =>
      !thought
        ? res.status(400).json({ message: "No thought with this ID." })
        : res.json(thought)
    );
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No thought found. " })
          : Thought.findOneAndUpdate(
              { users: req.params.thoughtId },
              { $pull: { users: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No user with this ID." })
          : res.json({ message: "Deleted thought" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
