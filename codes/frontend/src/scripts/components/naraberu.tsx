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
  VNode,
  source
} from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
import xs, { Stream } from "xstream";
import { createReadStream } from "fs";
import className from "classnames";

type Sinks = { DOM: Stream<VNode> };

function actionToSore(action: string, sonota?: string) {
  const classmei = className(sonota);
  return <div className="action">{action}</div>;
}
