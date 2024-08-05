
const asyncHandler= require("express-async-handler");
const User = require("../Models/userModel");
const jwt=require("jsonwebtoken");
const bcrypt= require("bcrypt");

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;

    if(!username || !email ||!password){
        res.status(400)
        throw new Error("All fields are required")
    }
    const userAvailable= await User.findOne({email});

    if (userAvailable){
        res.status(400)
        throw new Error("User already Registered")
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password,10);
  
    const user = User.create({
        username,
        email,
        password:hashedPassword
    });

    console.log (`User created :, ${user}`);

    if(user){
        res.status(201).json({_id:user.id ,email:user.email});
    }else{
        res.status(400).json({message:"Invalid user data"})
    }});
    

//user login
//@route POST /api/users
//acces public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please provide email and password");
    }

    const user=await User.findOne({email});

    //compare user passsword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
           user:{
            username: user.username,
            email:user.email,
            id:user.id
           } 
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn: "10m"})
        res.status(200).json({accessToken})}
        else{
            res.status(401)
            throw new Error("Invalid Credentials");
        }


   
    });

// current user info
//@route POST /api/users/current
//acces public
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
    });

    module.exports= {registerUser,currentUser,loginUser};