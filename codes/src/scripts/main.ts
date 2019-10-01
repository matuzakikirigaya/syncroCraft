import {
  DOMSource,
  makeDOMDriver,
  CycleDOMEvent,
  div,
  h1,
  hr,
  input,
  label,
  p,
  VNode
} from "@cycle/dom";
import { css } from "emotion";
import * as Snabbdom from "snabbdom-pragma";
import "../stylus/style.styl";
import { run } from "@cycle/run";
import { Stream } from "xstream";
import { main } from "./entries/main"

type Sources = { DOM: DOMSource };
type Sinks = { DOM: Stream<VNode> };

run(main, {
  DOM: makeDOMDriver("#app")
});
