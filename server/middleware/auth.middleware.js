// const passport = require("passport");
const passport = require("passport");

async function auth(req, res, next) {
  passport.authenticate("jwt", (err, user) => {
    if (err) {
      return res.status(500).send({
        success: false,
        data: null,
        error: "Something went wrong. Please try again, middleware",
      });
    }
    if (!user) {
      return res.status(401).send({
        success: false,
        data: null,
        error: "Invalid credentials",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = auth;
