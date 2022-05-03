/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import _, { fill } from "lodash";
import shipFactory from "../factory-fns/ship-factory";

test("check if ship factory properly returns their length (5)", () =>
{
  const ship = shipFactory(4);

  expect(ship.getLength()).toEqual(4);
});

test("check if ship factory properly creates array of given length 6", () =>
{
  expect(shipFactory(6)
    .getShipBody().length)
    .toEqual(6);
});

test("check if ship factory properly creates array of given length 3", () =>
{
  expect(shipFactory(3)
    .getShipBody().length)
    .toEqual(3);
});

test("check if ship properly register hits", () =>
{
  const ship = shipFactory(4, "horizontal");
  ship.setShipArea(
    ship.calculateShipArea([1, 0]),
  );
  ship.hit([2, 0]);

  expect(ship.getShipBody()[1])
    .toEqual("hit");
});

test("check if hit function cant hit non existent space in array", () =>
{
  const ship = shipFactory(4);
  ship.hit(4);

  expect(ship.getShipBody()[5])
    .toBeUndefined();
});

test("check if isSunk works properly", () =>
{
  const ship = shipFactory(4);
  _.fill(ship.getShipBody(), "hit");

  expect(ship.isSunk())
    .toEqual(true);
});

test("check if calculating ship area works properly with horizontal placement #1", () =>
{
  const ship = shipFactory(4, "horizontal");

  expect(ship.calculateShipArea([1, 1]))
    .toEqual([[1, 1], [2, 1], [3, 1], [4, 1]]);
});

test("check if calculating ship area works properly with vertical placement #2", () =>
{
  const ship = shipFactory(4, "vertical");

  expect(ship.calculateShipArea([1, 1]))
    .toEqual([[1, 1], [1, 2], [1, 3], [1, 4]]);
});

test("check if shipFactory correctly save ship coordinates", () =>
{
  const ship = shipFactory(4, "vertical");
  ship.setShipArea(ship.calculateShipArea([1, 1]));

  expect(ship.getShipArea())
    .toEqual([[1, 1], [1, 2], [1, 3], [1, 4]]);
});
