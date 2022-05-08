/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import _, { compact, flattenDeep, includes } from "lodash";
import gameboardFactory from "../factory-fns/gameboard-factory";
import playerFactory from "../factory-fns/player-factory";

test("check if switch turns works correctly true --> false ", () =>
{
  const player = playerFactory();
  player.switchTurn();

  expect(
    player.getTurn(),
  ).toEqual(false);
});

test("check attack function works correctly (send attack to coordinate on gameboard) ", () =>
{
  const player = playerFactory();
  const enemyGameboard = gameboardFactory();

  player.attack([0, 1], enemyGameboard);

  expect(
    enemyGameboard.getBoard()[0][1],
  ).toEqual("miss");
});

test("check if attack random correctly generates random coord) ", () =>
{
  const player = playerFactory();
  const enemyGameboard = gameboardFactory();

  expect(
    player.generateRandomCoord([
      ...enemyGameboard.getFieldStatus().missedAttacks,
      ...enemyGameboard.getFieldStatus().hitAttacks,
    ]).length,
  ).toEqual(2);
});

test("check if attack random correctly generates random coords and not generating same coord twice) ", () =>
{
  const player = playerFactory();
  const enemyGameboard = gameboardFactory();
  enemyGameboard.receiveAttack([0, 0]);
  enemyGameboard.receiveAttack([0, 1]);
  enemyGameboard.receiveAttack([0, 2]);

  let i = 0;
  while (i < 97)
  {
    enemyGameboard.receiveAttack(player.generateRandomCoord(
      [
        ...enemyGameboard.getFieldStatus().missedAttacks,
        ...enemyGameboard.getFieldStatus().hitAttacks,
      ],
    ));
    i += 1;
  }

  expect(
    _.compact(_.flattenDeep(enemyGameboard.getBoard())).length,
  ).toEqual(100);

  expect(
    _.compact(_.flattenDeep(enemyGameboard.getBoard())).every((el) => el === "miss"),
  ).toEqual(true);
});
