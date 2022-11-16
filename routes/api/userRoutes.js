const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend,
} = require("../../controller/userController");

router.route("/").get(getUsers).post(createUser); // GET and POST a user at localhost:3001/api/users;

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser); // GET, PUT, and DELETE a user at localhost:3001/api/users;

router
  .route("/:userId/friends/:friendId") // POST and DELETE to add friends through userID and friendId at localhost:3001/api/users/:userId/friends/:friendId;
  .post(addUserFriend)
  .delete(removeUserFriend);

module.exports = router;
