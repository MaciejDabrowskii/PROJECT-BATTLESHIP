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

  const isSunk = () => shipBody.every((element) => element === "hit");

  const calculateShipArea = (firstCoord) => // takes coordinate and calculates ship area depending on orientation. Returns ship area array
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

  const hit = (coord) => // take coordinates and marks proper ship position as hit
  {
    switch (shipOrientation)
    {
      case "horizontal": shipBody[coord[0] - shipArea[0][0]] = "hit";
        break;

      case "vertical": shipBody[coord[1] - shipArea[0][1]] = "hit";
        break;

      default:
    }
  };

  const calculateCollisionArea = (area) => // takes ship area and calculates all surrounding fields return array of those fields.
  {
    const colisonArray = [];

    area.forEach((coord, index, array) =>
    {
      if (index === 0) // first coordinate
      {
        colisonArray.push(
          [coord[0] - 1, coord[1]], // middle left
          [coord[0] - 1, coord[1] - 1], // ubove left
          [coord[0] - 1, coord[1] + 1], // under left
          [coord[0], coord[1] - 1], // middle ubove
        );

        if (orientation === "horizontal")
        {
          colisonArray.push(
            [coord[0], coord[1] + 1], // middle under
          );
        }
        if (orientation === "vertical")
        {
          colisonArray.push(
            [coord[0] + 1, coord[1] - 1], // ubove left
          );
        }
      }

      else if (index === array.length - 1)// last coordinate
      {
        colisonArray.push(
          [coord[0], coord[1] + 1], // middle under
          [coord[0] + 1, coord[1]], // middle right
          [coord[0] + 1, coord[1] + 1], // ubove right
          [coord[0] + 1, coord[1] - 1], // under right
        );

        if (orientation === "horizontal")
        {
          colisonArray.push(
            [coord[0], coord[1] - 1], // under left
          );
        }
        if (orientation === "vertical")
        {
          colisonArray.push(
            [coord[0] - 1, coord[1] + 1], // ubove right
          );
        }
      }

      else
      {
        switch (shipOrientation)
        {
          case "horizontal":
            colisonArray.push(
              [coord[0], coord[1] - 1], // middle ubove
              [coord[0], coord[1] + 1], // middle under
            );
            break;

          case "vertical":
            colisonArray.push(
              [coord[0] - 1, coord[1]], // middle left
              [coord[0] + 1, coord[1]], // middle right
            );

            break;
          default:
        }
      }
    });
    return colisonArray.filter((field) => !( // filter out coords outside gameboard ( < 0 and > 9 )
      ((field.at(1) < 0) || (field.at(0) < 0))
      || ((field.at(1) > 9) || (field.at(0) > 9))
    ));
  };

  return {
    setShipArea,
    hit,
    isSunk,
    calculateShipArea,
    calculateCollisionArea,
    getShipBody,
    getShipArea,
    getLength,
  };
};
export default shipFactory;
