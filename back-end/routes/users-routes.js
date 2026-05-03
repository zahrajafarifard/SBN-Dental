const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/users-controllers");

router.post("/login", usersControllers.login);
router.post("/checkUser", usersControllers.generateSecurityCode);
router.patch("/set-new-password", usersControllers.setNewPassword);

router.get("/", usersControllers.signUp);

module.exports = router;
