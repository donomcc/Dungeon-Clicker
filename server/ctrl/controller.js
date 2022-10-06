const monsters = require("../db.json");

let id = 15;

module.exports = {
  getMonsterData: (req, res) => {
    const { playerLvl } = req.query;
    const killableMonsters = monsters.filter(
      (monster) => monster.level <= playerLvl
    );
    let randomIndex = Math.floor(Math.random() * killableMonsters.length);
    let randomMonster = killableMonsters[randomIndex];
    res.status(200).send(randomMonster);
  },
  createMonster: (req, res) => {
    id++;
    const { name } = req.body;
    const { health } = req.body;
    const { level } = req.body;
    const { imageURL } = req.body;
    const monster = {
      id: id,
      health: health,
      name: name,
      level: level,
      imageURL: imageURL,
    };
    monsters.push(monster);
    res.status(200).send(monsters);
  },
};
