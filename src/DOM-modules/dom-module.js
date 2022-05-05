/* eslint-disable no-unused-vars */
import {
  qs, qsa, addGlobalEventListener, createElement,
} from "../utility-fns/utility-fns";

const domModule = () =>
{
  const generateBasic = () =>
  {
    document.body.append(
      createElement("div", {
        class: "wrapper",
      }),
    );

    qs(".wrapper").append(

      createElement("div", {
        class: "player-section",
      }).append(

        createElement("input", {
          type: "text",
          id: "player-name",
        }),

        createElement("p", {
          text: "- board",
          class: "board-name",
        }),

        createElement("div", {
          class: "player-board",
        }),
      ),

      createElement("div", {
        class: "ai-section",
      }).append(

        createElement("p", {
          class: "board-name",
          text: "ai - board",
        }),

        createElement("div", {
          class: "ai-board",
        }),
      ),

      createElement("div", {
        class: "turn-indicator",
        text: "Turn: ",
      }),
    );
  };

  const renderGameboard = (board) =>
  {
    board.getBoard().forEach((array, indexFirstCoord) =>
    {
      qs(".player-board")
        .append(
          createElement("div", {
            class: "column",
            "data-column": `${indexFirstCoord}`,
          })
            .append(
              array.forEach((field, indexSecondCoord) =>
              {
                qs(`[data-column=${indexFirstCoord}]`).append(
                  createElement("div", {
                    class: "field",
                    "data-firstCoord": `${indexFirstCoord}`,
                    "data-secondCoord": `${indexSecondCoord}`,
                  }),
                );
              }),
            ),
        );
    });
  };

  const renderShips = (gameboard) =>
  {
    gameboard.getShipsNames().forEach((shipName) =>
    {
      gameboard.getShips().shipName.getShipArea().forEach((area) =>
      {
        qs(`[data-firstCoord='${area[0]}'][data-secondCoord='${area[1]}']`);
      });
    });
  };
  return {
    generateBasic,
    renderGameboard,
  };
};

export default domModule;
