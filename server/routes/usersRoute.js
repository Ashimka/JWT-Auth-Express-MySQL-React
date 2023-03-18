const Router = require("express").Router;
const router = new Router();

const userController = require("../controllers/userController");
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/", verifyRoles(ROLES_LIST.admin), userController.getAllUsers);

module.exports = router;
