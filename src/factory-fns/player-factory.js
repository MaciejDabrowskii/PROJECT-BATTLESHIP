/* eslint-disable no-unused-vars */
import _, { compact, flattenDeep } from "lodash";
import gameboardFactory from "./gameboard-factory";

const playerFactory = () =>
{
  let playerTurn = true;

  const switchTurn = () =>
  {
    switch (playerTurn)
    {
      case true:
        playerTurn = false;
        break;

      case false:
        playerTurn = true;
        break;

      default:
    }
  };

  const attack = (attackCoord, enemyGameboard) =>
  {
    enemyGameboard
      .receiveAttack(attackCoord);

    if (
      enemyGameboard
        .getBoard()[attackCoord[0]][attackCoord[1]] === "miss"
    ) switchTurn();
  };
};
