/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/prefer-default-export */

import domModule from "../DOM-modules/dom-module";
import gameboardFactory from "../factory-fns/gameboard-factory";
import playerFactory from "../factory-fns/player-factory";
import { qs } from "../utility-fns/utility-fns";

export const gameLoop = () =>
{
  const playerGameboard = gameboardFactory();
  const aiGameboard = gameboardFactory();
  const humanPlayer = playerFactory();
  const ai = playerFactory();
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

  domModule.renderBasic();
  domModule.renderGameboard(playerGameboard, "player");
  domModule.renderShips(playerGameboard, "player");
  domModule.renderGameboard(aiGameboard, "ai");

  const checkForWinner = () =>
  {
    if (playerGameboard.isFleetDestroyed()) domModule.anounceResoult("defeat");
    if (aiGameboard.isFleetDestroyed())
    {
      ai.switchTurn();
      domModule.anounceResoult("victory");
    }
  };

  const aiLoop = () =>
  {
    const timer = (time) => new Promise((res) => setTimeout(res, time)); // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
    async function load()
    {
      while (ai.getTurn())
      {
        await timer(1);
        ai.attack(ai.randomCoord(playerGameboard), playerGameboard);
        domModule.renderGameboard(playerGameboard, "player");
        domModule.renderShips(playerGameboard, "player");
      }
      humanPlayer.switchTurn();
      domModule.turnIndicator(humanPlayer.getTurn());
      checkForWinner();
    }
    load();
  };

  const userInputListener = (() =>
  {
    qs(".wrapper").addEventListener("click", (e) =>
    {
      if (humanPlayer.getTurn())
      {
        switch (e.target.dataset.owner)
        {
          case "ai": {
            switch (e.target.className)
            {
              case "field miss":
              case "field hit":
              {
                break;
              }
              default: {
                humanPlayer.attack([
                  [e.target.dataset.firstcoord],
                  [e.target.dataset.secondcoord],
                ], aiGameboard);

                domModule.renderGameboard(aiGameboard, "ai");
                domModule.turnIndicator(humanPlayer.getTurn());
                checkForWinner();

                if (!humanPlayer.getTurn())
                {
                  ai.switchTurn();
                  aiLoop();
                }
                break;
              }
            }
            break;
          }
          default:
        }
      }
    });

    qs("input").addEventListener("input", () =>
    {
      domModule.editPlayerName();
      domModule.reRenderPlayerBoardName();
    });
  })();
};
