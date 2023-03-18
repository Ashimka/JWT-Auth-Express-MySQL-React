const User = require("../db/models/User");

const handleLogout = async (req, res) => {
  // on react, also delete the accessToken
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.sendStatus(204); //no content
  }

  const refreshToken = cookies.jwt;
  //   is refreshToken in DB?
  const foundUser = await User.query().findOne({ refreshToken: refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    // res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  //   delete refreshToken in DB
  const result = await User.query().patchAndFetchById(foundUser.id, {
    refreshToken: "",
  });
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" }); //secure: true
  res.sendStatus(204);
};

module.exports = { handleLogout };
