function renderLoginPage(errorMessage = '') {
    const errorHtml = errorMessage ? `<p class="error">${errorMessage}</p>` : '';
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="window">
          <h1>Login</h1>
          ${errorHtml}  
          <form method="POST" action="/login">
            <label for="username">Enter your username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
            <button class="log-in-btn" type="submit">Login</button>
          </form>
        </div>
      </body>
      </html>
    `;
}
function renderHomePage(username, words, guesses, guessCount, message, won, personalStats, globalStats, leaderboard) {

  const guessListHtml = guesses.map(guess => 
      `<li>${guess.word} - ${guess.matchingLetters} matching letters</li>`
  ).join('');  

  const wordListHtml = words.map(word => `<li>${word}</li>`).join('');

 
  const personalStatsHtml = `
  <div class="stats-p">
      <h2>Your Stats</h2>
      <ul class="data-personal">
          <li>Completed Games: ${personalStats.totalGamesCompleted}</li>
          <li>Best Guess (Min): ${personalStats.minGuesses === Infinity ? 'N/A' : personalStats.minGuesses}</li>
          <li>Worst Guess (Max): ${personalStats.maxGuesses}</li>
          <li>Average Guesses: ${personalStats.totalGamesCompleted > 0 ? personalStats.averageGuesses.toFixed(2) : 'N/A'}</li>
      </ul>
  </div>
  `;

  
  const globalStatsHtml = `
      <div class="stats-g">
      <h2>Global Stats</h2>
      <ul class="data-global">
          <li>Total Games Played: ${globalStats.totalGamesPlayed}</li>
          <li>Total Games Completed: ${globalStats.totalGamesCompleted}</li>
          <li>Best Player: ${globalStats.bestPlayer || 'N/A'}</li>
          <li>Best Guess (Min): ${globalStats.minGuesses === Infinity ? 'N/A' : globalStats.minGuesses}</li>
          <li>Worst Guess (Max): ${globalStats.maxGuesses}</li>
      </ul>
  </div>
  `;

const leaderboardHtml = `
    <div class="leaderboard">
      <h2>Leaderboard</h2>
      
      <ol>
          ${leaderboard
              .map((player, index) => `
              <li>
                  <span class="rank">${index + 1}</span>
                  <div class="name">
                      <div class="shield"></div>
                      ${player.username}
                  </div>
                  <span class="score">${player.minGuesses === Infinity ? 'N/A' : player.minGuesses}</span>
              </li>
          `).join('')}
      </ol>
    </div>
  `;





 
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Word Guessing Game</title>
      <link rel="stylesheet" href="/home.css">
    </head>
    <body>
      <h1>Welcome to the Word Guessing Game, ${username}!</h1>
      
      <div class="words">
      <h2>Possible Words</h2>
      <ul>
        ${wordListHtml}
      </ul>
      </div>

      <div class="guesses">
      <h2>Your Guesses</h2>
      <ul>
        ${guessListHtml}
      </ul>

      <p class="guess-message">You have made ${guessCount} valid guesses.</p>

      ${message ? `<p class="message">${message}</p>` : ''}


      <form action="/guess" method="POST">
        <label for="guess">Enter your guess:</label>
        <input type="text" name="guess" required>
        <button type="submit">Submit Guess</button>
      </form>

      <form action="/new-game" method="POST">
        <button type="submit">Start New Game</button>
      </form>
      </div>

      ${personalStatsHtml}
      ${globalStatsHtml}
      ${leaderboardHtml}

      <form action="/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </body>
    </html>
  `;
}


function renderErrorPage(errorMessage, link) {
    return `
      <html>
      <head>
        <title>Error</title>
        <style>
          .error { color: red; }
        </style>
      </head>
      <body>
        <h1>Error</h1>
        <p class="error">${errorMessage}</p>
        <p><a href="${link}">Go back to the login form</a></p>
      </body>
      </html>
    `;
}

module.exports = { renderLoginPage, renderHomePage, renderErrorPage };
