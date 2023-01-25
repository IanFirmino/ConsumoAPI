const jwt = require('jsonwebtoken');
const JWTSecret = "TEMPERODOJWT";
const ServiceUser = require('./service.users');

exports.login = (req, res) => {

    var {email, password} = req.body;

    if(email == undefined || password == undefined){
        res.status(404);
        res.send({
            msg: "Credenciais inválidas!"
        });
        return 0;
    }

    var user = await ServiceUser.findUser(email, password);
    if(!user[0]){
        res.status(400);
        res.send({
            msg: 'Usuário não encontrado na base de dados'
        }); 

    }else{

        jwt.sign({id: user.id, email: user.email, name: user.name}, JWTSecret, {expiresIn: '1h'}, (err, token) => {
        
            if(err){
                res.status(400);
                res.send({msg: err});
            }else{
                res.status(200);
                res.send({token: token});
            }
        });

    }
}

