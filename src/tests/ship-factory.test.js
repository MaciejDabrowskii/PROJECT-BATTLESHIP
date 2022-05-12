/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import _, { fill } from "lodash";
import shipFactory from "../factory-fns/ship-factory";

test("check if ship factory properly returns their length (4),(3),(2)", () =>
{
  const ship = shipFactory(4, "horizontal");
  const ship2 = shipFactory(3, "horizontal");
  const ship3 = shipFactory(2, "horizontal");

  expect(ship.getLength())
    .toEqual(4);
  expect(ship2.getLength())
    .toEqual(3);
  expect(ship3.getLength())
    .toEqual(2);
});

test("check if ship factory properly creates ship body array of given length 6", () =>
{
  const ship = shipFactory(4, "horizontal");
  const ship2 = shipFactory(3, "horizontal");
  const ship3 = shipFactory(2, "horizontal");

  expect(ship.getShipBody().length)
    .toEqual(4);

  expect(ship2.getShipBody().length)
    .toEqual(3);

  expect(ship3.getShipBody().length)
    .toEqual(2);
});

test("check if ship properly register hits", () =>
{
  const ship = shipFactory(4, "horizontal");
  ship.setShipArea(ship.calculateShipArea([1, 0]));
  ship.hit([2, 0]);

  expect(ship.getShipBody()[1])
    .toEqual([2, 0]);
});

test("check if isSunk works properly", () =>
{
  const ship = shipFactory(3, "horizontal");
  ship.setShipArea(ship.calculateShipArea([0, 1]));
  ship.hit([0, 1]);
  ship.hit([1, 1]);
  ship.hit([2, 1]);

  expect(ship.isSunk())
    .toEqual(true);
});

test("check if calculating ship area works properly with horizontal placement", () =>
{
  const ship = shipFactory(4, "horizontal");

  expect(ship.calculateShipArea([1, 1]))
    .toEqual([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ]);
});

test("check if calculating ship area works properly with vertical placement", () =>
{
  const ship = shipFactory(4, "vertical");

  expect(ship.calculateShipArea([1, 1]))
    .toEqual([
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ]);
});

test("check if shipFactory correctly save ship coordinates", () =>
{
  const ship = shipFactory(4, "vertical");
  ship.setShipArea(ship.calculateShipArea([1, 1]));

  expect(ship.getShipArea())
    .toEqual([
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ]);
});

test("check if calculate collision area works properly", () =>
{
  const ship = shipFactory(3, "horizontal");
  ship.setShipArea(ship.calculateShipArea([2, 0]));
  expect(ship.calculateCollisionArea(ship.getShipArea()))
    .toEqual([
      [1, 0],
      [2, 1],
      [1, 1],
      [3, 1],
      [4, 1],
      [5, 0],
      [5, 1],
    ]);
});
