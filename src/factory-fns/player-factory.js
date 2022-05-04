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

  const getTurn = () => playerTurn;

  const attack = (attackCoord, enemyGameboard) =>
  {
    enemyGameboard
      .receiveAttack(attackCoord);

    if (
      enemyGameboard
        .getBoard()[attackCoord[0]][attackCoord[1]] === "miss"
    ) switchTurn();
  };

  const randomCoord = (enemyGameboard) =>
  {
    const unavailable = [
      ...enemyGameboard.getFieldStatus().missedAttacks,
      ...enemyGameboard.getFieldStatus().hitAttacks,
    ];

    let attackCoord = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    // eslint-disable-next-line no-loop-func
    while (unavailable.some(((el) => JSON.stringify(attackCoord)
      .includes(JSON.stringify((el))))))
    {
      attackCoord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    }
    return attackCoord;
  };

  return {
    switchTurn,
    getTurn,
    attack,
    randomCoord,

  };
};

export default playerFactory;
