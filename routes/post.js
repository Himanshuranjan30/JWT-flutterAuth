const router = require('express').Router();
const verification =require('./verify');
router.get('/',verification,(req, res) => {
    res.json({ posts: { title: 'my first post', description: 'random data' } })
})




module.exports = router;