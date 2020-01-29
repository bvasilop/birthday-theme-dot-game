import GameController from './GameController.js';

const DOT_GAME_CONFIG = {
  name: 'Dot Game',
  scoreStart: 0,
  timerStart: 60,
  dotSpeed: 65,
};

// Component Class
class DotGame extends GameController {
  constructor(GAME_CONFIG) {
    super(GAME_CONFIG);

    this.config = {
      score: GAME_CONFIG.scoreStart || 0,
      timer: GAME_CONFIG.timerStart || 60,
      dotSpeed: GAME_CONFIG.dotSpeed || 10,
      dotMinSize: 25,
      dotMaxSize: 100,
      dotShapes: ['dot--balloon', 'dot--hat', 'dot--gift', 'dot--cupcake'],
      frames: 0,
      gameLoop: null,
      lastRender: 0,
      refreshRate: 1000,
    };

    this.domElements = {};

    this.gameInit();
  }

  // Caching Dom for game initialization

  cacheDom = () => {
    this.domElements = {
      startButton: document.querySelector('#js-control-start-game'),
      pauseButton: document.querySelector('#js-control-pause-game'),
      resumeButton: document.querySelector('#js-control-resume-game'),
      gameArea: document.querySelector('#js-game-area'),
      gameTimer: document.querySelector('#js-game-timer'),
      scoreBoard: document.querySelector('#js-score-board'),
      speedSwitcher: document.querySelector("[data-action='change-speed']"),
      modal: document.querySelector('#js-modal'),
      modalContent: document.querySelector('#js-modal-content'),
      overlay: document.querySelector('#js-game-overlay'),
    };
  };

  // Initialize Game

  gameInit = () => {
    this.cacheDom();
    this.bindEventListeners();

    // Initialize configuration defaults
    this.config.dotSpeed = parseInt(this.domElements.speedSwitcher.value);
  };
  // TODO: Add Game Controls Section

  // TODO: Add Change game speed section

  // TODO: Add Drawing each random item

  // TODO: Add Game State Methods - start, pause, resume, end

  // TODO: Add Method for refresh rate section

  // TODO: Add Game Logic Methods

  // TODO: Add Update Methods Section - Game, Timer, Score

  // TODO: Add Render screen content methods

  // TODO: Add Game Over Modal
}

const dotGame = new DotGame(DOT_GAME_CONFIG);
