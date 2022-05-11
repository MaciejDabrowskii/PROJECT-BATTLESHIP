/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/prefer-default-export */

import domModule from "../DOM-modules/dom-module";
import gameboardFactory from "../factory-fns/gameboard-factory";
import playerFactory from "../factory-fns/player-factory";
import { qs, qsa } from "../utility-fns/utility-fns";
import eventHandlers from "../event-handlers/event-handler";

export const gameLoop = () =>
{
  const playerGameboard = gameboardFactory();
  const aiGameboard = gameboardFactory();
  const humanPlayer = playerFactory();
  const ai = playerFactory();
  ai.switchTurn();

  // playerGameboard.randomShipPlacement(humanPlayer.generateRandomCoord, playerGameboard.getFieldStatus().antiCollision);

  domModule.renderBasic();
  domModule.renderGameboard(playerGameboard, "player");
  domModule.renderDragAndDropItems(playerGameboard);

  eventHandlers.dragAndDropEvents(playerGameboard, aiGameboard);

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
        await timer(1500);

        ai.attack(
          ai.generateRandomCoord([
            ...playerGameboard.getFieldStatus().missedAttacks,
            ...playerGameboard.getFieldStatus().hitAttacks,
          ]),
          playerGameboard,
        );
        domModule.renderGameboard(playerGameboard, "player");
        domModule.renderShips(playerGameboard, "player");
      }
      await timer(700);
      humanPlayer.switchTurn();
      domModule.toggleActive("ai");
      domModule.toggleActive("player");
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
              case "field hit": {
                break;
              }
              default: {
                humanPlayer.attack(
                  [
                    [e.target.dataset.firstcoord],
                    [e.target.dataset.secondcoord],
                  ],
                  aiGameboard,
                );

                domModule.renderGameboard(aiGameboard, "ai");
                domModule.turnIndicator(humanPlayer.getTurn());
                checkForWinner();

                if (!humanPlayer.getTurn())
                {
                  ai.switchTurn();
                  domModule.toggleActive("ai");
                  domModule.toggleActive("player");
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
  })();
};
