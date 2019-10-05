import { DOMSource, makeDOMDriver, VNode } from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
import "../stylus/style.styl";
import { run } from "@cycle/run";
import { Stream } from "xstream";
// import { main } from "./cards/main";
import { main } from "./ui/main";

run(main, {
  DOM: makeDOMDriver("#app")
});
