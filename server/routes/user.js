const { Router } = require('express');
const User = require('../models/User');
const { veriTytoken } = require('../middleware/index');
const router = Router();
const jwt = require('jsonwebtoken');

router.get("/",veriTytoken, async (req, res) => {
    
    const uid = req.uid;
    
    user = await User.findById(uid);

    res.status(200).send(user);
});

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    const newUser = new User({email, password});

    await newUser.save();
    const token = jwt.sign(
        {
            _id: newUser._id,
            role: "user"
        }, 'secretKey');
    res.status(200).json(token);
});

router.post('/login', async (req,res) => {

    const { email,password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).send("อีเมลไม่ถูกต้อง"); 
    if(user.password !== password) return res.status(401).send("รหัสผ่านไม่ถูกต้อง");

    const token = jwt.sign(
        {
            _id: user._id, 
            role: "user"
        }, 'secretKey');
    res.status(200).json(token);

});


module.exports = router;