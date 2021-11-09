const express = require("express");
const router = express.Router();
const { login, signup } = require("../models/user.models");
// const auth = require("../middleware/auth.middleware");

// logout function for the server-clears out jwt, user must sign in again after logging out
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.send({ success: true, data: "Signed Out", error: null });
});

// checks to see if the entered username exists.
// will need to add auth back into the following line once we get passport configured
router.get("/verify", (req, res) => {
  return res.send({
    success: true,
    data: { username: req.user.username },
    error: null,
  });
});

// takes username and password, then vaildates them with the function below, checks for correct length
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (validate(username, password)) {
    // in case of unvalidated info entered the following error will be thrown:
    return res.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  // if data is validated successfully and is sent to the DB successfully, then the user data will be sent to the model
  signup(res, username, password);
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // uses the local validate function to make sure its possible to have the username and password entered.
  if (validate(username, password)) {
    return res.send({
      success: false,
      error: "Invalid data provided",
      data: null,
    });
  }
  // sends to model
  login(res, username, password);
});
// checks to make sure that the username and password are of appropriate length, and that there is something entered
// anything that is "validated" from this function essentially fails validation and will not get sent to the back end
function validate(username, password) {
  return (
    !username ||
    !password ||
    username.length < 4 ||
    username.length > 20 ||
    password.length < 8 ||
    password.length > 20
  );
}

module.exports = router;
