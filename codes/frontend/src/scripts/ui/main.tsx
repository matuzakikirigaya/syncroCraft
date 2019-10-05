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
import * as Snabbdom from "snabbdom-pragma";
import "../../stylus/style.styl";
import xs, { Stream } from "xstream";
import { kouei as koueis } from "./kouei/kouei";
import { actions } from "./action/action";
import { zennei as zenneis } from "./zennei/zennei";
import { hands } from "./hands/hands";

type Sources = { DOM: DOMSource };
type Sinks = { DOM: Stream<VNode> };
export function main(sources: Sources): Sinks {
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
  const vnode$ = xs.combine(
    zenneiNoyatu$.DOM,
    koueisNoyatu$.DOM,
    handsNoyatsu$.DOM
  );
  const sinks = {
    DOM: vnode$.map(([zennei, kouei, hands]) => (
      <div className="hoge">
        <div className="zentai"></div>
        {zennei}
        {kouei}
        {hands}
        <div className="deckZone">デッキ</div>
      </div>
    ))
  };
  return sinks;
}
