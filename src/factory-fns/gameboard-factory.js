import shipFactory from "./ship-factory";

const gameboardFactory = () =>
{
  const board = [...new Array(10)].map(() => new Array(10));
  let orientation = "horizontal";

  const fieldStatus = {
    missedAttacks: [],
    antiCollision: [],
  };

  const ships = {
    carrier: {},
    battleship: {},
    crusier: {},
    submarine: {},
    destroyer: {},
  };

  // shipFactory(2, orientation)
  const getBoard = () => board;
  const getShipsNames = () => Object.keys(ships);
  const getFieldStatus = () => fieldStatus;
  const getShips = () => ships;

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

  const isColliding = (shipArea) =>
  {
    const antiCollision = JSON.stringify(fieldStatus.antiCollision);

    return shipArea.every((element) =>
    {
      const result = antiCollision.indexOf(JSON.stringify(element));
      return result !== -1;
    });
  };

  const placeShip = (shipType, firstCoord) =>
  {
    switch (shipType)
    {
      case "carrier":
        ships[shipType] = shipFactory(5, orientation);
        break;

      case "battleship":
        ships[shipType] = shipFactory(4, orientation);
        break;

      case "crusier":
        ships[shipType] = shipFactory(3, orientation);
        break;

      case "submarine":
        ships[shipType] = shipFactory(3, orientation);
        break;

      case "destroyer":
        ships[shipType] = shipFactory(2, orientation);
        break;

      default:
    }

    if (
      !isColliding(
        ...ships[shipType]
          .calculateShipArea(firstCoord),
      ))
    {
      ships[shipType]
        .setShipArea(
          ships[shipType]
            .calculateShipArea(firstCoord),
        );
      ships[shipType]
        .calculateShipArea(firstCoord)
        .forEach((coord) =>
        {
          board[coord[0]][coord[1]] = ships[shipType];
          fieldStatus.antiCollision.push(coord);
        });

      fieldStatus.antiCollision
        .push(...ships[shipType]
          .calculateColisionArea(ships[shipType]
            .getShipArea()));
    }
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
        fieldStatus.missedAttacks.push(coords);
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
    getShips,
    placeShip,
    switchOrientation,
    receiveAttack,
    isFleetDestroyed,
    isColliding,
    getFieldStatus,
  };
};
export default gameboardFactory;
