const gameModel = require('../models/gameModel');
const { renderHomePage } = require('../views/view');

exports.showHomePage = (req, res) => {
    const username = gameModel.getUsernameBySid(req.cookies.sid);
    if (!username) {
        return res.redirect('/login');
    }

    const gameState = gameModel.getGameState(username);
    const personalStats = gameModel.getPersonalStatistics(username);
    const globalStats = gameModel.getGlobalStatistics();

  
    const allPersonalStats = gameModel.getAllPersonalStatistics();
    
   
    const leaderboard = Object.keys(allPersonalStats).map(user => ({
        username: user,
        minGuesses: allPersonalStats[user].minGuesses
    })).sort((a, b) => {
     
        if (a.minGuesses === Infinity) return 1;
        if (b.minGuesses === Infinity) return -1;
        return a.minGuesses - b.minGuesses;
    });

    const html = renderHomePage(
        username,
        gameModel.getAvailableWords(),
        gameState.guesses,
        gameState.guessCount,
        gameState.message,
        gameState.won,
        personalStats,
        globalStats,
        leaderboard
    );
    res.send(html);
};

exports.makeGuess = (req, res) => {
    const username = gameModel.getUsernameBySid(req.cookies.sid);
    if (!username) {
        return res.redirect('/login');
    }

    const guess = req.body.guess;
    if (!guess) {
        return res.redirect('/');
    }

    gameModel.makeGuess(username, guess);
    return res.redirect('/');
};

exports.newGame = (req, res) => {
    const username = gameModel.getUsernameBySid(req.cookies.sid);
    if (!username) {
        return res.redirect('/login');
    }

    gameModel.startNewGame(username);
    return res.redirect('/');
};
