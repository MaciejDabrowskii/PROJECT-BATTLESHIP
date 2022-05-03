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
    carrier: {}, // length: 5
    battleship: {}, // length: 4
    crusier: {}, // length: 3
    submarine: {}, // length: 3
    destroyer: {}, // length: 2
  };

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

  const isColliding = (ship, coord) => // takes ship object calculates its area and check it against colision area if one of ship area match colison return true
  {
    const antiCollisionArea = JSON.stringify(fieldStatus.antiCollision);
    return ship.calculateShipArea(coord)
      .some((el) => antiCollisionArea
        .includes(JSON.stringify((el))));
  };

  const placeShip = (shipType, firstCoord) =>
  {
    switch (shipType) // create a ship object
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
      !isColliding(ships[shipType], firstCoord)) // cheks if ship placment is possible
    {
      ships[shipType] // sets calculated ship area in ship object
        .setShipArea(
          ships[shipType]
            .calculateShipArea(firstCoord),
        );
      ships[shipType] // push ship area to gameboard array and anticolison array
        .calculateShipArea(firstCoord)
        .forEach((coord) =>
        {
          board[coord[0]][coord[1]] = ships[shipType];
          fieldStatus.antiCollision.push(coord);
        });

      fieldStatus.antiCollision // calculates ship colison area (all surounding fields) and push tem to anticolision array
        .push(...ships[shipType]
          .calculateColisionArea(ships[shipType]
            .getShipArea()));
    }
  };

  const receiveAttack = (coords) => // take coordinates and check board field
  {
    switch (typeof (board[coords[0]][coords[1]]))
    {
      case "object": // if field contains object (ship) run function hit on it
        board[coords[0]][coords[1]].hit(coords);
        break;
      case "undefined": // if field undefined (empty) sets string "miss" on this field and push coordinates to missed attacks array
        board[coords[0]][coords[1]] = "miss";
        fieldStatus.missedAttacks.push(coords);
        break;
      default:
    }
  };

  const isFleetDestroyed = () => // takes ships object keys properties (ships objects) and run method isSunk in each to determine that all ships are sunk
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
    return arrayOfShips.every((ship) => ship.isSunk());
  };

  return {
    getBoard,
    getShipsNames,
    getShips,
    getFieldStatus,
    placeShip,
    switchOrientation,
    receiveAttack,
    isFleetDestroyed,
  };
};
export default gameboardFactory;
