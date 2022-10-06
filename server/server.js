const express = require("express");
const cors = require("cors");
const { getMonsterData, createMonster } = require("./ctrl/controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/monsterData", getMonsterData);
app.post("/api/post", createMonster);

app.listen(4004, () => console.log("Server running on 4004"));
