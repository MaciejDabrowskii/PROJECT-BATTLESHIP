import _, { fill } from "lodash";
import shipFactory from "./ship-factory";

const gameboardFactory = () =>
{
  const board = [...new Array(10)].map(() => new Array(10));
  let orientation = "horizontal";
  const missedAttacks = [];
  const ship = {
    carrier: shipFactory(5, orientation),
    battleship: shipFactory(4, orientation),
    crusier: shipFactory(3, orientation),
    submarine: shipFactory(3, orientation),
    destroyer: shipFactory(2, orientation),
  };
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
    ship[shipType].calculateShipArea(firstCoord).forEach((coord) =>
    {
      board[coord[0]][coord[1]] = ship[shipType];
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

  const getBoard = () => board;
  return {
    getBoard,
    placeShip,
    switchOrientation,
    receiveAttack,
  };
};
export default gameboardFactory;
