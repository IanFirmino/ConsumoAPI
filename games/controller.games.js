const ServiceGames = require('./service.games');

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

exports.getAll = async (req, res) => {
    
    var games = await ServiceGames.findAll();
    
    if(games[0]){
        res.json({games: games[1], _links: HATEOS});
        res.statusCode = 200;
    }else{
        res.json({games: games[1]});
        res.statusCode = 404;
    }
}

exports.getById = async (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.statusCode = 400;
        res.send = "id não númerico"; 
        return 0;   
    }
    
    var games = await ServiceGames.findOne({id: id});
    if(games[0]){
        res.json({games: games[1], _links: HATEOS});
        res.statusCode = 200;  
    }else{
        res.json({games: games[1]});
        res.statusCode = 404;
    }
}

exports.deleteById = async (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.statusCode = 400;
        res.send = "id não númerico"; 
        return 0;   
    }

    var del = await ServiceGames.delete({id: id});
    if(del[0]){
        res.json({games: games[1], _links: HATEOS});
        res.statusCode = 200;  
    }else{
        res.json({games: games[1]});
        res.statusCode = 404;
    }
}

exports.updateById = async (req, res) => {
    var id = req.params.id;
    var {game, categoria, preco} = req.body;

    if(isNaN(id)){
        res.statusCode = 400;
        res.send = "id não númerico"; 
        return 0;   
    }

    var up = await ServiceGames.update({id: id}, {game: game, categoria: categoria, preco: preco});
    if(up[0]){
        res.json({games: games[1], _links: HATEOS});
        res.statusCode = 200;
    }else{
        res.json({games: games[1]});
        res.statusCode = 404;
    }
}

exports.createOne = async (req, res) => {
    var {game, categoria, preco} = req.body;

    var create = await ServiceGames.createOne({game: game, categoria: categoria, preco: preco});
    if(create[0]){
        res.json({games: games[1], _links: HATEOS});
        res.statusCode = 200;
    }else{
        res.json({games: games[1]});
        res.statusCode = 404;
    }

}
