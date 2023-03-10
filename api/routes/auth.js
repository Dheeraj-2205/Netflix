const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js")
// Register

router.post("/register", async (req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY)
    });
    console.log(newUser.username);
    try {
        const user = await newUser.save();
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

// login

router.post("/login" ,async(req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email});
        !user && res.status(401).json("wrong password or username");
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const orginalpassword = bytes.toString(CryptoJS.enc.Utf8);
        if(orginalpassword !== req.body.password){
            res.status(401).json("Wrong password or username");
        }else{
            const {password,...info} = user._doc
            res.status(200).json(info);
        }
    } catch(error) {
        res.status(500).json(error);
    }
})
module.exports = router;
