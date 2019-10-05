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

type Sources = { DOM: DOMSource; cards$: Stream<string[]> };
type Sinks = { DOM: Stream<VNode> };
export function kouei(sources: Sources): Sinks {
  const sinks = {
    DOM: sources.cards$.map((cards) => {
      return (
        <div className="koueiZone">
          {cards.map((koueiCard) => koueiCardToSore(koueiCard))}
        </div>
      );
    })
  };
  return sinks;
}

function koueiCardToSore(kouei: string) {
  const koueiKurasu = classNames("kouei", kouei);
  return (
    <div className={koueiKurasu}>
      {kouei}
      <div className="koueiHover --visible">ほげ</div>
    </div>
  );
}
