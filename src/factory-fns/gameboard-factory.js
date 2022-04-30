import _, { fill } from "lodash";
import shipFactory from "./ship-factory";

const gameboardFactory = () =>
{
  const board = [...new Array(10)].map(() => new Array(10));
  const orientation = "horizontal";
  const ship = {
    carrier: shipFactory(5),
    battleship: shipFactory(4),
    crusier: shipFactory(3),
    submarine: shipFactory(3),
    destroyer: shipFactory(2),
  };
  const placeShip = (shipType, firstCoord) =>
  {
    ship[shipType].calculateShipArea(firstCoord, orientation).forEach((coord) =>
    {
      board[coord[0]][coord[1]] = ship[shipType];
    });
  };

  const getBoard = () => board;
  return {
    getBoard,
    placeShip,
  };
};
export default gameboardFactory;
