const jwt = require('jsonwebtoken');
const JWTSecret = "TEMPERODOJWT";

exports.middleware_auth = (req, res, next) => {

    const authToken = req.headers['authorization'];
    if(authToken == undefined){
        res.status(401);
        res.send({err: "token de autorização não inserido."});
        return;
    }

    const token = authToken.split(' ')[1];

    jwt.verify(token, JWTSecret, (err, data) => {
        if(err){
            res.status(401);
            res.send({err: err});
            return;
        }

        req.loggedUser = {
            id: data.id, 
            name: data.name,
            email: data.email, 
            token: token
        }

        next();
    });

}
