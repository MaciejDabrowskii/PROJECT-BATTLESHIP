import _, { compact, flattenDeep } from "lodash";
import gameboardFactory from "../factory-fns/gameboard-factory.js";

test("check if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  expect(gameboard.getBoard()).toEqual([...new Array(10)].map(() => new Array(10)));
});

test("check if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(_.compact(_.flattenDeep(gameboard.getBoard())).length).toEqual(2);
});

test("check if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(
    gameboard.getBoard()[5][1],
  ).toBeUndefined();
});

test("check if placed ship methotds work properly", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(
    gameboard.getBoard()[1][1].getShipArea(),
  ).toEqual([[1, 1], [2, 1]]);
});

test("check if recive attack correctly register hits ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.receiveAttack([1, 0]);

  expect(
    gameboard.getBoard()[1][0].getShip(),
  ).toEqual([, "hit"]);
});
test("check if reciveAttack correctly register misses ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.receiveAttack([2, 0]);

  expect(
    gameboard.getBoard()[2][0],
  ).toEqual("miss");
});
test("check if reciveAttack correctly register misses ", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [0, 0]);
  gameboard.receiveAttack([2, 0]);

  expect(
    gameboard.getBoard()[2][0],
  ).toEqual("miss");
});

test("check if placing all ships and geting hit to all of them works correctly", () =>
{
  const gameboard = gameboardFactory();
  const shipCoords = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]];
  const attacks = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [0, 3], [1, 3], [2, 3], [0, 4], [1, 4]];
  const shipNames = gameboard.getShipsNames();
  shipCoords.forEach((coord, index) =>
  {
    gameboard.placeShip(shipNames[index], coord);
  });
  attacks.forEach((attack) => gameboard.receiveAttack(attack));
  const attackedShips = [];
  shipCoords.forEach((coord) =>
  {
    attackedShips.push([...gameboard.getBoard()[coord[0]][coord[1]].getShip()]);
  });
  expect(attackedShips).toEqual([["hit", "hit", "hit", "hit", "hit"], ["hit", "hit", "hit", "hit"], ["hit", "hit", "hit"], ["hit", "hit", "hit"], ["hit", "hit"]]);
});

test("check if isFleetDestroyed works correctly", () =>
{
  const gameboard = gameboardFactory();
  const shipCoords = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]];
  const attacks = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [0, 3], [1, 3], [2, 3], [0, 4], [1, 4]];
  const shipNames = gameboard.getShipsNames();
  shipCoords.forEach((coord, index) =>
  {
    gameboard.placeShip(shipNames[index], coord);
  });
  attacks.forEach((attack) => gameboard.receiveAttack(attack));
  expect(gameboard.isFleetDestroyed()).toEqual("true");
});
