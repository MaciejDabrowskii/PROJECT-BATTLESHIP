import _, { fill } from "lodash";
import shipFactory from "./ship-factory";

const gameboardFactory = () =>
{
  const board = [...new Array(10)].map(() => new Array(10));
  let orientation = "horizontal";
  const missedAttacks = [];
  const ships = {
    carrier: shipFactory(5, orientation),
    battleship: shipFactory(4, orientation),
    crusier: shipFactory(3, orientation),
    submarine: shipFactory(3, orientation),
    destroyer: shipFactory(2, orientation),
  };

  const getBoard = () => board;
  const getShipsNames = () => Object.keys(ships);

  const switchOrientation = () =>
  {
    switch (orientation)
    {
      case "horizontal": orientation = "vertical";
        break;
      case "vertical": orientation = "horizontal";
        break;
      default:
    }
  };

  const placeShip = (shipType, firstCoord) =>
  {
    ships[shipType].calculateShipArea(firstCoord).forEach((coord) =>
    {
      board[coord[0]][coord[1]] = ships[shipType];
    });
  };
  const receiveAttack = (coords) =>
  {
    switch (typeof (board[coords[0]][coords[1]]))
    {
      case "object":
        board[coords[0]][coords[1]].hit(coords);
        break;
      case "undefined":
        board[coords[0]][coords[1]] = "miss";
        missedAttacks.push(coords);
        break;
      default:
    }
  };
  const isFleetDestroyed = () =>
  {
    const arrayOfShips = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const property in ships)
    {
      if ({}.hasOwnProperty.call(ships, property))
      {
        arrayOfShips.push(ships[property]);
      }
    }
    return String(arrayOfShips.every((ship) => ship.isSunk()));
  };

  return {
    getBoard,
    getShipsNames,
    placeShip,
    switchOrientation,
    receiveAttack,
    isFleetDestroyed,
  };
};
export default gameboardFactory;
