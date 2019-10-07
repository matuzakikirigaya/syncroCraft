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

type Sources = {
  DOM: DOMSource;
  actions$: Stream<string[]>;
};
type Sinks = { DOM: Stream<VNode> };
export function actions(sources: Sources): Sinks {
  const sinks = {
    DOM: sources.actions$.map((actions) => (
      <div className="actionZone">
        {actions.map((action) => actionToSore(action))}
      </div>
    ))
  };
  return sinks;
}

function actionToSore(action: string): VNode {
  return <div className="action">{action}</div>;
}
