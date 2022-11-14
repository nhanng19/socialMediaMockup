const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find().populate('thoughts').populate('friends')
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user with that id." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user found with this id." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId }).then(
      res.status(200).json({ message: "User Deleted" })
    );
  },
  addUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then(
        User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $addToSet: { friends: req.params.userId } },
          { runValidators: true, new: true }
        )
      )

      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found this id."})
          : User.findOneAndUpdate(
              { _id: req.params.friendId },
              { $addToSet: { friends: req.params.userId } },
              { runValidators: true, new: true }
            ).then(res.status(200).json(user))
      )
      .catch((err) => res.status(500).json(err));
  },

  removeUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidoatrs: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user found with this id" })
          : User.findOneAndUpdate(
              { _id: req.params.friendId },
              { $pull: { friends: req.params.userId } },
              { runValidators: true, new: true }
            ).then(res.status(200).json(user))
      )
      .catch((err) => res.status(500).json(err));
  },
};
