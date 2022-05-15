/* eslint-disable no-dupe-keys */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  qs,
  qsa,
  addGlobalEventListener,
  createElement,
} from "../utility-fns/utility-fns";
import titleShip from "../asets/imgs/title-ship.png";
import logo from "../asets/imgs/github-icon.svg";

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
      createElement("img", {
        class: "logo",
        id: "logo-color",
        src: logo,
      }),
    );

    qs(".wrapper")
      .append(
        createElement("h1", {
          text: "BATTLESHIP",
          class: "header",
        }),
        createElement("img", {
          class: "title-ship-img",
          src: titleShip,
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

    qs(".player-name-input-container")
      .append(
        createElement("label", {
          for: "text",
          text: "Enter player name:",
        }),

        createElement("input", {
          type: "text",
          id: "player-name",
          placeholder: "Enter your name",
        }),
      );

    qs(".turn-indicator")
      .append(
        createElement("h3", {
          text: "Turn: ",
          class: "turn-indicator-header",
        }),

        createElement("div", {
          class: "turn-indicator-player",
        }),
      );

    qs(".game-contents")
      .append(
        createElement("div", {
          class: "player-section",
        }),

        createElement("div", {
          class: "ai-section",
        }),
      );

    qs(".player-section")
      .append(
        createElement("p", {
          text: `${playerName}  BOARD`,
          class: "board-name",
          id: "board-name-player",
        }),

        createElement("div", {
          class: "player-board",
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

        qs(".modal-body")
          .append(
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

  const renderAISectionElements = () =>
  {
    qs(".ai-section")
      .append(
        createElement("p", {
          class: "board-name",
          text: "AI  BOARD",
        }),

        createElement("div", {
          class: "ai-board",
        }),
      );
  };

  const renderDragAndDropItems = (gameboard) =>
  {
    qs(".ai-section")
      .append(
        createElement("div", {
          class: "ship-deploy",
        }),
      );

    qs(".ship-deploy")
      .append(
        createElement("div", {
          class: "ships-to-drop",
        }),

        createElement("div", {
          class: "buttons-container",
        }),
      );

    qs(".buttons-container")
      .append(
        createElement("button", {
          class: "change-orientation-btn",
          text: "Change orientation",
        }),

        createElement("button", {
          class: "confirm-layout-btn",
          text: "Confirm layout",
        }),

        createElement("button", {
          class: "random-btn",
          text: "Random!",
        }),
      );

    gameboard.getShipsNames()
      .forEach((ship) =>
      {
        qs(".ships-to-drop")
          .append(
            createElement("div", {
              class: "ship-drag",
              id: `${ship}`,
              draggable: "true",
            }),
          );
      });

    gameboard.getShipsNames()
      .forEach((ship) =>
      {
        for (let i = 0; i < gameboard.getShips()[ship].length; i += 1)
        {
          qs(`#${ship}`)
            .append(
              createElement("div", {
                class: "ship-body-el",
              }),
            );
        }
      });
  };

  const reRenderPlayerBoardName = () =>
  {
    qs("#board-name-player").textContent = `${playerName}  BOARD`;
  };

  const renderShips = (gameboard, owner) =>
  {
    gameboard.getShipsNames()
      .forEach((shipName) =>
      {
        if (
          "getShipArea" in gameboard.getShips()[shipName]
        && owner === "player"
        )
        {
          gameboard
            .getShips()[shipName].getShipArea()
            .forEach((area) =>
            {
              qs(
                `[data-owner="${owner}"][data-firstcoord="${area[0]}"][data-secondcoord="${area[1]}"]`,
              ).classList.add("ship");
            });
        }
      });
  };

  const renderHits = (gameboard, owner) =>
  {
    gameboard.getShipsNames()
      .forEach((shipName) =>
      {
        if ("getShipBody" in gameboard.getShips()[shipName])
        {
          gameboard
            .getShips()[shipName].getShipBody()
            .forEach((area) =>
            {
              if (typeof area === "object")
              {
                const field = qs(`[data-owner="${owner}"][data-firstcoord="${area[0]}"][data-secondcoord="${area[1]}"]
            `);
                field.classList.add("hit", "ship");
                field.textContent = "🔥";
              }
            });
        }
      });
  };

  const renderMissedAttacks = (gameboard, owner) =>
  {
    gameboard.getFieldStatus().missedAttacks.forEach((miss) =>
    {
      qs(
        `[data-owner="${owner}"][data-firstcoord="${miss[0]}"][data-secondcoord="${miss[1]}"]`,
      ).textContent = "✘";
      qs(
        `[data-owner="${owner}"][data-firstcoord="${miss[0]}"][data-secondcoord="${miss[1]}"]`,
      ).classList.add("miss");
    });
  };

  const renderGameboard = (gameboard, owner) =>
  {
    qs(`.${owner}-board`).innerHTML = "";

    gameboard.getBoard()
      .forEach((array, firstIndex) =>
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

    qsa(`.column[data-owner="${owner}"]`)
      .forEach((column, columnIndex) =>
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
    renderShips(gameboard, `${owner}`);
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
      case "victory":
        resoultMessage = "CONGRATULATIONS, YOU WON!";
        break;

      case "defeat":
        resoultMessage = "YOU HAVE BEEN DEFEATED!";
        break;

      default:
    }

    qs(".modal-body").classList.add("active");
    qs("#overlay").classList.add("active");
    qs(".modal-text").textContent = resoultMessage;
  };

  const toggleActive = (owner) =>
  {
    qs(`.${owner}-board`).classList.toggle("active");
  };

  return {
    renderShips,
    renderBasic,
    toggleActive,
    renderGameboard,
    renderAISectionElements,
    reRenderPlayerBoardName,
    editPlayerName,
    turnIndicator,
    anounceResoult,
    renderDragAndDropItems,
  };
})();

export default domModule;
