const { default: mongoose } = require('mongoose');
const Vlog = require('../models/vlogModel');
const User = require('../models/userModel');

// Get All Vlog
module.exports.getAllVlog = async (req,res, next) =>{
    try{
        const vlog = await Vlog.find();
        res.status(200).json({vlog});
    } catch (err) {
        res.status(404).json({message: "No Vlog Found"});
    }
};


// Add Vlog
module.exports.addVlog = async (req, res, next) =>{
    const { title, description, image, user} = req.body;

    let existingUser;
    try{
        existingUser = await User.findById(user);
    } catch (err){
        return console.log(err);
    }
    if (!existingUser){
        return res.status(400).json({message:" Unable to find user by Id:"});
    }

    const vlog = new Vlog ({
        title,
        description,
        image,
        user,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await vlog.save({ session });
        existingUser.Vlogs.push(vlog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (err){
        console.log(err);
        return res.status(500).json({message: err});
    }
    return res.status(200).json({ vlog });
}

// Update Vlog
module.exports.updatevlog = async (req, res, next) =>{
    const {title, description} = req.body;
    const vlogID = req.params.id;
    let vlog;
    try{
        vlog = await Vlog.findByIdAndUpdate(vlogID, {
            title,
            description,
        })
    } catch (err){
        return res.send(err);
    }
    if (!vlog){
        return res.status(500).json({message: " Unable to Update Vlog:"});
    }
    return res.status(200).json({vlog});
}

// Get By Id
module.exports.getById = async (req, res,next) =>{
    const id = req.params.id;
    try{
        const vlog = await Vlog.findById(id);
        res.status(200).json({vlog});
    } catch (err) {
        res.status(404).json({message: "No vlog Found"});
    }
}


// Delete Vlog
module.exports.deletevlog = async (req, res, next) => {
    const id = req.params.id;

    let vlog;
    try{
        vlog = await Vlog.findByIdAndDelete(id).populate('user');
        await vlog.user.vlogs.pull(vlog);
        await vlog.user.save();
    } catch (err){
        return res.send(err);
    }
    if (!vlog){
        return res.status(500).json({message: " Unable to Delete"});
    }
    return res.status(200).json({message:"successfully Deleted"});
}


// /Get by User Id
module.exports.getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userVlogs;
    try{
        userVlogs = await User.findById(userId).populate("Vlogs");
    }
    catch (err){
        return console.log(err)
    }
    if(!userVlogs){
        return res.status(404).json({message: " No Vlog found"});
    }
    return res.status(200).json({vlogs:userVlogs});
}