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
import classNames from "classnames";

type Sources = { DOM: DOMSource; hands$: Stream<string[]> };
type Sinks = { DOM: Stream<VNode> };
export function hands(sources: Sources): Sinks {
  const sinks = {
    DOM: sources.hands$.map((hands) => {
      return (
        <div className="handsZone">
          {hands.map((hand) => handCardToSore(hand))}
        </div>
      );
    })
  };
  return sinks;
}

function handCardToSore(hand: string) {
  const handClass = classNames("hands", hand);
  return <div className={handClass}>{hand}</div>;
}
