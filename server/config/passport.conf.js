const passport = require("passport");
const { Strategy } = require("passport-jwt");
const query = require("./mysql.conf");

const cookieJwtExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieJwtExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  "jwt",
  new Strategy(jwtOptions, async function (payload, done) {
    if (!payload || payload.uuid) {
      return done(null, false, "Invalid credentials");
    }
    try {
      const [user] = await query("SELECT * FROM users WHERE users.uuid = ?", [
        payload.uuid,
      ]);
      if (!user) {
        return done(null, false, "Invalid Credentials");
      }
      return done(null, user);
    } catch (e) {
      return done(true, false, "Something went wrong");
    }
  })
);

module.exports = passport;
