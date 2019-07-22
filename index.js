let id;
let key;

let URL;
let data;

let death = false;

let previous_current = Math.round((new Date()).getTime() / 1000);
let current_time = Math.round((new Date()).getTime() / 1000);

let last = true;

let darkMode = false;

let best_loop;
let best_world;
let best_level;


setup();

let enemyIDs;
let characterIDs;
let crownIDs;
let weaponIDs;
let mutationIDs;

async function setup() {
    let response;

    response = await fetch( 'JSON/enemy.json');
    enemyIDs = await response.json();

    response = await fetch( 'JSON/character.json');
    characterIDs = await response.json();

    response = await fetch( 'JSON/crown.json');
    crownIDs = await response.json();

    response = await fetch( 'JSON/weapon.json');
    weaponIDs = await response.json();

    response = await fetch( 'JSON/mutation.json');
    mutationIDs = await response.json();

    const doc = document.getElementsByTagName('html')[0];

    if (darkMode) {

        doc.style.color = '#FFFFFF';
        doc.style.backgroundColor = '#000000';

    } else {

        doc.style.color = '#000000';
        doc.style.backgroundColor = '#FFFFFF';

    }

    document.getElementById('tracker').width = window.innerWidth;
}

function redirect(file) {
    if (document.getElementById('darkMode').checked) {
        darkMode = false;
    }
    id = document.getElementById('steamID64').value;
    key = document.getElementById('streamKey').value;

    window.location  = `${file}?steamID64=${id}&streamKey=${key}&darkMode=${darkMode}`;
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

    if (!data.current) {
        death = true;
        previous_current = current_time;
    }

    display_current();
    display_last();

    const trackerDiv = document.getElementById('tracker');
    let trackerHeight = trackerDiv.getBoundingClientRect().height;
    let trackerFont = parseInt(window.getComputedStyle(trackerDiv, null).getPropertyValue('font-size'));

    while (trackerHeight < window.innerHeight - 90) {
        trackerHeight = trackerDiv.getBoundingClientRect().height;
        trackerFont = parseInt(window.getComputedStyle(trackerDiv, null).getPropertyValue('font-size'));
        trackerDiv.style.fontSize = (trackerFont + 1) + 'px';
    }

    while (trackerHeight > window.innerHeight) {
        trackerHeight = trackerDiv.getBoundingClientRect().height;
        trackerFont = parseInt(window.getComputedStyle(trackerDiv, null).getPropertyValue('font-size'));
        trackerDiv.style.fontSize = (trackerFont - 1) + 'px';
    }


}

