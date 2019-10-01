import {
  DOMSource,
  makeDOMDriver,
  VNode
} from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
import "../stylus/style.styl";
import { run } from "@cycle/run";
import { Stream } from "xstream";
import { main } from "./entries/main"

run(main, {
  DOM: makeDOMDriver("#app")
});
