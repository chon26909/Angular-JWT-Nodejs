const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const jwt = require('jsonwebtoken');

router.get("/", (req, res) => {
    res.send("Hello");
});

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    const newUser = new User({email, password});

    await newUser.save();
    const token = jwt.sign(
        {
            _id: newUser._id,
            role: "user"
        }, 'ssecretKey');
    res.status(200).json(token);
});

router.post('/login', async (req,res) => {

    const { email,password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).send("อีเมลไม่ถูกต้อง"); 
    if(user.password !== password) return res.status(401).send("รหัสผ่านไม่ถูกต้อง");

    const token = jwt.sign(
        {
            _id: newUser._id, 
            role: "user"
        }, 'ssecretKey');
    res.status(200).json(token);

});

module.exports = router;