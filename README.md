# <img width="30" height = "30" alt="Play Screen" src="publicimg/../public/img/icons/balloon_256.png"> Birthday Theme Dot Game

## [Live Demo via Glitch](https://bvasilop-birthday-theme-dot-game.glitch.me/)

## Overview

This a birthday themed dot game that was created using a mobile-first approach while utilizing traditional JavaScript and SCSS. It manipulates the DOM with state and class-based components and easily allows for updating, editing and scalability. It is also a PWA (Progressive Web Application) that caches all resources to the browser and can be played completely offline in the event of a disconnected mobile network. 😆

## Set Up

### Requirements

- [Node](https://nodejs.org/en/) (ver. 10)

### Launch App Locally

```
$ git clone <repo>
$ cd <root>
$ npm install
$ npm run start
```

Note: port number is randomly generated so check console

## Game Objectives

1. Click **Start Game**
2. Try to pop balloons, presents, cupcakes or party hats for points!
3. If items make it past the bottom of the screen you lose points, so act quickly!
4. Game ends when the timer runs out!

## UX Process

### User wants/needs

I started my process by thinking about what a user playing this game might want and came up with the following list of items:

A user:

- wants to play a mobile or desktop game that is simple and fun to play
- wants to make it accessible for visually impaired users by making buttons and items easy to locate and click
- wants the user interface to be easy to locate and use with easily identifiable buttons and clickable items.
- wants the user experience to be fun by creating a birthday theme with corresponding colors and images
- wants to be able to play game offline if user is in an area with a low quality mobile network.

### Whiteboard Mockup

<img width="750" alt="Wireframing board" src="public/img/readme/dot-game-mockup.png">

### Design goals

- Create easily identifiable icons, buttons and objects that can be clicked effortlessly
- Create a fun and inviting user experience by utilizing bright colors with high background contrast and common birthday themed shapes.
- Allow smooth game play and state management with start, pause, reset and speed adjustment functionality.
- Allow points to be added to score for clicking items before disappearing from screen and points deducted for not clicking items before being removed from the DOM.
- Create a red countdown timer for final 10 seconds of game play to cue player that the end is imminent!
- Create zooming effect for clickable items (desktop only) to assist visually impaired users.

### State Flow created with Sketch

<img width="1000" alt="Sketch board" src="public/img/readme/dot-game-sketch.png">

## Implementation

A short guide to my development process and how I decided to implement this project.

### GameController Class

I wanted to make this game simple yet scalable so it's possible to easily generate new games based on an abstract class. This class, although simple, contains essential properties and methods that each new game can inherit, especially if more games were eventually added. This allows multiple games to be hooked up while also preserving the UI components and logic of each individual game.

### DotGame Class

Extended from the GameController class, this class defines the default configuration and UI of the Dot game. By passing a GAME_CONFIG object to the constructor, new instances can be customized. For example:

```javascript
const DOT_GAME_CONFIG = {
  name: "Dot Game",
  scoreStart: 0,
  timerStart: 60,
  dotSpeed: 65
};
```

### State-Based Components

Even without using a framework like React, it is possible to code state based components in vanilla JS, which makes code more functional while also simplifying UI interactions and DOM manipulations greatly! Here is a proof of concept on [JSFiddle](https://jsfiddle.net/shinjukudev/3sn15kcz/63/).

## Making the Game Interesting

To make the game more fun and interesting, I added the following features:

1. **Score** Players increase their score by clicking dots. If they miss dots, however, their score will be negatively impacted!
2. **Speed** As you click on dots, you'll notice the speed and difficulty gradually increase. Get too fast? Use the speed switch slider at the bottom to slow things down.
3. **Timer** I wanted to add a sense of urgency to make the game more interesting, so there is a countdown timer. When the timer reaches zero -- it's game over, man!

## Performance Reporting Screenshots

A few screeshots of performance and validation reports.

### W3c HTML validation report

<img width="467" alt="w3c_html_validation" src="https://user-images.githubusercontent.com/6524512/54403950-36c0c880-4715-11e9-867e-b3fb650318c1.png">

### Lighthouse performance report

<img width="871" alt="lighthouse_report" src="https://user-images.githubusercontent.com/6524512/54403954-3aece600-4715-11e9-9b11-2fb6deb83f14.png">

### Things to Improve

1. Even though the refresh rate is 60 frames per second, the falling birthday items could be less jittery if I manipulated the refresh rate further.
2. Add theming ability to change colors and object types through reusable classes and config settings.

3. Using webpack to bundle all html, css and JavaScript files.
