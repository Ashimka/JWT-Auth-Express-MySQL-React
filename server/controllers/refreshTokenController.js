const User = require("../db/models/User");
const Roles = require("../db/models/Roles");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  const foundUser = await User.query().findOne({ refreshToken: refreshToken });

  if (!foundUser) {
    return res.sendStatus(403); //Forbidden
  }

  //check jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SEKRET,
    async (error, decoded) => {
      if (error || foundUser.email !== decoded.email) {
        return res.sendStatus(403);
      }

      const roleUser = await Roles.query().findOne({ "user_id": foundUser.id });

      const roles = Object.values(roleUser).filter((role) => role >= 333);

      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "email": decoded.email,
            "roles": roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
