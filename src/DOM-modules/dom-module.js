/* eslint-disable max-len */
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
      }),

      createElement("div", {
        class: "ai-section",
      }),

      createElement("div", {
        class: "turn-indicator",
        text: "Turn: ",
      }),
    );

    qs(".player-section").append(

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
    );

    qs(".ai-section").append(

      createElement("p", {
        class: "board-name",
        text: "ai - board",
      }),

      createElement("div", {
        class: "ai-board",
      }),
    );
  };

  const renderShips = (gameboard, owner) =>
  {
    gameboard.getShipsNames().forEach((shipName) =>
    {
      gameboard.getShips()[shipName]
        .getShipArea()
        .forEach((area) =>
        {
          qs(
            `[data-owner="${owner}"][data-firstcoord="${area[0]}"][data-secondcoord="${area[1]}"]`,
          )
            .classList
            .add("ship");
        });
    });
  };

  const renderHits = (gameboard, owner) =>
  {
    gameboard.getShipsNames().forEach((shipName) =>
    {
      gameboard.getShips()[shipName]
        .getShipBody()
        .forEach((area) =>
        {
          if (typeof (area) === "object")
          {
            const field = qs(`[data-owner="${owner}"][data-firstcoord="${area[0]}"][data-secondcoord="${area[1]}"]
            `);
            field.classList.add("hit");
            field.textContent = "🔥";
          }
        });
    });
  };

  const renderMissedAttacks = (gameboard, owner) =>
  {
    gameboard.getFieldStatus().missedAttacks.forEach((miss) =>
    {
      qs(`[data-owner="${owner}"][data-firstcoord="${miss[0]}"][data-secondcoord="${miss[1]}"]`)
        .textContent = "✘";
    });
  };

  const renderPlayerGameboard = (gameboard) =>
  {
    gameboard.getBoard().forEach((array, firstIndex) =>
    {
      qs(".player-board")
        .append(
          createElement("div", {
            class: "column",
            "data-column": `${firstIndex}`,
          }),
        );
    });

    qsa(".column").forEach((column, columnIndex) =>
    {
      let i = 0;
      while (i < 10)
      {
        column.append(
          createElement("div", {
            class: "field",
            "data-owner": "player",
            "data-firstCoord": `${columnIndex}`,
            "data-secondCoord": `${i}`,
          }),
        );
        i += 1;
      }
    });
    renderShips(gameboard, "player");
    renderHits(gameboard, "player");
    renderMissedAttacks(gameboard, "player");
  };

  const renderAIGameboard = (gameboard) =>
  {
    gameboard.getBoard().forEach((array, indexFirstCoord) =>
    {
      qs(".ai-board")
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
                    "data-owner": "ai",
                    "data-firstCoord": `${indexFirstCoord}`,
                    "data-secondCoord": `${indexSecondCoord}`,
                  }),
                );
              }),
            ),
        );
    });
    renderHits(gameboard, "ai");
    renderMissedAttacks(gameboard, "ai");
  };

  return {
    generateBasic,
    renderPlayerGameboard,
    renderAIGameboard,
  };
};

export default domModule;