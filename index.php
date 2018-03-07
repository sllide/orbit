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
    <script>
      var game = new Game();
      game.loop();
    </script>
  </body>
</html>
