import domModule from "../DOM-modules/dom-module";
import { qs } from "../utility-fns/utility-fns";
import { gameLoop } from "../game-loop/game-loop";

const addEvents = () => {
  qs("input").addEventListener("input", () => {
    domModule.editPlayerName();
    domModule.reRenderPlayerBoardName();
  });

  qs(".modal-btn").addEventListener("click", () => {
    qs(".modal-body").classList.remove("active");
    qs("#overlay").classList.remove("active");
    qs(".wrapper").remove();
    gameLoop();
  });
};

export default addEvents;
