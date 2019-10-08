import { DOMSource, makeDOMDriver, VNode } from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
import "../stylus/style.styl";
import { run } from "@cycle/run";
import { Stream } from "xstream";
//import { start } from "./ui/main";
import { start as start1 } from "../mukankei/cycle/recruit8/main";
import { start as start2 } from "../mukankei/cycle/recruit8/main2"; // カーソルのやつ


// run(main, {
//   DOM: makeDOMDriver("#app")
// });

start2();
start1();
