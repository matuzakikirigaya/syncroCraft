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
export function zennei(sources: Sources): Sinks {
  const sinks = {
    DOM: sources.cards$.map((cards) => {
      return (
        <div className="zenneiZone">
          {cards.map((zenneiCard) => zenneiCardToSore(zenneiCard))}
        </div>
      );
    })
  };
  return sinks;
}

function zenneiCardToSore(zennei: string) {
  const zenneiClass = classNames("zennei", zennei);
  return <div className={zenneiClass}>{zennei}</div>;
}
