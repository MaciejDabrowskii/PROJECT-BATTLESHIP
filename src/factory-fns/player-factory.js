/* eslint-disable no-loop-func */
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

  const generateRandomCoord = (unavailable) =>
  {
    let randomCoord = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    // eslint-disable-next-line no-loop-func
    while (
      unavailable.some((el) => JSON.stringify(randomCoord)
        .includes(JSON.stringify(el)))
    )
    {
      randomCoord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    }
    return randomCoord;
  };

  const attack = (
    attackCoord,
    enemyGameboard, // send attack to given gameboard - if miss switch turn
  ) =>
  {
    enemyGameboard.receiveAttack(attackCoord);

    if (enemyGameboard.getBoard()[attackCoord[0]][attackCoord[1]] === "miss")
    {
      switchTurn();
    }
  };

  return {
    switchTurn,
    getTurn,
    attack,
    generateRandomCoord,
  };
};

export default playerFactory;
