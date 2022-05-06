/* eslint-disable no-unused-vars */
import style from "./style.css";
import domModule from "./DOM-modules/dom-module";
import gameboardFactory from "./factory-fns/gameboard-factory";
import playerFactory from "./factory-fns/player-factory";
import { qs } from "./utility-fns/utility-fns";

const playerGameboard = gameboardFactory();
const aiGameboard = gameboardFactory();
const dom = domModule();
const humanPlayer = playerFactory();
const ai = playerFactory();

playerGameboard.placeShip("carrier", [0, 0]);
playerGameboard.placeShip("battleship", [0, 2]);
playerGameboard.placeShip("crusier", [0, 4]);
playerGameboard.placeShip("submarine", [0, 6]);
playerGameboard.placeShip("destroyer", [0, 8]);
playerGameboard.receiveAttack([0, 0]);
playerGameboard.receiveAttack([0, 0]);
playerGameboard.receiveAttack([9, 9]);
playerGameboard.receiveAttack([8, 8]);
playerGameboard.receiveAttack([0, 8]);
playerGameboard.receiveAttack([1, 8]);

aiGameboard.placeShip("carrier", [0, 0]);
aiGameboard.placeShip("battleship", [0, 2]);
aiGameboard.placeShip("crusier", [0, 4]);
aiGameboard.placeShip("submarine", [0, 6]);
aiGameboard.placeShip("destroyer", [0, 8]);
aiGameboard.receiveAttack([0, 0]);
aiGameboard.receiveAttack([0, 0]);
aiGameboard.receiveAttack([9, 9]);
aiGameboard.receiveAttack([8, 8]);

ai.attack(ai.randomCoord(playerGameboard), playerGameboard);

dom.generateBasic();
dom.renderGameboard(playerGameboard, "player");
dom.renderShips(playerGameboard, "player");

dom.renderGameboard(aiGameboard, "ai");

document.addEventListener("mousedown", (e) =>
{
  if (
    (e.target.dataset.owner === "ai")
   && !(e.target.className === "field hit"))
  {
    // console.log(e.target.dataset.firstcoord);
    humanPlayer.attack([
      [e.target.dataset.firstcoord],
      [e.target.dataset.secondcoord],
    ], aiGameboard);
    dom.renderGameboard(aiGameboard, "ai");
    dom.turnIndicator(humanPlayer.getTurn());
  }
});
qs("input").addEventListener("input", () =>
{
  dom.editPlayerName();
  dom.reRenderPlayerBoardName();
});