function display_current() {

    let current_world = "";
    let current_worldLevel = "";
    let current_loop = "";
    let current_level = "";
    let current_kills = "";
    let current_type = "";
    let minutes = "";
    let seconds = "";

    if (data.current) {

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

         current_world = data.current.world;
         current_worldLevel = data.current.level;
         current_loop = data.current.loops;
         current_level = data.current.charlvl;
         current_kills = data.current.kills;
         current_type = data.current.type;

        const currentTimeElement = document.getElementById("current-time");
        currentTimeElement.textContent = `Time: ${minutes} : ${seconds}`;

        const currentWorldElement = document.getElementById("current-world");
        currentWorldElement.textContent = `World: ${current_world} - ${current_worldLevel}`;
    } else {

        const currentTimeElement = document.getElementById("current-time");
        currentTimeElement.textContent = `Time: `;

        const currentWorldElement = document.getElementById("current-world");
        currentWorldElement.textContent = `World: `;
    }



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

    let last_world = "";
    let last_worldLevel = "";
    let last_loop  = "";
    let last_level = "";
    let last_kills = "";
    let last_type  = "";
    let enemyName  = "";
    let charName   = "";
    let crownName  = "";
    let wepAName   = "";
    let wepBName   = "";

    if (data.previous) {

        const start = data.previous.timestamp;
    const timeDifference = previous_current - start;
    const minutes = Math.floor(timeDifference / 60);
    const seconds = timeDifference % 60;

     last_world = data.previous.world;
     last_worldLevel = data.previous.level;
     last_loop = data.previous.loops;
     last_level = data.previous.charlvl;
     last_kills = data.previous.kills;
     last_type = data.previous.type;

    const enemyID = data.previous.lasthit;
     enemyName = enemyIDs[enemyID]["Enemy name"];
    const charID = data.previous.char;
     charName = characterIDs[charID]["Character"];
     const crownID = data.previous.crown;
     crownName = crownIDs[crownID]["Crown"];
     const wepAID = data.previous.wepA;
     wepAName = weaponIDs[wepAID]["Gun name"];
     const wepBID = data.previous.wepB;
     wepBName = weaponIDs[wepBID]["Gun name"];

        const lastTimeElement = document.getElementById("last-time");
        lastTimeElement.textContent = `Time: ${minutes} : ${seconds}`;

        const lastWorldElement = document.getElementById("last-world");
        lastWorldElement.textContent = `World: ${last_world} - ${last_worldLevel}`;

if (last) {
    const mutationElement =  document.getElementById('mutations');
    while (mutationElement.hasChildNodes()) {
        mutationElement.removeChild(mutationElement.firstChild);
    }

    const mutationText = document.createElement('h1');
    mutationText.textContent = "Mutations: ";
    mutationElement.appendChild(mutationText);

    const mutationArr = data.previous.mutations.split("");
    for (i = 0; i < mutationArr.length; i++) {
        if (mutationArr[i] == 1) {
            addMutation(i);
        }
    }
    const lastCharImgElement = document.getElementById('char-img');
    if (data.previous.skin === 0) {
        lastCharImgElement.setAttribute('src', `image/character/${charName}.png`);
    }  else {
        lastCharImgElement.setAttribute('src', `image/character/${charName}B.png`);
    }

    const lastEnemyImgElement = document.getElementById('enemy-img');
    lastEnemyImgElement.setAttribute('src', `image/enemy/${enemyName}.gif`);

    if (wepAID !== 0) {
        const lastWepAImgElement = document.getElementById('wepA-img');
        lastWepAImgElement.setAttribute('src', `image/weapon/${wepAName}.png`);
    }

    if (wepBID !== 0) {
        const lastWepBImgElement = document.getElementById('wepB-img');
        lastWepBImgElement.setAttribute('src', `image/weapon/${wepBName}.png`);
    }

    const lastCrownBImgElement = document.getElementById('crown-img');
    lastCrownBImgElement.setAttribute('src', `image/crown/${crownName}.png`);


}
    } else {
        const lastTimeElement = document.getElementById("last-time");
        lastTimeElement.textContent = `Time: `;

        const lastWorldElement = document.getElementById("last-world");
        lastWorldElement.textContent = `World: `;

        if (last) {
            const lastCharImgElement = document.getElementById('char-img');
            lastCharImgElement.setAttribute('src', ``);

            const lastEnemyImgElement = document.getElementById('enemy-img');
            lastEnemyImgElement.setAttribute('src', ``);

            const lastWepAImgElement = document.getElementById('wepA-img');
            lastWepAImgElement.setAttribute('src', ``);

            const lastWepBImgElement = document.getElementById('wepB-img');
            lastWepBImgElement.setAttribute('src', ``);

            const lastCrownBImgElement = document.getElementById('crown-img');
            lastCrownBImgElement.setAttribute('src', ``);

            const mutationElement =  document.getElementById('mutations');
            while (mutationElement.hasChildNodes()) {
                mutationElement.removeChild(mutationElement.firstChild);
            }
            const mutationText = document.createElement('h1');
            mutationText.textContent = "Mutations: ";
            mutationElement.appendChild(mutationText);
        }
    }

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

    if (last) {
        const lastCrownElement = document.getElementById("crown");
        lastCrownElement.textContent = `${crownName}`;

        const lastWepAElement = document.getElementById("wepA");
        lastWepAElement.textContent = `${wepAName}`;

        if (wepBName !== weaponIDs[0]["Gun name"]) {
            const lastWepBElement = document.getElementById("wepB");
            lastWepBElement.textContent = `${wepBName}`;
        }
    }
}

function addMutation(index) {
    const parent = document.getElementById('mutations');

    const text = mutationIDs[index]["Mutation"];
    const childText = document.createElement('h1');
    childText.classList.add('name');
    childText.textContent = text;
    const childImg = document.createElement('img');
    childImg.setAttribute('src', `image/mutation/${text}.png`);
    childImg.classList.add('name');
    parent.appendChild(childImg);
}