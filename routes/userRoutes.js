 const express= require("express");
const { registerUser, loginUser, currentUser } = require("../Controllers/userController");
const ValidateToken = require("../Middleware/ValidateTokenHandler");

 const router=express.Router();

 router.post("/register",registerUser )

 router.post("/login", loginUser)

router.get("/current",ValidateToken, currentUser);

module.exports= router;