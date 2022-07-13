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

The following HTML snippet only works on Chrome (because of *importmap*).

You can make it work on Firefox by downloading `index.js` and `https://unpkg.com/chess.js` to the root directory of your web server, and modify `index.js` to import `chess.js` like this: `import { Chess } from './chess.js'`

```html
<html>
  <head>
    <script type="importmap">
      {
        "imports": {
          "chess.js": "https://unpkg.com/chess.js"
        }
      }
    </script>
    <script type="module" src="https://unpkg.com/gchessboard"></script>
    <script type="module" src="https://unpkg.com/chess-game"></script>
  </head>
  <body>
    <chess-game pgn="1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Na5 6.Bb5+ c6 7.dxc6 bxc6 8.Qf3 Rb8"></chess-game>
  </body>
</html>
```

## Contributing

Bug reports, bug fixes, and UI improvements, are welcome.
New features should be discussed first.

## License

Copyright (C) 2022 Charalampos Mitsakis

This software is licensed under the terms of the [Apache License, Version 2.0](LICENSE)
