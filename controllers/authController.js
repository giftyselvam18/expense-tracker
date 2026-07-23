const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register

exports.register = async(req,res)=>{

    try{

        const {name,email,password}=req.body;

        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }


        const hashPassword = await bcrypt.hash(password,10);


        const user = await User.create({

            name,
            email,
            password:hashPassword

        });


        res.json({
            message:"Register success",
            user
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Login

exports.login = async(req,res)=>{

    try{

        const {email,password}=req.body;


        const user = await User.findOne({email});


        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }


        const match = await bcrypt.compare(
            password,
            user.password
        );


        if(!match){

            return res.status(400).json({
                message:"Invalid password"
            });

        }


        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );


        res.json({
            message:"Login success",
            token
        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};