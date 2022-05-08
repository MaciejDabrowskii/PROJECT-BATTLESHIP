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

test("check if gameboardFactory properly adds ships to gameboard - horizontally", () =>
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

test("check if gameboardFactory properly adds ships to gameboard - vertically", () =>
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
    gameboard.getBoard()[1][0].getShipBody()[1],
  ).toEqual([1, 0]);

  expect(
    gameboard.getBoard()[1][0].getShipBody(),
  ).toEqual([[0, 0], [1, 0]]);

  expect(
    gameboard.getBoard()[7][5].getShipBody(),
  ).toEqual(["notHit", "notHit", "notHit", "notHit", [7, 5]]);
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
  ).toEqual(6);
});

test("check if gamebord correctly register colison coordinates ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);
  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(12);
});

test("check if calulateColision not returning coords outside gameboard < 0 ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);

  expect(
    gameboard.getFieldStatus().antiCollision,
  ).toEqual([[0, 0], [1, 0], [0, 1], [1, 1], [2, 0], [2, 1]]);

  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(6);
});

test("check if calulateColision not returning coords outside gameboard > 10 ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [8, 9]);

  expect(
    gameboard.getFieldStatus().antiCollision,
  ).toEqual([[8, 9], [9, 9], [8, 8], [7, 8], [7, 9], [9, 8]]);

  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(6);
});

test("check if calulateColision not returning coords outside gameboard < 0 and > 10 ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [8, 0]);

  expect(
    gameboard.getFieldStatus().antiCollision,
  ).toEqual([[8, 0], [9, 0], [7, 0], [8, 1], [7, 1], [9, 1]]);

  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(6);

  expect(
    gameboard.getFieldStatus().antiCollision.length,
  ).toEqual(6);
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
  ).toEqual(67);
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
    gameboard.getShips().carrier.getShipBody(),
  ).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

  expect(
    gameboard.getShips().carrier.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().battleship.getShipBody(),
  ).toEqual([[0, 2], [1, 2], [2, 2], [3, 2]]);

  expect(
    gameboard.getShips().battleship.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().crusier.getShipBody(),
  ).toEqual([[0, 4], [1, 4], [2, 4]]);

  expect(
    gameboard.getShips().crusier.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().submarine.getShipBody(),
  ).toEqual([[0, 6], [1, 6], [2, 6]]);

  expect(
    gameboard.getShips().submarine.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.getShips().destroyer.getShipBody(),
  ).toEqual([[0, 8], [1, 8]]);

  expect(
    gameboard.getShips().destroyer.isSunk(),
  ).toEqual(true);

  expect(
    gameboard.isFleetDestroyed(),
  ).toEqual(true);
});

test("check if function checkForInvalidCoords prevents from placing ships with coords that force ship to sticking outside gameboard", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("carrier", [8, 0]);
  gameboard.placeShip("carrier", [8, 9]);
  gameboard.switchOrientation();
  gameboard.placeShip("carrier", [0, 7]);

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(0);
});

test("check if markDestroyed area works", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 0]);
  expect(
    gameboard.getFieldStatus().missedAttacks,
  ).toEqual([[0, 1], [1, 1], [2, 0], [2, 1]]);
});

test("check if placing ships on random works", () =>
{
  const gameboard = gameboardFactory();
  const generateRandomCoord = (unavailable) =>
  {
    let randomCoord = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    // eslint-disable-next-line no-loop-func
    while (unavailable.some(((el) => JSON.stringify(randomCoord)
      .includes(JSON.stringify((el))))))
    {
      randomCoord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    }
    return randomCoord;
  };

  gameboard.randomShipPlacement(generateRandomCoord, gameboard.getFieldStatus().antiCollision);

  expect(
    _.compact(_.flattenDeep(gameboard.getBoard())).length,
  ).toEqual(17);
});
