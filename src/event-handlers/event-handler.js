/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import _, { compact, flattenDeep } from "lodash";
import domModule from "../DOM-modules/dom-module";
import { qs, qsa } from "../utility-fns/utility-fns";
import { gameLoop } from "../game-loop/game-loop";
import playerFactory from "../factory-fns/player-factory";

const eventHandlers = (() =>
{
  const modalAndInputEvents = () =>
  {
    qs("input")
      .addEventListener("input", () =>
      {
        domModule.editPlayerName();
        domModule.reRenderPlayerBoardName();
      });

    qs(".modal-btn")
      .addEventListener("click", () =>
      {
        qs(".modal-body").classList.remove("active");
        qs("#overlay").classList.remove("active");
        qs(".wrapper")
          .remove();
        gameLoop();
      });
  };

  const dragAndDropEvents = (playerGameboard, aiGameboard) =>
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

    function dragEnter(e)
    {
      if (!this.classList.contains("ship"))
      {
        this.classList.add("hovered");
      }
    }

    function dragLeave()
    {
      this.classList.remove("hovered");
    }

    function dragDrop(e)
    {
      e.preventDefault();
      const shipType = e.dataTransfer.getData("Ship-type");
      if (
        !JSON.stringify(playerGameboard
          .getFieldStatus().antiCollision)
          .includes(JSON.stringify([
            Number(this.dataset.firstcoord),
            Number(this.dataset.secondcoord),
          ]))
      )
      {
        this.classList.remove("hovered");

        playerGameboard.placeShip(shipType, [
          Number(this.dataset.firstcoord),
          Number(this.dataset.secondcoord),
        ]);

        domModule.renderShips(playerGameboard, "player");

        if (this.classList.contains("ship"))
        {
          qs(`#${shipType}`)
            .removeEventListener("dragend", dragEnd);
          qs(`#${shipType}`).classList.add("invisible");
        }
      }
      else
      {
        this.classList.remove("hovered");
      }
    }

    qsa(".ship-drag")
      .forEach((ship) =>
      {
        ship.addEventListener("dragstart", dragStart);
        ship.addEventListener("dragend", dragEnd);
      });

    qsa(".field")
      .forEach((field) =>
      {
        field.addEventListener("dragover", dragOver);
        field.addEventListener("dragenter", dragEnter);
        field.addEventListener("dragleave", dragLeave);
        field.addEventListener("drop", dragDrop);
      });
    // Drag and drop Buttons Events

    qs(".change-orientation-btn")
      .addEventListener("click", () =>
      {
        playerGameboard.switchOrientation();

        switch (playerGameboard.getOrientation())
        {
          case "horizontal": {
            qsa(".ship-drag")
              .forEach((el) =>
              {
                el.style.flexDirection = "row";
              });
            break;
          }

          case "vertical": {
            qsa(".ship-drag")
              .forEach((el) =>
              {
                el.style.flexDirection = "column";
              });
            break;
          }
          default:
        }
      });

    qs(".confirm-layout-btn")
      .addEventListener("click", () =>
      {
        if (_.compact(_.flattenDeep(playerGameboard.getBoard())).length === 17)
        {
          qs(".ai-section").innerHTML = "";
          domModule.renderAISectionElements();
          aiGameboard.randomShipPlacement(
            playerFactory().generateRandomCoord,
            aiGameboard.getFieldStatus().antiCollision,
          );
          domModule.renderGameboard(aiGameboard, "ai");
          domModule.renderShips(aiGameboard, "ai");
          domModule.toggleActive("ai");
          qs(".ai-section").style.flexDirection = "row";
        }
      });
  };

  return {
    modalAndInputEvents,
    dragAndDropEvents,
  };
})();
export default eventHandlers;
