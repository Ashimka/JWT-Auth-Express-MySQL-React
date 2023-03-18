const User = require("../db/models/User");
const Roles = require("../db/models/Roles");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pass } = req.body;

  if (!user || !pass) {
    return res
      .status(400)
      .json({ "message": "Пользователь или пароль не найдены" });
  }
  // check for duplicate usernames in the db
  const duplicate = await User.query().findOne({ email: user });

  if (duplicate) {
    return res.sendStatus(409);
  }

  try {
    // created hashpassword
    const hashPass = await bcrypt.hash(pass, 10);
    // create and store the new user
    const newUser = await User.query().insert({
      "email": user,
      "password": hashPass,
    });
    const id = newUser.id;

    const rolesUser = await Roles.query().insert({
      "user_id": id,
    });
    console.log({ newUser, rolesUser });
    res.status(201).json({ "success": `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

module.exports = { handleNewUser };
