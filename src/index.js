/* eslint-disable no-unused-vars */
import style from "./style.css";
import domModule from "./DOM-modules/dom-module";
import gameboardFactory from "./factory-fns/gameboard-factory";
import playerFactory from "./factory-fns/player-factory";

const playerGameboard = gameboardFactory();
playerGameboard.placeShip("carrier", [0, 0]);
playerGameboard.placeShip("battleship", [0, 2]);
playerGameboard.placeShip("crusier", [0, 4]);
playerGameboard.placeShip("submarine", [0, 6]);
playerGameboard.placeShip("destroyer", [0, 8]);
playerGameboard.receiveAttack([0, 0]);
playerGameboard.receiveAttack([0, 0]);
playerGameboard.receiveAttack([9, 9]);
playerGameboard.receiveAttack([8, 8]);
const aiGameboard = gameboardFactory();
const dom = domModule();

dom.generateBasic();
dom.renderPlayerGameboard(playerGameboard);
// dom.renderAIGameboard(aiGameboard);
