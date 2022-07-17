# chess-game

A web component for displaying chess games.

Chessboard functionality is provided by [gchessboard](https://github.com/mganjoo/gchessboard).
This web component adds *next* and *previous* buttons and the list of moves on the side.

This is my first javascript project.
I started it in order to learn web components.
It might not adhere to the best practices.

Not recommended for production use yet.

![screenshot](../media/screenshot.png?raw=true)

## Usage

```html
<html>
  <head>
    <script async src="https://unpkg.com/es-module-shims/dist/es-module-shims.js"></script>
    <script type="importmap">
      {
        "imports": {
          "chess.js": "https://unpkg.com/chess.js@^0.13.3"
        }
      }
    </script>
    <script type="module" src="https://unpkg.com/gchessboard@^0.3.1"></script>
    <script type="module" src="https://unpkg.com/chess-game"></script>
  </head>
  <body>
    <chess-game pgn="1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Na5 6.Bb5+ c6 7.dxc6 bxc6 8.Qf3 Rb8"></chess-game>
  </body>
</html>
```

*es-module-shims.js* is needed because most browsers other than Chrome don't support *import map*.

### Without import map

You can remove *es-module-shims.js* and the *import map*:

```html
<html>
  <head>
    <script type="module" src="https://unpkg.com/gchessboard@^0.3.1"></script>
    <script type="module" src="/index.js"></script>
  </head>
  <body>
    <chess-game pgn="1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Na5 6.Bb5+ c6 7.dxc6 bxc6 8.Qf3 Rb8"></chess-game>
  </body>
</html>
```

In that case you have to download [index.js](index.js) and [chess.js](https://unpkg.com/chess.js@^0.13.3/chess.js) to the root directory of your web server,
and modify `index.js` to import `chess.js` like this: `import { Chess } from './chess.js'`.

### Autoplay

Users can enable/disable autoplay by clicking the autoplay button.

If you want autoplay to be enabled when the web page is loaded, you can use the `autoplay` attribute:

```html
    <chess-game autoplay pgn="1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Na5 6.Bb5+ c6 7.dxc6 bxc6 8.Qf3 Rb8"></chess-game>
```

By default autoplay makes 1 move per second, so the period is 1 second.
You can use the `autoplay-period` attribute to set the period in milliseconds:

```html
    <chess-game autoplay-period=1500 pgn="1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Na5 6.Bb5+ c6 7.dxc6 bxc6 8.Qf3 Rb8"></chess-game>
```

## Contributing

Bug reports, bug fixes, and UI improvements, are welcome.
New features should be discussed first.

## License

Copyright (C) 2022 Charalampos Mitsakis

This software is licensed under the terms of the [Apache License, Version 2.0](LICENSE)
