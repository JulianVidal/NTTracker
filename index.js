let id;
let key;

let URL;
let data;

let death = false;

let previous_current = Math.round((new Date()).getTime() / 1000);
let current_time = Math.round((new Date()).getTime() / 1000);

let enemyIDs;
let characterIDs;

function loadJSON(url, callback) {
    const obj = new XMLHttpRequest();
    obj.overrideMimeType("JSON");
    obj.open('GET', url, true);
    obj.onreadystatechange = function () {
        if (obj.readyState === 4 && obj.status == "200") {
            console.log("FILE has loaded");
            callback(obj.responseText);
        }
    };

    obj.send(null);
}

loadJSON( 'JSON/enemy.json', data => enemyIDs = JSON.parse(data) );
loadJSON( 'JSON/character.json', data => characterIDs = JSON.parse(data) );

function redirect() {
    id = document.getElementById('steamID64').value;
    key = document.getElementById('streamKey').value;

    window.location  = `tracker.php?steamID64=${id}&streamKey=${key}`;
}

function credentials(steamID64, streamKey) {
    id = steamID64;
    key = streamKey;
    URL = `https://tb-api.xyz/stream/get?s=${id}&key=${key}`;

    setInterval( getData, 1000);
}

async function getData() {
    const response = await fetch(URL);
    data = await response.json();

    if (data.current) {

        display_current();
    } else {
        death = true;
        previous_current = current_time;
        display_currentNothing();
    }

    if (data.previous) {
        // console.log(current - data.previous.timestamp);
       //console.log(current.getTime() - start.getTime());

        display_last();
    } else {
        display_lastNothing();
    }

}

function display_current() {

    let start = data.current.timestamp;

    let timeDifference = current_time - start;
    let minutes = Math.floor(timeDifference / 60);
    let seconds = timeDifference % 60;

    if ((seconds == 1 || seconds == 0) && minutes == 0 && !death) {
        previous_current = current_time;
    } else {
        death = false;
    }

    current_time = Math.round((new Date()).getTime() / 1000);

    start = data.current.timestamp;

    timeDifference = current_time - start;
    minutes = Math.floor(timeDifference / 60);
    seconds = timeDifference % 60;

    const current_world = data.current.world;
    const current_worldLevel = data.current.level;
    const current_loop = data.current.loops;
    const current_level = data.current.charlvl;
    const current_kills = data.current.kills;
    const current_type = data.current.type;

    const currentTimeElement = document.getElementById("current-time");
    currentTimeElement.textContent = `Time: ${minutes} : ${seconds}`;

    const currentWorldElement = document.getElementById("current-world");
    currentWorldElement.textContent = `World: ${current_world} - ${current_worldLevel}`;

    const currentLoopElement = document.getElementById("current-loop");
    currentLoopElement.textContent = `Loop: ${current_loop}`;

    const currentLevelElement = document.getElementById("current-level");
    currentLevelElement.textContent = `Level: ${current_level}`;

    const currentKillsElement = document.getElementById("current-kills");
    currentKillsElement.textContent = `Kills: ${current_kills}`;

    const currentTypeElement = document.getElementById("current-type");
    currentTypeElement.textContent = `Type: ${current_type}`;

}

function display_last() {
    const start = data.previous.timestamp;
    const timeDifference = previous_current - start;
    const minutes = Math.floor(timeDifference / 60);
    const seconds = timeDifference % 60;

    const last_world = data.previous.world;
    const last_worldLevel = data.previous.level;
    const last_loop = data.previous.loops;
    const last_level = data.previous.charlvl;
    const last_kills = data.previous.kills;
    const last_type = data.previous.type;
    const enemyID = data.previous.lasthit;
    const enemyName = enemyIDs[enemyID]["Enemy name"];
    const charID = data.previous.char;
    const charName = characterIDs[charID]["Character"];

    const lastTimeElement = document.getElementById("last-time");
    lastTimeElement.textContent = `Time: ${minutes} : ${seconds}`;

    const lastWorldElement = document.getElementById("last-world");
    lastWorldElement.textContent = `World: ${last_world} - ${last_worldLevel}`;

    const lastLoopElement = document.getElementById("last-loop");
    lastLoopElement.textContent = `Loop: ${last_loop}`;

    const lastLevelElement = document.getElementById("last-level");
    lastLevelElement.textContent = `Level: ${last_level}`;

    const lastKillsElement = document.getElementById("last-kills");
    lastKillsElement.textContent = `Kills: ${last_kills}`;

    const lastTypeElement = document.getElementById("last-type");
    lastTypeElement.textContent = `Type: ${last_type}`;

    const lastCharElement = document.getElementById("char");
    lastCharElement.textContent = `${charName}`;

    const lastEnemyElement = document.getElementById("enemy");
    lastEnemyElement.textContent = `${enemyName}`;
}

function display_currentNothing() {
    const currentTimeElement = document.getElementById("current-time");
    currentTimeElement.textContent = `Time:`;

    const currentWorldElement = document.getElementById("current-world");
    currentWorldElement.textContent = `World:`;

    const currentLoopElement = document.getElementById("current-loop");
    currentLoopElement.textContent = `Loop:`;

    const currentLevelElement = document.getElementById("current-level");
    currentLevelElement.textContent = `Level:`;

    const currentKillsElement = document.getElementById("current-kills");
    currentKillsElement.textContent = `Kills:`;

    const currentTypeElement = document.getElementById("current-type");
    currentTypeElement.textContent = `Type:`;
}

function display_lastNothing() {
    const lastTimeElement = document.getElementById("last-time");
    lastTimeElement.textContent = `Time:`;

    const lastWorldElement = document.getElementById("last-world");
    lastWorldElement.textContent = `World:`;

    const lastLoopElement = document.getElementById("last-loop");
    lastLoopElement.textContent = `Loop:`;

    const lastLevelElement = document.getElementById("last-level");
    lastLevelElement.textContent = `Level:`;

    const lastKillsElement = document.getElementById("last-kills");
    lastKillsElement.textContent = `Kills:`;

    const lastTypeElement = document.getElementById("last-type");
    lastTypeElement.textContent = `Type:`;

    const lastCharElement = document.getElementById("char");
    lastCharElement.textContent = ``;

    const lastEnemyElement = document.getElementById("enemy");
    lastEnemyElement.textContent = ``;
}

