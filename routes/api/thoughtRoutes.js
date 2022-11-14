const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  getReactions,
  createReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .get(getReactions)
  .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router;
