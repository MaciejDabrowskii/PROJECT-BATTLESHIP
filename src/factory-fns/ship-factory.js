/* eslint-disable default-case */
const shipFactory = (length, orientation) =>
{
  const shipOrientation = orientation;
  const shipLength = length;
  const shipBody = new Array(length).fill("notHit", 0, length);
  const shipArea = [];

  const setShipArea = (array) => shipArea.push(...array);
  const getLength = () => shipLength;
  const getShipBody = () => shipBody;
  const getShipArea = () => shipArea;

  const isSunk = () => shipBody.every((element) => typeof element === "object");

  const calculateShipArea = (
    firstCoord, // take coordinate and calculate ship area depending on orientation. Return ship area array
  ) =>
  {
    const area = [];
    if (shipOrientation === "horizontal")
    {
      for (let i = 0; i < shipLength; i += 1)
      {
        area.push([firstCoord[0] + i, firstCoord[1]]);
      }
    }
    if (shipOrientation === "vertical")
    {
      for (let i = 0; i < shipLength; i += 1)
      {
        area.push([firstCoord[0], firstCoord[1] + i]);
      }
    }
    return area;
  };

  const hit = (
    coord, // take coordinate and mark proper ship position as hit
  ) =>
  {
    switch (shipOrientation)
    {
      case "horizontal":
        shipBody[coord[0] - shipArea[0][0]] = coord;
        break;

      case "vertical":
        shipBody[coord[1] - shipArea[0][1]] = coord;
        break;

      default:
    }
  };

  const checkForInvalidCoords = (coord) => !(
    coord.at(1) < 0
     || coord.at(0) < 0
      || coord.at(1) > 9
       || coord.at(0) > 9
  );

  const calculateCollisionArea = (
    area, // take ship area and calculates all surrounding fields return array of those fields.
  ) =>
  {
    const colisonArray = [];

    area.forEach((coord, index, array) =>
    {
      switch (index)
      {
        case 0: {
          // first coord
          colisonArray.push(
            [coord[0], coord[1] - 1], // up
            [coord[0] - 1, coord[1] - 1], // up left
            [coord[0] - 1, coord[1]], // left
          );
          if (orientation === "horizontal")
          {
            colisonArray.push(
              [coord[0], coord[1] + 1], //  down
              [coord[0] - 1, coord[1] + 1], // down left
            );
          }
          if (orientation === "vertical")
          {
            colisonArray.push(
              [coord[0] + 1, coord[1] - 1], // up right
              [coord[0] + 1, coord[1]], // right
            );
          }
          break;
        }

        case array.length - 1: {
          // last coord
          colisonArray.push(
            [coord[0], coord[1] + 1], // down
            [coord[0] + 1, coord[1]], // right
            [coord[0] + 1, coord[1] + 1], // down right
          );

          if (orientation === "horizontal")
          {
            colisonArray.push(
              [coord[0], coord[1] - 1], // up
              [coord[0] + 1, coord[1] - 1], // up right
            );
          }
          if (orientation === "vertical")
          {
            colisonArray.push(
              [coord[0] - 1, coord[1] + 1], // down left
              [coord[0] - 1, coord[1]], // left
            );
          }
          break;
        }

        default: {
          // every coordinate between first and last
          if (orientation === "horizontal")
          {
            colisonArray.push(
              [coord[0], coord[1] - 1], // up
              [coord[0], coord[1] + 1], // down
            );
          }
          if (orientation === "vertical")
          {
            colisonArray.push(
              [coord[0] - 1, coord[1]], // left
              [coord[0] + 1, coord[1]], // right
            );
          }
          break;
        }
      }
    });
    return colisonArray.filter((field) => checkForInvalidCoords(field));
  };

  return {
    setShipArea,
    hit,
    isSunk,
    calculateShipArea,
    calculateCollisionArea,
    checkForInvalidCoords,
    getShipBody,
    getShipArea,
    getLength,
  };
};
export default shipFactory;
