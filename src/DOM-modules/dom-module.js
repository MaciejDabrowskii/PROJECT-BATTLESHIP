/* eslint-disable no-dupe-keys */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  qs, qsa, addGlobalEventListener, createElement,
} from "../utility-fns/utility-fns";

const domModule = (() =>
{
  let playerName = "";

  const editPlayerName = () =>
  {
    playerName = qs("input").value;
  };

  const renderBasic = () =>
  {
    document.body.append(
      createElement("div", {
        class: "wrapper",
      }),

    );

    qs(".wrapper").append(

      createElement("h1", {
        text: "Battle Ship",
        class: "header",
      }),

      createElement("div", {
        class: "player-name-input-container",
      }),

      createElement("div", {
        class: "game-contents",
      }),

      createElement("div", {
        class: "turn-indicator",
      }),
    );

    qs(".player-name-input-container").append(

      createElement("label", {
        for: "text",
        text: "Enter player name:",
      }),

      createElement("input", {
        type: "text",
        id: "player-name",
      }),

    );

    qs(".turn-indicator").append(
      createElement("h3", {
        text: "Turn: ",
        class: "turn-indicator-header",
      }),

      createElement("div", {
        class: "turn-indicator-player",
      }),
    );

    qs(".game-contents").append(

      createElement("div", {
        class: "player-section",
      }),

      createElement("div", {
        class: "ai-section",
      }),
    );

    qs(".player-section").append(

      createElement("p", {
        text: `${playerName} - board`,
        class: "board-name",
        id: "board-name-player",
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

    switch (qs(".modal-body"))
    {
      case null:
        document.body.append(

          createElement("div", {
            class: "modal-body",
            id: "modal-body",
          }),

          createElement("div", {
            id: "overlay",
          }),
        );

        qs(".modal-body").append(
          createElement("button", {
            class: "modal-btn",
            id: "modal-btn",

          }),
          createElement("h3", {
            class: "modal-text",
            id: "modal-text",
          }),
        );
        qs(".modal-btn").innerHTML = "&times";
        break;

      default:
    }
  };

  const reRenderPlayerBoardName = () =>
  {
    qs("#board-name-player").textContent = `${playerName} - board`;
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

  const renderGameboard = (gameboard, owner) =>
  {
    qs(`.${owner}-board`).innerHTML = "";

    gameboard.getBoard().forEach((array, firstIndex) =>
    {
      qs(`.${owner}-board`)
        .append(
          createElement("div", {
            class: "column",
            "data-column": `${firstIndex}`,
            "data-owner": `${owner}`,
          }),
        );
    });

    qsa(`.column[data-owner="${owner}"]`).forEach((column, columnIndex) =>
    {
      let i = 0;
      while (i < 10)
      {
        column.append(
          createElement("div", {
            class: "field",
            "data-owner": `${owner}`,
            "data-firstCoord": `${columnIndex}`,
            "data-secondCoord": `${i}`,
          }),
        );
        i += 1;
      }
    });
    renderHits(gameboard, `${owner}`);
    renderMissedAttacks(gameboard, `${owner}`);
  };

  const turnIndicator = (playerTurn) =>
  {
    switch (playerTurn)
    {
      case true:
        qs(".turn-indicator-player").textContent = playerName;
        break;
      case false:
        qs(".turn-indicator-player").textContent = "AI";
        break;
      default:
    }
  };

  const anounceResoult = (resoult) =>
  {
    let resoultMessage = "";
    switch (resoult)
    {
      case "victory": resoultMessage = "CONGRATULATIONS, YOU WON!";
        break;

      case "defeat": resoultMessage = "YOU HAVE BEEN DEFEATED!";
        break;

      default:
    }

    qs(".modal-body").classList.add("active");
    qs("#overlay").classList.add("active");
    qs(".modal-text").textContent = resoultMessage;
  };

  return {
    renderBasic,
    // renderModal,
    renderGameboard,
    renderShips,
    reRenderPlayerBoardName,
    editPlayerName,
    turnIndicator,
    anounceResoult,
  };
})();

export default domModule;
