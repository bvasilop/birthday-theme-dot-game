// created GameController class for handling props and functionality for new games

class GameController {
  constructor(GAME_CONFIG) {
    // Game configuration
    this.NAME = GAME_CONFIG.name || null;

    // Game state
    this.GAME_STARTED = false;
    this.GAME_PAUSED = false;
    this.GAME_OVER = false;
  }

  // game state methods

  onStart = () => {
    this.GAME_STARTED = true;
    console.log('GAME: started');
    // handles state when game is started
  };

  onPause = () => {
    this.GAME_PAUSED = true;
    console.log('GAME: paused');
    // handles state when game is paused
  };

  onResume = () => {
    this.GAME_PAUSED = false;
    console.log('GAME: resumed');
  };

  onEnd = () => {
    this.GAME_OVER = true;
    this.cleanUpGameBoard();
  };

  // helper methods for game

  cleanUpGameBoard = () => {
    const els = document.querySelectorAll(
      "[data-action='remove-on-game-over']"
    );

    for (const el of els) {
      el.outerHTML = '';
    }
  };

  isGameOver = () => {
    if (this.GAME_OVER) {
      return true;
    }
    return false;
  };
}

export default GameController;
