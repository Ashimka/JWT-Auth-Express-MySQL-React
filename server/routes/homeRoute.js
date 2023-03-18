const Router = require("express");
const router = new Router();

const registerController = require("../controllers/registerController");
const authController = require("../controllers/authController");
const refreshTokenController = require("../controllers/refreshTokenController");
const logoutController = require("../controllers/logoutController");

router.get("/");
router.post("/register", registerController.handleNewUser);
router.post("/auth", authController.handleLogin);
router.get("/refresh", refreshTokenController.handleRefreshToken);
router.get("/logout", logoutController.handleLogout);

module.exports = router;
