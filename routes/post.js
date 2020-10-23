const router = require('express').Router();
const verification =require('./verify');
router.get('/',verification,(req, res) => {
    res.send(req.user);
})




module.exports = router;