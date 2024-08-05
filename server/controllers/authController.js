const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'AdityaRajj';

exports.register = async (req,res) =>{
    try {
        const {userName,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User ({username,email,password:hashedPassword});
        await newUser.save();

        res.status(201).send('user registered sucessfully');

    }catch(error){
        res.status(500).send(error.message);
    }
};

exports.login = async (req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(user && await bcrypt.compare(password,user.password)){
            const accessToken = jwt.sign({userId:user._id}, secretKey, {expiresIn: '15m'});
            const refreshToken = jwt.sign({userId:user._id}, secretKey, {expiresIn: '7d'});

            res.cookie('acessToken',accessToken,{httpOnly:true});
            res.cookie('refreshToken',refreshToken,{httpOnly:true});
            res.status(200).send('User login sucessfully');
        }else{
            res.status(401).send('Incorrect usermail or password');
        }
    }catch(error){
        res.status(500).send(error.message);
    }
};

const refreshToken = (req,res) =>{
    const {refreshToken} = req.cookies;

    if(!refreshToken) res.status(401).send("token not found");

    jwt.verify(refreshToken, secretKey,(err,user)=>{
        if(err) {
            return res.status(403).send('wrong token');

        }

        const newAccessToken = jwt.sign({userId:user.userId}, secretKey, {expiresIn: '15m'});
        res.cookie('accessToken',newAccessToken,{httpOnly:true});
        res.status(200).send('Acess Token refreshed');
    });
};