const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const middleware_auth = require('./middleware/auth');
const ControllerLogin = require('./login/controller.login');
const ControllerGames = require('./games/controller.games');
const ControllerUsers = require('./users/controller.users');

const gamesRouter = express.Router();
const usersRouter = express.Router();

app.post("/auth", ControllerLogin.login);

gamesRouter
    .route('/api/games')
    .get(middleware_auth, ControllerGames.getAll)
    .post(middleware_auth, ControllerGames.createOne);

gamesRouter
    .route('/api/games/:id')
    .put(middleware_auth, ControllerGames.updateById)
    .get(middleware_auth, ControllerGames.getById)
    .delete(middleware_auth, ControllerGames.deleteById);

usersRouter
    .route('/api/login')
    .post(ControllerUsers.login);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(gamesRouter);
app.use(usersRouter);


app.listen(8080, () => {
    console.log("API Rodando!");
});
