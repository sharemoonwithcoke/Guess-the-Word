const words = require('../words');
const userModel = require('./userModel');  


const games = {};


const globalStatistics = {
    totalGamesPlayed: 0,      
    totalGamesCompleted: 0,   
    minGuesses: Infinity,     
    maxGuesses: 0,            
    bestPlayer: null         
};


const personalStatistics = {};


function initializePersonalStatistics(username) {
    if (!personalStatistics[username]) {
        personalStatistics[username] = {
            totalGamesPlayed: 0,        
            totalGamesCompleted: 0,    
            minGuesses: Infinity,     
            maxGuesses: 0,            
            totalGuesses: 0,          
            averageGuesses: 0          
        };
    }
}


exports.startNewGame = (username) => {
    const secretWord = words[Math.floor(Math.random() * words.length)];  
    games[username] = {
        secretWord: secretWord,   
        guesses: [],              
        guessCount: 0,           
        won: false,               
        message: ''               
    };

    
    initializePersonalStatistics(username);

   
    personalStatistics[username].totalGamesPlayed++;
    globalStatistics.totalGamesPlayed++;

    
    console.log(`User "${username}" started a new game. Secret word is "${secretWord}".`);
};


exports.getGameState = (username) => {
    
    if (!games[username]) {
        this.startNewGame(username);
    }
    return games[username];
};


exports.makeGuess = (username, guess) => {
    const game = games[username];  
    const guessLower = guess.toLowerCase(); 

  
    if (game.guesses.some(g => g.word === guessLower)) {
        game.message = `You've already guessed "${guess}"`;
        return;
    }

    
    if (!words.includes(guessLower)) {
        game.message = `"${guess}" is not a valid word.`;
        return;
    }

  
    const matchingLetters = countMatchingLetters(guessLower, game.secretWord.toLowerCase());
    game.guesses.push({ word: guessLower, matchingLetters });  
    game.guessCount++;

   
    if (guessLower === game.secretWord.toLowerCase()) {
        game.won = true;
        game.message = 'Congratulations! You guessed the word!';

     
        const personalStats = personalStatistics[username];
        personalStats.totalGamesCompleted++;
        personalStats.totalGuesses += game.guessCount;
        personalStats.averageGuesses = personalStats.totalGuesses / personalStats.totalGamesCompleted;

        if (game.guessCount < personalStats.minGuesses) {
            personalStats.minGuesses = game.guessCount;
        }
        if (game.guessCount > personalStats.maxGuesses) {
            personalStats.maxGuesses = game.guessCount;
        }

       
        globalStatistics.totalGamesCompleted++;
        if (game.guessCount < globalStatistics.minGuesses) {
            globalStatistics.minGuesses = game.guessCount;
            globalStatistics.bestPlayer = username;
        }
        if (game.guessCount > globalStatistics.maxGuesses) {
            globalStatistics.maxGuesses = game.guessCount;
        }

    } else {
       
        const matches = countMatchingLetters(guessLower, game.secretWord.toLowerCase());
        game.message = `"${guess}" has ${matches} matching letters.`;
    }
};



function countMatchingLetters(guess, secretWord) {
    const guessLetters = new Set(guess.split(''));
    const secretLetters = new Set(secretWord.split(''));
    let matches = 0;

    guessLetters.forEach(letter => {
        if (secretLetters.has(letter)) {
            matches++;
        }
    });

    return matches;
}


exports.getAvailableWords = () => words;


exports.getUsernameBySid = (sid) => {
    return userModel.getUsernameBySid(sid);
};


exports.getGlobalStatistics = () => {
    return globalStatistics;
};


exports.getPersonalStatistics = (username) => {
    initializePersonalStatistics(username);
    return personalStatistics[username];
};


exports.getAllPersonalStatistics = () => {
    return personalStatistics;
};


