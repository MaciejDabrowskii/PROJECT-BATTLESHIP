import _, { compact, flattenDeep } from "lodash";
import gameboardFactory from "../factory-fns/gameboard-factory.js";

test("chek if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  expect(gameboard.getBoard()).toEqual([...new Array(10)].map(() => new Array(10)));
});

test("chek if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(_.compact(_.flattenDeep(gameboard.getBoard())).length).toEqual(2);
});

test("chek if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(
    gameboard.getBoard()[5][1],
  ).toBeUndefined();
});

test("chek if assigned ship methotds work properly", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(
    gameboard.getBoard()[1][1].getShipArea(),
  ).toEqual([[1, 1], [2, 1]]);
});
