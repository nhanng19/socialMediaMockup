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

router.route("/").get(getThoughts).post(createThought); // GET and POST a thought at localhost:3001/api/thoughts;

router
  .route("/:thoughtId") // GET, PUT, and DELETE thought throught thought's id at localhost:3001/api/thoughts/:thoughtId;
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought); 

router.route('/:thoughtId/reactions') // GET and POST a reaction through thought's id at localhost:3001/api/thoughts/:thoughtId/reactions; 
  .get(getReactions)
  .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId') // DELETE a reaction throught thought and reaction's id at localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId;
  .delete(deleteReaction)

module.exports = router;
