<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel='shortcut icon' type='image/png' href='icon.png' />
    <link rel="stylesheet" type="text/css" href="style.css" >
    <script src="index.js"> </script>
    <script>
        window.onload = () => {
          let bannerNode = document.querySelector('[alt="www.000webhost.com"]').parentNode.parentNode;
          bannerNode.parentNode.removeChild(bannerNode);
        }
        last = false;
    </script>
</head>
<body>


<?php
   $steamID64 = $_GET['steamID64'];
   $streamKey = $_GET['streamKey'];

   echo "<script> credentials('$steamID64', '$streamKey');  </script>";
?>

<div class="tracker" id="tracker">
    <h1 class="title" style="margin-top: 50px;">Current Run: </h1>
    <div class="current">
        <h1 id="current-time">Time:</h1>
        <h1 id="current-world">World:</h1>
        <h1 id="current-loop">Loop:</h1>
        <h1 id="current-level">Level:</h1>
        <h1 id="current-kills">Kills:</h1>
        <h1 id="current-type">Type:</h1>
    </div>

    <h1 class="title" style="margin-top: 100px;"> Last Run: </h1>

    <div class="last">
        <h1 id="last-time">Time:</h1>
        <h1 id="last-world">World:</h1>
        <h1 id="last-loop">Loop:</h1>
        <h1 id="last-level">Level:</h1>
        <h1 id="last-kills">Kills:</h1>
        <h1 id="last-type">Type:</h1>

        <h1 id="last-char">Character:
            <br>
            <h1 id="char" class="name"></h1>
        </h1>

        <h1 id="last-enemy">Death:
             <h1 id="enemy" class="name"></h1>
        </h1>

    </div>
</div>

</body>
</html>
