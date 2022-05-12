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
    qs("input") // dynamically adds player name to player board name
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
      if ( // check if drop on this place is possible - compare field with anticollision array
        !JSON.stringify(playerGameboard
          .getFieldStatus().antiCollision)
          .includes(JSON.stringify([
            Number(this.dataset.firstcoord),
            Number(this.dataset.secondcoord),
          ]))
      )
      {
        this.classList.remove("hovered"); // remove class hovered from field

        playerGameboard.placeShip(shipType, [ // place ship
          Number(this.dataset.firstcoord),
          Number(this.dataset.secondcoord),
        ]);

        domModule.renderShips(playerGameboard, "player"); // render ships on player gameboard

        if (this.classList.contains("ship")) // if placing successful
        {
          qs(`#${shipType}`)
            .removeEventListener("dragend", dragEnd);
          qs(`#${shipType}`).classList.add("invisible"); // hide placed ship
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
        if (_.compact(_.flattenDeep(playerGameboard.getBoard())).length === 17) // check if all ships has been placed
        {
          qs(".ai-section").innerHTML = ""; // remove drag and drop ships and buttons
          domModule.renderAISectionElements();
          aiGameboard.randomShipPlacement( // place ai ships at random locations
            playerFactory().generateRandomCoord,
            aiGameboard.getFieldStatus().antiCollision,
          );
          domModule.renderGameboard(aiGameboard, "ai"); // render ai gameboard
          domModule.renderShips(aiGameboard, "ai"); // render ai ships
          domModule.toggleActive("ai"); // switch ai trun to false and start game
          qs(".ai-section").style.flexDirection = "row";
        }
      });

    qs(".random-btn")
      .addEventListener("click", () => // place ships at random locations and start game
      {
        playerGameboard.randomShipPlacement( // place players ships at random locations
          playerFactory().generateRandomCoord,
          aiGameboard.getFieldStatus().antiCollision,
        );
        domModule.renderGameboard(playerGameboard, "player"); // rerender player board and ships
        domModule.renderShips(playerGameboard, "player");

        qs(".ai-section").innerHTML = ""; // remove drag and drop ships and buttons
        domModule.renderAISectionElements(); // render containers for ai board and board name
        aiGameboard.randomShipPlacement( // place ai ships at random locations
          playerFactory().generateRandomCoord,
          aiGameboard.getFieldStatus().antiCollision,
        );
        domModule.renderGameboard(aiGameboard, "ai"); // render ai gameboard
        domModule.renderShips(aiGameboard, "ai"); // render ai ships
        domModule.toggleActive("ai"); // switch ai trun to false and start game
        qs(".ai-section").style.flexDirection = "row";
      });
  };

  return {
    modalAndInputEvents,
    dragAndDropEvents,
  };
})();
export default eventHandlers;
