const shipFactory = (length, orientation) =>
{
  const shipOrientation = orientation;
  const ship = new Array(length);
  const shipArea = [];

  function hit(position)
  {
    switch (shipOrientation)
    {
      case "horizontal": ship[position[0] - shipArea[0][0]] = "hit";
        break;

      case "vertical": ship[position[1] - shipArea[0][1]] = "hit";
        break;
      default:
    }
  }
  const isSunk = () => ship.every((element) => element === "hit");
  // eslint-disable-next-line consistent-return
  // shipArea calculates all ship cordinates from given starting coordinates
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
  const getLength = () => length;
  const getShip = () => ship;
  const getShipArea = () => shipArea;

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
