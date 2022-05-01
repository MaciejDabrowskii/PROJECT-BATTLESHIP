const shipFactory = (length, orientation) =>
{
  const shipOrientation = orientation;
  const ship = new Array(length);
  const shipArea = [];

  const getLength = () => length;
  const getShip = () => ship;
  const getShipArea = () => shipArea;

  const hit = (position) =>
  {
    switch (shipOrientation)
    {
      case "horizontal": ship[position[0] - shipArea[0][0]] = "hit";
        break;

      case "vertical": ship[position[1] - shipArea[0][1]] = "hit";
        break;
      default:
    }
  };

  const isSunk = () => ship.every((element) => element === "hit");

  const calculateShipArea = (firstCoord) =>
  {
    if (shipOrientation === "horizontal")
    {
      for (let i = 0; i < length; i += 1)
      {
        shipArea.push([firstCoord[0] + i, firstCoord[1]]);
      }
    }
    if (shipOrientation === "vertical")
    {
      for (let i = 0; i < length; i += 1)
      {
        shipArea.push([firstCoord[0], firstCoord[1] + i]);
      }
    }
    return shipArea;
  };

  return {
    getShip,
    hit,
    isSunk,
    getLength,
    calculateShipArea,
    getShipArea,
  };
};
export default shipFactory;
