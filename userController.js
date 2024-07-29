const User = require('../models/userModel');
const bcrypt =  require('bcryptjs');

module.exports.getAllUser = async (req,res, next) =>{
    try{
        const users = await User.find();
        res.status(200).json({users});
    } catch (err) {
        res.status(404).json({message: "No Users Found"});
    }
};

// Signup process...

module.exports.signup =  async (req,res,next) =>{
    const { name, email, password } = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    } catch (err){
        res.send(err);
    }
    if(existingUser) {
        return res.status(400).json({message: "User already exist!"});
    }

    const hashedPassword = bcrypt.hashSync(password);
        
    const user = new User({
        name,
        email,
        password: hashedPassword,
        vlogs: [],
    });

    try{
        user.save();
    } catch (err){
        res.send(err);
    }
    return res.status(200).json({user});
}


// Login Prosess....

module.exports.login = async (req,res,next) =>{
    const { email, password } = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    } catch (err){
        res.send(err);
    }
    if(!existingUser) {
        return res.status(404).json({message: " Could not find user email id!"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:'Password is not correct!'});
    }
    res.status(200).json({message:"Login is succesfully!"});
}

