/* eslint-disable no-unused-vars */
import style from "./style.css";
import domModule from "./DOM-modules/dom-module";
import gameboardFactory from "./factory-fns/gameboard-factory";
import playerFactory from "./factory-fns/player-factory";

const playerGameboard = gameboardFactory();
const aiGameboard = gameboardFactory();
const dom = domModule();

playerGameboard.placeShip("carrier", [0, 0]);
playerGameboard.placeShip("battleship", [0, 2]);
playerGameboard.placeShip("crusier", [0, 4]);
playerGameboard.placeShip("submarine", [0, 6]);
playerGameboard.placeShip("destroyer", [0, 8]);
playerGameboard.receiveAttack([0, 0]);
playerGameboard.receiveAttack([0, 0]);
playerGameboard.receiveAttack([9, 9]);
playerGameboard.receiveAttack([8, 8]);

aiGameboard.placeShip("carrier", [0, 0]);
aiGameboard.placeShip("battleship", [0, 2]);
aiGameboard.placeShip("crusier", [0, 4]);
aiGameboard.placeShip("submarine", [0, 6]);
aiGameboard.placeShip("destroyer", [0, 8]);
aiGameboard.receiveAttack([0, 0]);
aiGameboard.receiveAttack([0, 0]);
aiGameboard.receiveAttack([9, 9]);
aiGameboard.receiveAttack([8, 8]);

dom.generateBasic();
dom.renderGameboard(playerGameboard, "player");
dom.renderShips(playerGameboard, "player");

dom.renderGameboard(aiGameboard, "ai");
