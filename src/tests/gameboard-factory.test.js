/* eslint-disable no-unused-vars */
/* eslint-disable no-sparse-arrays */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import _, { compact, flattenDeep, includes } from "lodash";
import gameboardFactory from "../factory-fns/gameboard-factory";

test("check if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  expect(
    gameboard.getBoard(),
  ).toEqual([...new Array(10)].map(() => new Array(10)));
});

test("check if gameboardFactory properly add ships to gameboard - horizontally", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(2);

  expect(
    typeof (gameboard.getBoard()[1][1]),
  ).toEqual("object");

  expect(
    typeof (gameboard.getBoard()[2][1]),
  ).toEqual("object");

  expect(
    typeof (gameboard.getBoard()[1][2]),
  ).toEqual("undefined");
});

test("check if gameboardFactory properly add ships to gameboard - vertically", () =>
{
  const gameboard = gameboardFactory();
  gameboard.switchOrientation();
  gameboard.placeShip("destroyer", [0, 0]);

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(2);

  expect(
    typeof (gameboard.getBoard()[0][0]),
  ).toEqual("object");

  expect(
    typeof (gameboard.getBoard()[0][1]),
  ).toEqual("object");

  expect(
    typeof (gameboard.getBoard()[1][0]),
  ).toEqual("undefined");
});

test("check if placed ship methotds work properly", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("carrier", [1, 1]);

  expect(
    gameboard.getBoard()[1][1].getShipArea(),
  ).toEqual([[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]]);
});

test("check if recive attack correctly register hits ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.placeShip("carrier", [3, 5]);
  gameboard.receiveAttack([1, 0]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([7, 5]);

  expect(
    gameboard.getBoard()[1][0].getShip()[1],
  ).toEqual("hit");

  expect(
    gameboard.getBoard()[1][0].getShip(),
  ).toEqual(["hit", "hit"]);

  expect(
    gameboard.getBoard()[7][5].getShip(),
  ).toEqual(["notHit", "notHit", "notHit", "notHit", "hit"]);
});

test("check if reciveAttack correctly register misses ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.receiveAttack([2, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([1, 1]);

  expect(
    gameboard.getBoard()[2][0],
  ).toEqual("miss");

  expect(
    gameboard.getBoard()[0][1],
  ).toEqual("miss");

  expect(
    gameboard.getBoard()[1][1],
  ).toEqual("miss");
});

test("check if gameboard correctly stores misses ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.receiveAttack([2, 0]);
  gameboard.receiveAttack([3, 0]);
  gameboard.receiveAttack([4, 0]);
  gameboard.receiveAttack([5, 0]);

  expect(
    gameboard.getFieldStatus().missedAttacks,
  ).toEqual([[2, 0], [3, 0], [4, 0], [5, 0]]);
});

test("check if gameboard correctly register misses ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.receiveAttack([2, 0]);

  expect(
    gameboard.getBoard()[2][0],
  ).toEqual("miss");
});

test("check if isColliding works", () =>
{
  const gameboard = gameboardFactory();

  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.placeShip("carrier", [0, 0]);
  gameboard.placeShip("carrier", [0, 1]);
  gameboard.placeShip("carrier", [1, 0]);
  gameboard.placeShip("carrier", [1, 1]);
  gameboard.placeShip("carrier", [2, 0]);
  gameboard.placeShip("carrier", [2, 1]);

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(2);

  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(12);
});

test("check if isColliding works with placeShip function", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.placeShip("carrier", [2, 1]);
  gameboard.placeShip("submarine", [0, 0]);

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(2);
});

test("check if placement of all ships and anticolission works ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("carrier", [0, 4]);
  gameboard.placeShip("carrier", [0, 4]);
  gameboard.placeShip("battleship", [0, 2]);
  gameboard.placeShip("battleship", [0, 5]);
  gameboard.placeShip("crusier", [0, 6]);
  gameboard.placeShip("submarine", [5, 0]);
  gameboard.placeShip("destroyer", [6, 8]);

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(17);

  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(81);
});

test("check if placing all ships and geting hit to all of them and isFleetDestroyed works correctly", () =>
{
  const gameboard = gameboardFactory();
  const shipCoords = [[0, 0], [0, 2], [0, 4], [0, 6], [0, 8]];
  const attacks = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 2], [1, 2], [2, 2], [3, 2], [0, 4], [1, 4], [2, 4], [0, 6], [1, 6], [2, 6], [0, 8], [1, 8]];

  const shipNames = gameboard.getShipsNames();

  shipCoords.forEach((coord, index) =>
  {
    gameboard.placeShip(shipNames[index], coord);
  });
  attacks.forEach((attack) => gameboard.receiveAttack(attack));

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(17);

  expect(
    gameboard.getShips().carrier.getShip(),
  ).toEqual(["hit", "hit", "hit", "hit", "hit"]);

  expect(
    gameboard.getShips().carrier.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().battleship.getShip(),
  ).toEqual(["hit", "hit", "hit", "hit"]);

  expect(
    gameboard.getShips().battleship.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().crusier.getShip(),
  ).toEqual(["hit", "hit", "hit"]);

  expect(
    gameboard.getShips().crusier.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().submarine.getShip(),
  ).toEqual(["hit", "hit", "hit"]);

  expect(
    gameboard.getShips().submarine.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().destroyer.getShip(),
  ).toEqual(["hit", "hit"]);

  expect(
    gameboard.getShips().destroyer.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.isFleetDestroyed(),
  ).toEqual(true);
});

test("check if gamebord correctly register colison coordinates ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);
  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(12);
});
