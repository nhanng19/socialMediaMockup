const Thought = require("../models/Thought");
const User = require("../models/User");

// Bulk exporting all of our CRUD operations;

module.exports = {

  // Return all thoughts in our DB;

  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Return a single thought by its _id

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate("reactions")
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No Thoughts Found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought;

  async createThought(req, res) {
    try {
      const data = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: data._id } },
        { new: true }
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update a thought with our body;

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

  // Delete a thought by its _id;

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId }).then(
      res.json({ message: "Thought deleted." })
    );
  },

  // Get all reactions from a thought by thoughtId;

  getReactions(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate("reactions")
      .then((reactions) => res.status(200).json(reactions))
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction without our request body;

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .populate("reactions")
      .then((reaction) => res.status(200).json(reaction))
      .catch((err) => res.status(500).json(err));
  },

// Delete a reaction from a thought by thoughtId and reactionId;
  
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then(res.status(200).json({ message: "Reaction deleted." }))
      .catch((err) => res.status(500).json(err));
  },
};
