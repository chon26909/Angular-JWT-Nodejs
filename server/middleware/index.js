const jwt = require('jsonwebtoken');

const veriTytoken = (req,res,next) => {
    if(!req.headers.authorization) {
        return res.status(401).send("Unauthorize Request");
    }

    const token = req.headers.authorization.split(' ')[1];

    if(token === 'null') {
        return res.status(410).send("Unauthorize Request");
    }
    const payload = jwt.verify(token, 'secretKey');
    req.uid  = payload._id;

    next();
}

module.exports = {
    veriTytoken
}