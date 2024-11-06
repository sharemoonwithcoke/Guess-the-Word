const express = require('express');
const cookieParser = require('cookie-parser');
const { renderLoginPage, renderHomePage, renderErrorPage } = require('./views/view');
const gameController = require('./controllers/gameController');
const userController = require('./controllers/userController');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', userController.checkLogin, gameController.showHomePage);
app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.post('/guess', gameController.makeGuess);
app.post('/new-game', gameController.newGame);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
