import GameController from './GameController.js';

import { score, gameOverContent, overlayContent } from './Components.js';

import { getRandomNumber } from './Helpers.js';

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

  // Game controls section

  bindEventListeners = () => {
    document.querySelector('#app').onclick = event => {
      const { action } = event.target.dataset;

      switch (action) {
        case 'start-game':
          this.startGame();
          break;
        case 'pause-game':
          this.pauseGame();
          break;
        case 'close-modal':
          if (this.GAME_OVER) {
            const content = `<div>
              <p>GAME OVER</p>
              <a href="/" class="button button--primary button--block">Play Again</a>
            </div>`;

            this.toggleOverlay('open', content);
          } else {
            this.resumeGame();
          }
          this.toggleModal('close');
          break;
        case 'resume-game':
          this.resumeGame();
          break;
        default:
      }
    };

    // Change game speed section
    this.domElements.speedSwitcher.oninput = input => {
      const updatedSpeed = parseInt(input.srcElement.value);
      this.config.dotSpeed = updatedSpeed;
    };
  };

  // Drawing each random item

  drawEachDot = () => this.addDot();

  // Game State Methods - start, pause, resume, end

  startGame = () => {
    document.querySelector('#js-start-dialog').classList.add('util__is-hidden');
    requestAnimationFrame(this.gameLoop.bind(this));
  };

  pauseGame = () => {
    this.onPause();

    this.domElements.pauseButton.classList.add('util__is-hidden');
    this.domElements.resumeButton.classList.remove('util__is-hidden');

    this.toggleOverlay('open', 'PAUSED');
  };

  resumeGame = () => {
    if (this.GAME_OVER) return false;

    this.onResume();
    this.toggleOverlay('close');

    this.domElements.resumeButton.classList.add('util__is-hidden');
    this.domElements.pauseButton.classList.remove('util__is-hidden');

    requestAnimationFrame(this.gameLoop.bind(this));
  };

  endGame = () => {
    this.onEnd();
    this.renderGameOverModal();
  };

  // Method for refresh rate

  getMovingRefreshRate = () =>
    Math.floor(this.config.refreshRate / this.config.dotSpeed);

  // Game Logic Methods

  // Adding dot items to screen

  addDot = () => {
    const dotImg = getRandomNumber(
      this.config.dotMinSize,
      this.config.dotMaxSize
    );
    const dot = document.createElement('div');
    const shape = this.config.dotShapes[
      Math.floor(Math.random() * this.config.dotShapes.length)
    ];
    dot.classList.add('dot', shape);
    dot.style.width = `${dotImg}px`;
    dot.style.height = `${dotImg}px`;
    dot.style.left = `${Math.abs(
      getRandomNumber(8, window.innerWidth - dotImg - 8)
    )}px`;
    dot.style.top = `${dotImg * -1}px`;

    this.domElements.gameArea.appendChild(dot);

    dot.onclick = event => {
      if (this.GAME_PAUSED || this.GAME_OVER) return false;

      this.updateScore(dotImg);
      this.domElements.gameArea.removeChild(event.srcElement);
    };
  };

  // Moving Items on screen

  moveDots = () => {
    document.querySelectorAll('.dot').forEach(dot => {
      const dotTop = parseInt(dot.style.top);

      // Remove dots that are outside game area

      if (dotTop > this.domElements.gameArea.offsetHeight) {
        this.updateScore(-50);
        this.domElements.gameArea.removeChild(dot);
      }

      // Animate motion of dots going down screen

      if (this.config.frames % 6 === 0) {
        dot.style.top = `${dotTop + this.config.dotSpeed / 10}px`;
      }
    });
  };

  drawDots = () => {
    if (this.config.frames === 1 || this.config.frames % 60 === 0) {
      this.drawEachDot();
    }
  };

  gameLoop = timestamp => {
    if (this.GAME_PAUSED || this.GAME_OVER) {
      return false;
    }

    const progress = timestamp - this.config.lastRender;

    this.updateGame(progress);
    this.drawDots();

    this.config.lastRender = timestamp;

    requestAnimationFrame(this.gameLoop.bind(this));
  };

  // Update Methods Section - Game, Timer, Score

  updateGame = progress => {
    this.config.frames += 1;
    this.moveDots();

    if (this.config.frames === 1 || this.config.frames % 60 === 0) {
      this.updateTimer();
    }
  };

  updateTimer = () => {
    let timerOutput = (this.config.timer -= 1);

    if (timerOutput < 1) {
      this.endGame();
    }

    this.config.timer = timerOutput;

    if (timerOutput < 10) {
      timerOutput = `0${timerOutput}`;
      document.querySelector('#js-game-timer').style.color = 'red';

      // Flash for less than 10 seconds

      // setTimeout(function() {
      //   if (
      //     document.querySelector('js-game-timer').style.display === 'initial'
      //   ) {
      //     document.querySelector('js-game-timer').style.display = 'none';
      //   } else {
      //     document.querySelector('js-game-timer').style.display = 'initial';
      //   }
      // }, 1000);
    }

    this.domElements.gameTimer.innerHTML = `00:${timerOutput}`;
  };

  updateScore = amount => {
    const points = parseInt(100 / amount);
    const newScore = (this.config.score += points);
    this.config.score = newScore;

    this.renderScore(points);
  };
}

const dotGame = new DotGame(DOT_GAME_CONFIG);
