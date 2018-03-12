<html>
  <head>
    <title>orbit</title>
    <?php
      foreach(glob("js/*.js") as $file) {
        echo "<script src='$file'></script>\r";
      }
    ?>
  </head>
  <body>
    <a href='#' onclick="game.requestFullScreen()">Fullscreen</a>
    <script>
      var game = new Game();
      game.loop();
    </script>
  </body>
</html>
