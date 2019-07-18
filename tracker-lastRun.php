<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel='shortcut icon' type='image/png' href='icon.png' />
    <link rel="stylesheet" type="text/css" href="style-lastRun.css" >
    <script src="index.js"> </script>
    <script>
        window.onload = () => {
          let bannerNode = document.querySelector('[alt="www.000webhost.com"]').parentNode.parentNode;
          bannerNode.parentNode.removeChild(bannerNode);
        }
        last = true;
    </script>
</head>
<body>


<?php
   $steamID64 = $_GET['steamID64'];
   $streamKey = $_GET['streamKey'];

   echo "<script> credentials('$steamID64', '$streamKey');  </script>";
?>

<div class="tracker">

    <h1 class="title" style=""> Last Run </h1>

    <div class="last">
        <h1 id="last-time">Time:</h1>
        <h1 id="last-world"> World:</h1>
        <h1 id="last-loop">Loop:</h1>
        <h1 id="last-level">Level:</h1>
        <h1 id="last-kills">Kills:</h1>
        <h1 id="last-type">Type:</h1>as
           <br>
            <img id="char-img" class="image" src=""/>
            <h1 id="char" class="name"></h1>
        </h1>

        <h1 id="last-enemy">Death:
             <img id="enemy-img" class="image"  src=""/>
             <h1 id="enemy" class="name"></h1>
        </h1>

        <h1 id="last-crown">Crown:
            <img id="crown-img" class="image" style="width: 75px" src=""/>
            <h1 id="crown" class="name"></h1>
        </h1>

        <h1 id="last-weapon">Weapons:
            <img id="wepA-img" class="image-item" src=""/>
            <h1 id="wepA" class="name"></h1>

            <img id="wepB-img" class="image-item" src=""/>
            <h1 id="wepB" class="name"></h1>
        </h1>

        <div id="mutations">

        <h1 id="last-mutation">Mutations: </h1>

        </div>

    </div>
</div>

</body>
</html>
