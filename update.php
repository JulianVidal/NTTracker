<?php
    $host = 'localhost';
    $user = 'id8086105_users';
    $password = '12345';
    $DBName = 'id8086105_users';

    $dsn = 'mysql:host=' . $host . '; dbname=' . $DBName;

    $pdo = new PDO($dsn, $user, $password);

    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $steamID = $_GET['steamID'];
    $loop = $_GET['loop'];
    $world = $_GET['world'];
    $level = $_GET['level'];

    $sql = 'UPDATE `Users` SET `Loops` = :loop, `World` = :world, `Level` = :level  WHERE SteamID = :steamID';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['loop' => $loop, 'world' => $world, 'level' => $level, 'steamID' => $steamID]);


