const shipFactory = (length) => 
{
  const ship = new Array(length);

  function hit(position) 
{
    ship[position] = "hit";
  }
  const isSunk = () => 
{
    ship.every((element) => element === "hit");
  };

  return {
    ship,
    hit,
    isSunk,
  };
};
export default shipFactory;
