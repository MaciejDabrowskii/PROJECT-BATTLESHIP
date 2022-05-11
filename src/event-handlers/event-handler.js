/* eslint-disable no-return-assign */
import domModule from "../DOM-modules/dom-module";
import { qs, qsa } from "../utility-fns/utility-fns";
import { gameLoop } from "../game-loop/game-loop";

const addEvents = () =>
{
  const modalAndInputEvents = () =>
  {
    qs("input").addEventListener("input", () =>
    {
      domModule.editPlayerName();
      domModule.reRenderPlayerBoardName();
    });

    qs(".modal-btn").addEventListener("click", () =>
    {
      qs(".modal-body").classList.remove("active");
      qs("#overlay").classList.remove("active");
      qs(".wrapper").remove();
      gameLoop();
    });
  };

  const dragAndDropEvents = (gameboard) =>
  {
    // Drag and drop Ships Events
    function dragStart(e)
    {
      this.classList.add("hold");
      setTimeout(() => (this.className = "invisible"), 0);
      e.dataTransfer.setData("Ship-type", e.target.id);
    }

    function dragEnd()
    {
      this.className = "ship-drag";
    }

    function dragOver(e)
    {
      e.preventDefault();
    }

    function dragEnter()
    {
      this.classList.add("hovered");
    }

    function dragLeave()
    {
      this.className = "field";
    }

    function dragDrop(e)
    {
      e.preventDefault();
      this.classList.remove("hovered");
      const shipType = e.dataTransfer.getData("Ship-type");

      gameboard.placeShip(
        shipType,
        [Number(this.dataset.firstcoord), Number(this.dataset.secondcoord)],
      );
      domModule.renderShips(gameboard, "player");

      if (this.classList.contains("ship"))
      {
        qs(`#${shipType}`).removeEventListener("dragend", dragEnd);
        qs(`#${shipType}`).classList.add("invisible");
      }
    }

    qsa(".ship-drag").forEach((ship) =>
    {
      ship.addEventListener("dragstart", dragStart);
      ship.addEventListener("dragend", dragEnd);
    });

    qsa(".field").forEach((field) =>
    {
      field.addEventListener("dragover", dragOver);
      field.addEventListener("dragenter", dragEnter);
      field.addEventListener("dragleave", dragLeave);
      field.addEventListener("drop", dragDrop);
    });
    // Drag and drop Buttons Events
  };

  return {
    modalAndInputEvents,
    dragAndDropEvents,
  };
};
export default addEvents;
