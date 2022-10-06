const monsterContainer = document.querySelector("#monster-container");
const monsterHealth = document.querySelector("#health-counter");
const monsterImage = document.getElementById("monster-img");
const monsterName = document.querySelector("#monster-name");
const monsterLevel = document.querySelector("#monster-lvl");
const goldCounter = document.querySelector("#gold-counter");
const dpsCounter = document.querySelector("#dps-counter");
const attackBtn = document.querySelector("#attack-btn");
const autoBtn = document.querySelector("#auto-btn");
const atkpwrBtn = document.querySelector("#atkpwr-btn");
const atkPwrLvl = document.querySelector("#attack-pwr");
const playerLevel = document.querySelector("#player-lvl");
const form = document.querySelector("#form");
const mnstrName = document.querySelector("#mnstrname");
const level = document.querySelector("#monsterLvl");
const imageURL = document.querySelector("#img");
const health = document.querySelector("#health");
const shoutBtn = document.querySelector("#mybutton");
const title = document.querySelector("#title");

const baseURL = `http://localhost:4004/api/monsters`;

let monsterHp;
let gold = 0;
let monsterLvl;
let playerLvl = 1;
let attackDamage = 1;
let attacksPerSecond = 0;

//  Gets all monster data from back end
const getMonsterData = () => {
  axios
    .get(`http://localhost:4004/api/monsterData/?playerLvl=${playerLvl}`)
    .then((res) => {
      const data = res.data;
      monsterName.innerHTML = `<p>${data.name}</p>`;
      monsterLevel.innerHTML = `Monster Level: ${data.level}`;
      monsterHealth.innerHTML = `${data.health}HP`;
      monsterImage.src = data.imageURL;
      monsterLvl = data.level;
      monsterHp = +data.health;
    });
};

//  Adds monster
function submitHandler(e) {
  e.preventDefault();

  const npcName = mnstrName.value;
  const npcLevel = level.value;
  const npcHealth = health.value;
  const npcIMG = imageURL.value;

  axios
    .post("http://localhost:4004/api/post", {
      name: npcName,
      level: npcLevel,
      health: npcHealth,
      imageURL: npcIMG,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

getMonsterData();

attackBtn.addEventListener("click", () => {
  monsterHp -= +attackDamage;
  monsterHealth.innerHTML = `${monsterHp}HP`;
});

autoBtn.addEventListener("click", () => {
  if (gold < 150) {
    alert("You do not have enough gold");
  } else {
    gold -= 150;
    attacksPerSecond -= 1;
    goldCounter.innerHTML = `${gold}GP`;
  }
});

atkpwrBtn.addEventListener("click", () => {
  if (gold < 75) {
    alert("You do not have enough gold");
  } else {
    gold -= 75;
    attackDamage++;
    atkPwrLvl.innerHTML = `Attack Power: ${attackDamage}`;
    goldCounter.innerHTML = `${gold}GP`;
  }
});

form.addEventListener("submit", submitHandler);

shoutBtn.addEventListener("click", () =>
  alert("Shoutout to Old School RuneScape for the monsters!")
);

function autoClicker() {
  monsterHp += +attacksPerSecond;
}

function updateTitle() {
  title.innerHTML = `Lvl:${playerLvl} GP:${gold} - Dungeon Clicker`;
}

function checkHealth() {
  if (monsterHp <= 0) {
    monsterHp = 0;
    playerLvl++;
    playerLevel.innerHTML = `Player Level: ${playerLvl}`;
    gold += monsterLvl * 1;
    goldCounter.innerHTML = `${gold}GP`;
    getMonsterData();
  }
}

window.setInterval(() => {
  autoClicker();
  monsterHealth.innerHTML = `${monsterHp}HP`;
}, 1000);

window.setInterval(() => {
  checkHealth();
  updateTitle();
}, 200);
