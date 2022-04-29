import { fill } from "lodash";
import shipFactory from "../factory-fns/ship-factory.js";

test("chek if ship factory properly returns their length (5)", () =>
{
  expect(shipFactory(5).getLength()).toEqual(5);
});
test("chek if ship factory properly creats array of given length 6", () =>
{
  expect(shipFactory(6).getShip().length).toEqual(6);
});
test("chek if ship factory properly creats array of given length 3", () =>
{
  expect(shipFactory(3).getShip().length).toEqual(3);
});
test("chek if ship properly register hits", () =>
{
  const ship = shipFactory(4);
  ship.hit(3);
  expect(ship.getShip()[3]).toEqual("hit");
});
test("chek if hit function cant hit non existent space in array", () =>
{
  const ship = shipFactory(4);
  ship.hit(4);
  expect(ship.getShip()[5]).toBeUndefined();
});
test("chek if isSunk works properly", () =>
{
  const ship = shipFactory(4);
  ship.getShip().fill("hit", 0, ship.getShip().length);
  expect(ship.isSunk()).toEqual(true);
});
