const User = require('../models/user');

exports.getProfile = async (req,res) =>{
    try {
        const user = await user.findById(req.params.userId);

        if(!user){
            return res.status(404).send("usernotfound");
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.updateProfile = async (req,res) =>{
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.userId,updates,{new:true});

        if(!user){
            return res.status(404).send("usernotfound");
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).send(err);
    }
};