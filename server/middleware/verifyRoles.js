const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.sendStatus(401);
    }
    const rolesArrey = [...allowedRoles];

    const result = req.roles
      .map((role) => rolesArrey.includes(role))
      .find((value) => value === true);

    if (!result) {
      return res.sendStatus(401);
    }
    next();
  };
};
module.exports = verifyRoles;
