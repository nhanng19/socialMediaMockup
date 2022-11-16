const { connect, connection } = require("mongoose");

// Sets up mongoDB to our localhost;

connect("mongodb://localhost/socialMediaDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
