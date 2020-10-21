const router=require('express').Router();
const User= require('../models/user')

const Joi= require('@hapi/joi')
const schema=Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password:Joi.string().min(6).required(),
    
});

router.post('/login',(req,res)=>{
    res.send('login')
})

router.post('/register',async(req,res)=>{
    
    const valid= schema.validate(req.body)
    res.send(valid);
    const user= new User({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    });
    try{
         const saveduser= await user.save();
         res.send(saveduser);
    }catch(err){
        res.status(400).send(err);
    }

})
module.exports=router;