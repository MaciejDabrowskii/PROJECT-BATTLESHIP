/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
import domModule from "../DOM-modules/dom-module";
import gameboardFactory from "../factory-fns/gameboard-factory";
import playerFactory from "../factory-fns/player-factory";
import { qs } from "../utility-fns/utility-fns";

const gameLoop = (() =>
{
  const playerGameboard = gameboardFactory();
  const aiGameboard = gameboardFactory();
  const humanPlayer = playerFactory();
  const ai = playerFactory();
  const dom = domModule();
  ai.switchTurn();

  playerGameboard.placeShip("carrier", [0, 0]);
  playerGameboard.placeShip("battleship", [0, 2]);
  playerGameboard.placeShip("crusier", [0, 4]);
  playerGameboard.placeShip("submarine", [0, 6]);
  playerGameboard.placeShip("destroyer", [0, 8]);

  aiGameboard.placeShip("carrier", [0, 0]);
  aiGameboard.placeShip("battleship", [0, 2]);
  aiGameboard.placeShip("crusier", [0, 4]);
  aiGameboard.placeShip("submarine", [0, 6]);
  aiGameboard.placeShip("destroyer", [0, 8]);

  dom.generateBasic();
  dom.renderGameboard(playerGameboard, "player");
  dom.renderShips(playerGameboard, "player");
  dom.renderGameboard(aiGameboard, "ai");

  const aiLoop = () =>
  {
    const timer = (time) => new Promise((res) => setTimeout(res, time)); // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
    async function load()
    {
      while (ai.getTurn())
      {
        await timer(1000);
        ai.attack(ai.randomCoord(playerGameboard), playerGameboard),
        dom.renderGameboard(playerGameboard, "player");
        dom.renderShips(playerGameboard, "player");
      }
      humanPlayer.switchTurn();
      dom.turnIndicator(humanPlayer.getTurn());
    }
    load();
  };

  const addEvents = (() =>
  {
    document.addEventListener("mousedown", (e) =>
    {
      if (humanPlayer.getTurn())
      {
        if (
          (e.target.dataset.owner === "ai")
        && !(e.target.className === "field hit"))
        {
          humanPlayer.attack([
            [e.target.dataset.firstcoord],
            [e.target.dataset.secondcoord],
          ], aiGameboard);

          dom.renderGameboard(aiGameboard, "ai");
          dom.turnIndicator(humanPlayer.getTurn());

          if (!humanPlayer.getTurn())
          {
            ai.switchTurn();
            aiLoop();
          }
        }
      }
    });

    qs("input").addEventListener("input", () =>
    {
      dom.editPlayerName();
      dom.reRenderPlayerBoardName();
    });
  })();
})();

export default gameLoop;
