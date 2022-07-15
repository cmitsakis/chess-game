// Copyright (C) 2022 Charalampos Mitsakis
// Licensed under the Apache License, Version 2.0

import { Chess } from 'chess.js'

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
      <div id="moves-scroll" style="width: 8em; max-height: 22em; margin: 0.5em; overflow: auto; scroll-behavior: smooth;">
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
  }

  _next() {
    if (this.currentPositionIndex >= this.positions.length - 1) {
      return;
    }
    this.update(++this.currentPositionIndex);
  }

  _prev() {
    if (this.currentPositionIndex <= 0) {
      return;
    }
    this.update(--this.currentPositionIndex);
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
  }
}

customElements.define('chess-game', ChessGame);
