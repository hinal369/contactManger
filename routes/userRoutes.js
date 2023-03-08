const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post("/register", UserController.registerUser);
router.post("/Login", UserController.loginUser);
router.get("/current", validateToken,  UserController.currentUser);

module.exports = router;