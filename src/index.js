/* eslint-disable no-unused-vars */
import style from "./style.css";
import addEvents from "./event-handlers/event-handler";
import { gameLoop } from "./game-loop/game-loop";
import domModule from "./DOM-modules/dom-module";

gameLoop();
domModule.renderModal();
addEvents();
