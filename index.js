// Copyright (C) 2022 Charalampos Mitsakis
// Licensed under the Apache License, Version 2.0

import { Chess } from 'chess.js'
import { GChessBoardElement } from 'gchessboard'

const template = document.createElement('template');
template.innerHTML = `
  <div style="display: inline-flex;">
    <div style="display: table; width: 25em;">
      <g-chess-board id="board" fen="start"></g-chess-board>
    </div>
    <div style="display: table; width: 8em;">
      <div style="display: flex; justify-content: space-evenly;">
        <button id="prev" style="font-size: 2em; font-weight: bold; padding: 0em 0.5em;">
          &#60;
        </button>
        <button id="next" style="font-size: 2em; font-weight: bold; padding: 0em 0.5em;">
          &#62;
        </button>
      </div>
      <div style="display: flex; justify-content: space-evenly; margin: 0.5em 0em 0em 0em;">
        <button id="btn-autoplay" style="font-size: 1em;">&#x25B6;</button>
        <button id="btn-flip" style="font-size: 1em;">&duarr;</button>
      </div>
      <div id="moves-scroll" style="width: 8em; max-height: 20em; margin: 0.5em; overflow: auto; scroll-behavior: smooth;">
        <table style="font-size: 1em;">
          <tbody id="moves"></tbody>
        </table>
      </div>
    </div>
  </div>`;

class ChessGame extends HTMLElement {
  constructor() {
    super();
    this.currentPositionIndex = 0;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // load pgn
    const game1 = new Chess();
    game1.load_pgn(this.getAttribute('pgn'));

    // calculate all positions
    const positions = [];
    const game2 = new Chess();
    positions.push(game2.fen());
    for(const move of game1.history()) {
      game2.move(move);
      positions.push(game2.fen());
    }
    this.positions = positions;

    this.history = game1.history();

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById('next').onclick = () => this._next();
    this.shadowRoot.getElementById('prev').onclick = () => this._prev();
    this.update(this.currentPositionIndex);

    this.autoplayEnabled = this.hasAttribute('autoplay');
    if (this.autoplayEnabled) {
      this._autoplayStart();
    }
    this.shadowRoot.getElementById('btn-autoplay').onclick = () => {
      this.autoplayEnabled = !this.autoplayEnabled;
      if (this.autoplayEnabled) {
        this._autoplayStart();
      }
    };

    if (this.hasAttribute('orientation')) {
      this.shadowRoot.getElementById('board').setAttribute('orientation', this.getAttribute('orientation'));
    }

    this.shadowRoot.getElementById('btn-flip').onclick = () => {
      const boardElement = this.shadowRoot.getElementById('board');
      const orientation = boardElement.getAttribute('orientation') || 'white';
      const flippedOrientation = (() => {
        if (orientation == 'white') {
          return 'black';
        } else {
          return 'white';
        }
      })();
      boardElement.setAttribute('orientation', flippedOrientation);
    };
  }

  _next() {
    this.autoplayEnabled = false;
    if (this.currentPositionIndex >= this.positions.length - 1) {
      return;
    }
    this.update(++this.currentPositionIndex);
  }

  _prev() {
    this.autoplayEnabled = false;
    if (this.currentPositionIndex <= 0) {
      return;
    }
    this.update(--this.currentPositionIndex);
  }

  _nextLoop() {
    if (!this.autoplayEnabled) {
      this._autoplayStop();
      return;
    }
    if (this.currentPositionIndex >= this.positions.length - 1) {
      this.currentPositionIndex = 0;
    } else {
      this.currentPositionIndex++;
    }
    this.update(this.currentPositionIndex);
  }

  _autoplayStart() {
    const autoplayPeriod = this.getAttribute('autoplay-period') || 1000;
    if (this.autoplayIntervalId) {
      clearInterval(this.autoplayIntervalId);
    }
    this.autoplayIntervalId = setInterval(() => this._nextLoop(), autoplayPeriod);
    this.shadowRoot.getElementById('btn-autoplay').innerHTML = '&#x25A0;';
  }

  _autoplayStop() {
    clearInterval(this.autoplayIntervalId);
    this.shadowRoot.getElementById('btn-autoplay').innerHTML = '&#x25B6;';
  }

  update(currentPositionIndex) {
    const currentPosition = this.positions[currentPositionIndex];
    this.shadowRoot.getElementById('board').setAttribute("fen", currentPosition);
    const movesHtmlArray = [];
    this.history.forEach(function (move, i) {
      if (i % 2 == 0) {
        movesHtmlArray.push('<tr>');
        movesHtmlArray.push('<td>' + (i+2)/2 + '.</td>');
      }
      if (i+1 === currentPositionIndex) {
        movesHtmlArray.push('<td id="current-move" style="outline: 2px solid #000;">' + move + '</td>');
      } else {
        movesHtmlArray.push('<td>' + move + '</td>');
      }
      if (i % 2 == 1) {
        movesHtmlArray.push('</tr>');
      }
    });
    this.shadowRoot.getElementById('moves').innerHTML = movesHtmlArray.join('\n');
    const currentMoveElement = this.shadowRoot.getElementById('current-move')
    if (currentMoveElement == null) {
      this.shadowRoot.getElementById('moves-scroll').scrollTop = 0;
    } else {
      this.shadowRoot.getElementById('moves-scroll').scrollTop = this.shadowRoot.getElementById('current-move').offsetTop - this.shadowRoot.getElementById('moves-scroll').offsetHeight / 2;
    }
    this.shadowRoot.getElementById('prev').disabled = currentPositionIndex == 0;
    this.shadowRoot.getElementById('next').disabled = currentPositionIndex == this.history.length;
  }
}

customElements.define('chess-game', ChessGame);
