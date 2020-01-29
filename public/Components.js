export const score = (score, animClass) =>
  `<span class="game__score ${animClass}">${score}</span>`;

export const gameOverContent = score => {
  const scoreClass = score > 0 ? 'plus' : 'minus';

  return `
    <div class="summary__wrapper">
      <h2 class="summary__title">Game Over!</h2>
      <p class="summary__subtitle">You earned</p>
      <p class="summary__value ${scoreClass}">${score} <small>points</small></p>
      <a href="/" class="button button--primary button--block button--lg">
        Play Again
      </a>
    </div>
  `;
};

export const overlayContent = content =>
  `<span class="overlay__text">${content}</span>`;
