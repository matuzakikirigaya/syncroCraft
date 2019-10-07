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
  MainDOMSource
} from "@cycle/dom";
import * as Snabbdom from "snabbdom-pragma";
import "../../stylus/style.styl";
import xs, { Stream } from "xstream";
import { kouei as koueis } from "./kouei/kouei";
import { actions } from "./action/action";
import { zennei as zenneis } from "./zennei/zennei";
import { hands } from "./hands/hands";
import { run, Driver } from "@cycle/run";

type Sources = { DOM: DOMSource; inputActions$: Stream<string[]> };
type Sinks = { DOM: Stream<VNode>; outputActions$: Stream<string[]> };
export function main(sources: Sources): Sinks {
  const { DOM, inputActions$ } = sources;
  const inputtation$ = xs
    .merge(
      sources.inputActions$,
      DOM.select(".hands")
        .events("click")
        .mapTo(["ま", "み"])
    )
    .startWith(["0"]);
  const zenneiNoyatu$ = zenneis({
    DOM: sources.DOM,
    cards$: xs.of(["切り込み隊長", "アース", "増殖するG"])
  });
  const koueisNoyatu$ = koueis({
    DOM: sources.DOM,
    cards$: xs.of(["ハイドラ", "ブルード"])
  });
  const handsNoyatsu$ = hands({
    DOM: sources.DOM,
    hands$: xs.of(["スカラベの神", "ジェイス", "復活する太陽"])
  });
  const actionsNoyatsu$ = actions({
    DOM: sources.DOM,
    actions$: xs.of(["攻撃", "防御", "なんとか"])
  });
  const vnode$ = xs.combine(
    zenneiNoyatu$.DOM,
    koueisNoyatu$.DOM,
    handsNoyatsu$.DOM,
    actionsNoyatsu$.DOM
  );
  const hoge$ = inputtation$
    .map((actions) =>
      vnode$.map(([zenneis, koueis, hands]) => (
        <div className="hoge">
          {/* <div className="zentai"></div> */}
          {zenneis}
          {koueis}
          {hands}
          {actions}
          <div className="deckZone">デッキ</div>
        </div>
      ))
    )
    .flatten();
  const sinks = {
    DOM: hoge$,
    outputActions$: inputtation$
  };
  return sinks;
}
const drivers: {
  DOM: Driver<Stream<VNode>, MainDOMSource>;
  outputActions$: (a: Stream<string[]>) => Stream<string[]>;
  inputActions$: (a: Stream<string[]>) => Stream<string[]>;
} = {
  DOM: makeDOMDriver("#app"),
  outputActions$: (a) => a,
  inputActions$: (a) => a
};

export function start() {
  run(main, drivers);
}
