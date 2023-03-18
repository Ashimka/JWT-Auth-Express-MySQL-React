const Router = require("express");
const router = new Router();

const homeRoute = require("./homeRoute");
const usersRoute = require("./usersRoute");
const verifyJWT = require("../middleware/verifyJWT");

router.use("/", homeRoute);

router.use(verifyJWT);
router.use("/users", usersRoute);

module.exports = router;
