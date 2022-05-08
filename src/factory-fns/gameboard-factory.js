import shipFactory from "./ship-factory";

const gameboardFactory = () =>
{
  const board = [...new Array(10)].map(() => new Array(10));
  let orientation = "horizontal";

  const fieldStatus = {
    missedAttacks: [],
    hitAttacks: [],
    antiCollision: [],
  };

  const ships = {
    carrier: { length: 5 },
    battleship: { length: 4 },
    crusier: { length: 3 },
    submarine: { length: 3 },
    destroyer: { length: 2 },
  };

  const getBoard = () => board;
  const getShips = () => ships;
  const getShipsNames = () => Object.keys(ships);
  const getFieldStatus = () => fieldStatus;

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

  const isNotColliding = (shipArea) => !shipArea // takes ship object calculates its area and check it against colision area if one of ship area match collison return true
    .some((el) => JSON.stringify(fieldStatus.antiCollision)
      .includes(JSON.stringify((el))));

  const isPlacementPossible = (shipObject, firstCoord) => ( // check if ship placment is possible (no collision with other ships && ships coords inside gameboard)
    (
      isNotColliding(
        shipObject
          .calculateShipArea(firstCoord),
      )
    )
    && (
      shipObject
        .calculateShipArea(firstCoord)
        .every(
          (coord) => shipObject
            .checkForInvalidCoords(coord),
        )
    )
  );

  const placeShip = (shipType, firstCoord) =>
  {
    switch (shipType) // creates a ship object
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

    if
    (
      isPlacementPossible(ships[shipType], firstCoord)
    )
    {
      ships[shipType] // sets calculated ship area to ship object
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
          .calculateCollisionArea(ships[shipType]
            .getShipArea()));
    }
  };

  const markDestroyedArea = (coords) => // takes coordinate and marks area around as miss
  {
    fieldStatus.missedAttacks
      .push(
        ...board[coords[0]][coords[1]]
          .calculateCollisionArea(board[coords[0]][coords[1]]
            .getShipArea()),
      );
  };

  const receiveAttack = (coords) => // takes coordinates and check board field
  {
    switch (typeof (board[coords[0]][coords[1]]))
    {
      case "object": // if field contains object (ship) marks "hit" in ships body array
        board[coords[0]][coords[1]].hit(coords);
        fieldStatus.hitAttacks.push(coords);

        if (
          board[coords[0]][coords[1]].isSunk()
        )
        {
          markDestroyedArea(coords);
        }
        break;

      case "undefined": // if field undefined (empty) sets string "miss" in this field and pushes coordinates to missed attacks array
        board[coords[0]][coords[1]] = "miss";
        fieldStatus.missedAttacks.push(coords);
        break;

      default:
    }
  };

  const isFleetDestroyed = () => getShipsNames() // takes ships objects and run method isSunk in each to determine that all ships are sunk
    .every((shipName) => ships[shipName]
      .isSunk());

  const randomShipPlacement = (generateRandom, antiCollision) => // places ships on random coordinates
  {
    getShipsNames() // takes ship names and for each name:
      .forEach((ship) =>
      {
        if (
          Math.round(Math.random()) > 0) switchOrientation(); // randomly switches orientation

        while (ships[ship].getLength === undefined) // loop that check ship object key is non existent
        {
          const random = generateRandom(antiCollision); // generate random viable coordinate (viable - not present in antiCollision array)

          if // generate ship body by given random coordinate and check if its body not colliding with any other ship
          (
            isNotColliding( // is fhip area coords are not present in antiCollision array
              shipFactory(ships[ship].length, orientation)
                .calculateShipArea(random),
            )
            && isPlacementPossible( // and ship area wont stick outside gameboard
              shipFactory(ships[ship].length, orientation),
              random,
            )
          )
          {
            placeShip(ship, random); // place ship
          }
        }
      });
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
    randomShipPlacement,
  };
};
export default gameboardFactory;
