const jwt = require('jsonwebtoken');
const secretkey = 'secretkey';

function verifyToken(req, res, next) {
    const bearerToken = req.headers['authorization']; // token in headers
    console.log("bearerToken ",bearerToken);
    const token = bearerToken.split(' ')[1];  // convert string into array
    console.log("token ",token);
    jwt.verify(token, secretkey, function (err, decoded) {
        if (err) {
            res.status(401).send({ message: 'token is not verified' })
            console.log("err ", err);
        } else {
            console.log('decoded ', decoded);
            req.user = decoded  // decoded: { userId: 123, role: update}
            console.log('req.user ', req.user)
        }
    })
    next();
}
module.exports = verifyToken;




















