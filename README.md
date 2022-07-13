# chess-game

A web component for displaying chess games.

Chessboard functionality is provided by [gchessboard](https://github.com/mganjoo/gchessboard).
This web component adds *next* and *previous* buttons and the list of moves on the side.

This is my first javascript project.
I started it in order to learn web components.
It might not adhere to the best practices.

Not recommended for production use yet.

## Usage

Download `index.js`, in the same directory create a file `index.html` with the following HTML code, and start a web server (e.g. `python -m http.server 8080`).

The following HTML snippet only works on Chrome (because of *importmap*).

```html
<html>
  <head>
    <script type="importmap">
      {
        "imports": {
          "chess.js": "https://cdn.skypack.dev/chess.js"
        }
      }
    </script>
    <script type="module" src="https://cdn.skypack.dev/gchessboard"></script>
    <script type="module" src="/index.js"></script>
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
