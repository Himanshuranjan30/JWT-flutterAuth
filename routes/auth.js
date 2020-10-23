const router = require('express').Router();
const User = require('../models/user')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

const Joi = require('@hapi/joi');
const { valid } = require('@hapi/joi');



const Rschema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),

});

const Lschema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
})

router.post('/login', async(req, res) => {
    const { error } = Lschema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email doesnt exist')

    const validpass= await bcrypt.compare(req.body.password,user.password);
    if(!validpass) return res.status(400).send('Password Wrong')
    
    const token= jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);
    res.send('Logged in');
})

router.post('/register', async (req, res) => {

    const { error } = Rschema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailexist = await User.findOne({ email: req.body.email });
    if (emailexist) return res.status(400).send('Email ALREADY EXists')
    
    const salt= await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(req.body.password,salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const saveduser = await user.save();
        res.send(saveduser);
    } catch (err) {
        res.status(400).send(err);
    }

})
module.exports = router;