// Copyright (C) 2022 Charalampos Mitsakis
// Licensed under the Apache License, Version 2.0

import { Chess } from 'chess.js'

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <div style="display: table; width: 40em; float: left;">
      <g-chess-board id="board" fen="start"></g-chess-board>
      <div style="display: flex; justify-content: space-evenly;">
        <button id="prev" style="margin: 1em; padding: 0.7em; font-size: 130%; font-weight: bold;">
          &#60;&#60; Previous Move
        </button>
        <button id="next" style="margin: 1em; padding: 0.7em; font-size: 130%; font-weight: bold;">
          Next Move &#62;&#62;
        </button>
      </div>
    </div>
    <div style="float: left;">
      <ul id="moves">
      </ul>
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
      if (i+1 === currentPositionIndex) {
        movesHtmlArray.push('<li style="font-size: 130%; font-weight: bold; outline: 2px solid #000;">' + move + '</li>');
      } else {
        movesHtmlArray.push('<li style="font-size: 130%;">' + move + '</li>');
      }
    });
    this.shadowRoot.getElementById('moves').innerHTML = movesHtmlArray.join('\n');
  }
}

customElements.define('chess-game', ChessGame);
