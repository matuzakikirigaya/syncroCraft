import { DOMSource, makeDOMDriver, VNode } from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
import "../stylus/style.styl";
import { run } from "@cycle/run";
import { Stream } from "xstream";
import { start } from "./ui/main";
// import { start } from "../mukankei/cycle/recruit5/main"; // カーソルのやつ

// run(main, {
//   DOM: makeDOMDriver("#app")
// });

start();