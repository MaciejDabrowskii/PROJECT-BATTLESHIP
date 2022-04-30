import _, { fill } from "lodash";
import shipFactory from "./ship-factory";

const gameboardFactory = () =>
{
  const board = new Array(10);
  _.fill(board, new Array(10));
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
  //   const getShipArea =(board) =>{
  // board.forEach((element, index) => {
  //     element.forEach((field, index)=> {
  //         if (field.key)
  //     })
  // })
  //   }
  //   const boadrd = new Array(10).forEach((element) =>
  //   {
  //     element = new Array(10);
  //   });
  const getBoard = () => board;
  return {
    getBoard,
    placeShip,
  };
};
export default gameboardFactory;
