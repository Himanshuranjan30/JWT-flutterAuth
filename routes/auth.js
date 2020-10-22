const router = require('express').Router();
const User = require('../models/user')
const bcrypt= require('bcryptjs')

const Joi = require('@hapi/joi')



const Rschema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),

});

const Lschema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
})

router.post('/login', (req, res) => {
    res.send('login')
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