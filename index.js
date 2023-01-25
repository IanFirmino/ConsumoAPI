const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWTSecret = "TEMPERODOJWT";

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function middleware_auth(req, res, next){

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

var DB = {
    games: [
        {
            id: 1,
            year: 2020,
            title: 'Call of Duty MW3',
            price: 60
        },
        {
            id: 2,
            year: 2010,
            title: 'Battlefield: Bad Company 2',
            price: 40
        },
        {
            id: 3,
            year: 2020,
            title: 'Battlefield 2042',
            price: 60
        },
        {
            id: 4,
            year: 2020,
            title: 'Call of Duty - Vanguard',
            price: 80
        }
    ],
    users: [
        {
            id: 1,
            name: 'ian',
            email: 'ian@hotmail.com',
            password: 'ian1234@'
        }
    ]  
}

app.get('/games', middleware_auth, (req, res) => {

    var HATEOS = [
        {
            href: 'http://localhost:8080/game/0',
            method: 'DELETE',
            rel: 'delete_game'
        },
        {
            href: 'http://localhost:8080/game',
            method: 'POST',
            rel: 'add_game'
        }
    ]

    res.statusCode = 200;
    res.json({games: DB.games, _links: HATEOS});
});

app.get('/games/:id', (req, res) => {

    var id = req.params.id;
    if(isNaN(id)){
        res.statusCode = 400;
        res.send = "id não númerico"; 
        return 0;   
    }

    var game = DB.games.find(element => id == element.id);
    if(game == undefined){
        res.statusCode = 404; 
        return 0; 
    }    

    res.statusCode = 200;
    res.json(game);
});

app.post("/game", (req, res) => {

    var {year, title, price} = req.body; 
    //id = Date.now();

    DB.games.push({
        id: 10,
        year,
        title,
        price
    });

    res.statusCode = 200;
});

app.delete("/game/:id", (req, res) => {

    id = req.params.id;
    if(isNaN(id)){
        res.statusCode = 400;
        res.send = "id não númerico"; 
        return 0;   
    }

    var game = DB.games.findIndex(element => id == element.id);
    if(game == -1){
        res.statusCode = 404;  
        return 0;
    }  

    //delete DB.games[game];
    DB.games.splice(game, 1);

    res.statusCode = 200;

});

app.put("/game/:id", (req, res) => {
    
    var {title, price, year} = req.body;

    id = req.params.id;
    if(isNaN(id)){
        res.statusCode = 400;
        res.send = "id não númerico";  
        return 0;  
    }

    var game = DB.games.find(element => id == element.id);
    if(game == undefined){
        res.statusCode = 404; 
        return 0; 
    }   

    if(title != undefined){
        game.title = title;
    }
    if(price != undefined){
        game.price = price;
    }
    if(title != undefined){
        game.year = year;
    }

    res.statusCode = 200;

});


app.post("/auth", (req, res) => {

    var {email, password} = req.body;

    if(email == undefined || password == undefined){
        res.status(404);
        res.send({
            msg: "Credenciais inválidas!"
        });
        return 0;
    }
    
    var user = DB.users.find(element => element.email == email && element.password == password);
    console.log(user);
    if(!user){
        res.status(400);
        res.send({
            msg: 'Usuário não encontrado na base de dados'
        });
        return 0;
    }

    jwt.sign({id: user.id, email: user.email, name:user.name}, JWTSecret, {expiresIn: '1h'}, (err, token) => {
        
        if(err){
            res.status(400);
            res.send({msg: err});
            return 0;
        } 
        
        res.status(200);
        res.send({token: token});
    
    });

});

app.listen(8080, () => {
    console.log("API Rodando!");
});
