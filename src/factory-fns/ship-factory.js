const shipFactory = (length) =>
{
  const shipLength = length;
  const ship = new Array(length);
  const area = [];

  function hit(position)
  {
    if (position < length)
    {
      ship[position] = "hit";
    }
  }
  const isSunk = () => ship.every((element) => element === "hit");
  // eslint-disable-next-line consistent-return
  // shipArea calculates all ship cordinates from given starting coordinates
  const calculateShipArea = (firstCoord, orientation) =>
  {
    if (orientation === "horizontal")
    {
      for (let i = 0; i < length; i += 1)
      {
        area.push([firstCoord[0] + i, firstCoord[1]]);
      }
    }
    if (orientation === "vertical")
    {
      for (let i = 0; i < length; i += 1)
      {
        area.push([firstCoord[0], firstCoord[1] + i]);
      }
    }
    return area;
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
