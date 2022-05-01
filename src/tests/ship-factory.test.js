/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import _, { fill } from "lodash";
import shipFactory from "../factory-fns/ship-factory";

test("chek if ship factory properly returns their length (5)", () =>
{
  const ship = shipFactory(4);
  expect(ship.getLength()).toEqual(4);
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
  const ship = shipFactory(4, "horizontal");
  ship.calculateShipArea([1, 0]);
  ship.hit([2, 0]);
  expect(ship.getShip()[1]).toEqual("hit");
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
  _.fill(ship.getShip(), "hit");
  expect(ship.isSunk()).toEqual(true);
});
test("chek if calculating ship area works properly with horizontal placement", () =>
{
  const ship = shipFactory(4, "horizontal");
  expect(ship.calculateShipArea([1, 1])).toEqual([[1, 1], [2, 1], [3, 1], [4, 1]]);
});
test("chek if calculating ship area works properly with vertical placement", () =>
{
  const ship = shipFactory(4, "vertical");
  expect(ship.calculateShipArea([1, 1])).toEqual([[1, 1], [1, 2], [1, 3], [1, 4]]);
});
test("chek if shipFactory correctly save ship coordinates", () =>
{
  const ship = shipFactory(4, "vertical");
  ship.calculateShipArea([1, 1]);
  expect(ship.getShipArea()).toEqual([[1, 1], [1, 2], [1, 3], [1, 4]]);
});
