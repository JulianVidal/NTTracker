<?php
$host = 'localhost';
$user = 'id8086105_users';
$password = '12345';
$DBName = 'id8086105_users';

$dsn = 'mysql:host=' . $host . '; dbname=' . $DBName;

$pdo = new PDO($dsn, $user, $password);

$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$stmt = $pdo->query('SELECT * FROM Users ');


while ($row = $stmt->fetch()) {
    foreach ($row as $item) {
        echo $item . '<br>';
    }
}


/*$steamID64 = $_GET['steamID64'];
$streamKey = $_GET['streamKey'];

$sql = 'SELECT * FROM Users WHERE SteamID = ?';
$stmt = $pdo->prepare($sql);
$stmt->execute([$steamID64]);
$post = $stmt->fetch();

if ($post) {
    var_dump($post);
    echo $post['Loop'];
    $best_loop = $post['Loop'];
    $best_world = $post['World'];
    $best_level = $post['Level'];


    $script = "
    <script>
    best_loop = '$best_loop';
    best_world = '$best_world';
    best_level = '$best_level';
    </script>
    ";

    echo $script;
}*/
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel='shortcut icon' type='image/png' href='icon.png' />
    <link rel="stylesheet" type="text/css" href="style-lastRun.css" >
    <script src="index.js"> </script>
    <script>
        window.onload = () => {
          let bannerNode = document.querySelector('[alt="www.000webhost.com"]').parentNode.parentNode;
          bannerNode.parentNode.removeChild(bannerNode);
        };
        last = true;
    </script>
    <title>Last Run Tracker</title>
</head>
<body>


<?php
   $steamID64 = $_GET['steamID64'];
   $streamKey = $_GET['streamKey'];
   $darkMode = $_GET['darkMode'];

   echo "<script> credentials('$steamID64', '$streamKey'); darkMode = $darkMode</script>";
?>

<div class="tracker" id="tracker">

    <h1 class="title" style=""> Last Run </h1>

    <div class="last">
        <h1 id="last-time">Time:</h1>
        <h1 id="last-world"> World:</h1>
        <h1 id="last-loop">Loop:</h1>
        <h1 id="last-level">Level:</h1>
        <h1 id="last-kills">Kills:</h1>
        <h1 id="last-type">Type:</h1>

        <h1 id="last-char">Character:

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

        <h1 id="best-run">Best Run: </h1>
</div>

        <div class="current">
            <h1 id="current-time">Time:</h1>
            <h1 id="current-world">World:</h1>
            <h1 id="current-loop">Loop:</h1>
            <h1 id="current-level">Level:</h1>
            <h1 id="current-kills">Kills:</h1>
            <h1 id="current-type">Type:</h1>
        </div>

</body>
</html>
