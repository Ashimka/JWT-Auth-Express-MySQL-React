const User = require("../db/models/User");

const getAllUsers = async (req, res) => {
  const users = await User.query();

  if (!users) {
    return res.status(204).json({ "message": "Пользователи не найдены" });
  }
  res.json(users);
};

const deleteUsers = async (req, res) => {
  if (!req.body.id) {
    return res
      .status(400)
      .json({ "message": "Требуется идентификатор пользователя" });
  }

  const user = await User.query().findOne({ id: req.body.id });
  if (!user) {
    return res.status(204).json({
      "message": `Потльзователь с идентификатором ${req.body.id} не найден`,
    });
  }

  const result = await User.query().deleteById(req.body.id);
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ "message": "Требуется идентификатор пользователя" });
  }

  const user = await User.query().findById(req.params.id);
  if (!user) {
    return res.status(204).json({
      "message": `Потльзователь с идентификатором ${req.params.id} не найден`,
    });
  }

  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUsers,
  getUser,
};
