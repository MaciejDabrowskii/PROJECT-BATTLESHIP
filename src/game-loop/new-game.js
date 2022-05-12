import { gameLoop } from "./game-loop";

const newGame = () =>
{
  document.body.innerHTML = "";
  gameLoop();
};
export default newGame;
