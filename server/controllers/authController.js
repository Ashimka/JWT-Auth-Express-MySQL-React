const User = require("../db/models/User");
const Roles = require("../db/models/Roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, pass } = req.body;

  if (!user || !pass) {
    return res
      .status(400)
      .json({ "message": "Пользователь или пароль не найдены" });
  }
  const foundUser = await User.query().findOne({ email: user });
  if (!foundUser) {
    return res.sendStatus(401); //Unauthorized
  }

  //check pass
  const match = await bcrypt.compare(pass, foundUser.password);

  if (match) {
    const roleUser = await Roles.query().findOne({ "user_id": foundUser.id }); //Object.values(foundUser.roles);

    const roles = Object.values(roleUser).filter((role) => role >= 333);

    // create JWT
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "email": foundUser.email,
          "roles": roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { "email": foundUser.email },
      process.env.REFRESH_TOKEN_SEKRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user

    const result = await User.query()
      .patch({ refreshToken: refreshToken })
      .findById(foundUser.id);

    // creates secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true, // testing
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log("refreshToken", refreshToken);
    // send authorization roles and access tocen to user
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401); //Unauthorized
  }
};

module.exports = { handleLogin };
