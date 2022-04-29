const shipFactory = (length) =>
{
  const ship = new Array(length);

  function hit(position)
  {
    if (position < length)
    {
      ship[position] = "hit";
    }
  }
  const isSunk = () => ship.every((element) => element === "hit");

  const getLength = () => length;
  const getShip = () => ship;

  return {
    getShip,
    hit,
    isSunk,
    getLength,
  };
};
export default shipFactory;
