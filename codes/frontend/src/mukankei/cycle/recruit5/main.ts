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
  span,
  button,
  MainDOMSource
} from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
import xs, { Stream, Subscription } from "xstream";
import { run } from "@cycle/run";
import { Driver } from "@cycle/run/lib/cjs";
import { makeScrollDriver } from "./scrollDriver";

type Sources = {
  DOM: DOMSource;
  Scroll: Stream<number>;
};

type Sinks = {
  DOM: Stream<VNode>;
  Scroll: Stream<number>;
};

function render(offsetTop: number): VNode {
  return div(".scrollable", [
    div(".input-group.scrollable__control", [
      input(".scrollable__input.form-control", {
        props: {
          type: "number",
          value: offsetTop,
          min: 0
        }
      }),
      span(".input-group-btn", [
        button(".scrollable__button.btn.btn-primary", ["Go"])
      ])
    ]),
    span(".scrollable__output", [`${offsetTop} px`])
  ]);
}

/**
 * アプリケーション
 * @param {Sources} sources
 * @returns {Sinks}
 */
function main(sources: Sources): Sinks {
  const inputEvent$ = sources.DOM.select(".scrollable__input").events("input");
  const clickEvent$: Stream<Event> = sources.DOM.select(
    ".scrollable__button"
  ).events("click");

  const dom$ = sources.Scroll.startWith(0).map((offsetTop) =>
    render(offsetTop)
  );

  const offsetTop$ = clickEvent$
    .map((v1) =>
      inputEvent$
        .map((e: CycleDOMEvent) =>
          Number((e.ownerTarget as HTMLInputElement).value)
        )
        .map((v2) => v2)
    )
    .flatten();
  return {
    DOM: dom$,
    Scroll: offsetTop$
  };
}

const drivers: {
  DOM: Driver<Stream<VNode>, MainDOMSource>;
  Scroll: (offsetTop$: Stream<number>) => Stream<number>;
} = {
  DOM: makeDOMDriver("#app"),
  Scroll: makeScrollDriver()
};

export function start() {
  run(main, drivers);
}
