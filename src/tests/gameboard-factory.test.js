import _, { compact, flattenDeep } from "lodash";
import gameboardFactory from "../factory-fns/gameboard-factory.js";

test("chek if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  expect(gameboard.getBoard()).toEqual(new Array(10).fill(new Array(10), 0, 10));
});

test("chek if gameboardFactory properly creates gameboard", () =>
{
  const gameboard = gameboardFactory();
  gameboard.placeShip("destroyer", [1, 1]);

  expect(() =>
  {
    if ((typeof gameboard.getBoard()[1][1] === "object") && (typeof gameboard.getBoard()[1][2] === "object"))
    {
      return true;
    }
  }).toBeTruthy();
});
