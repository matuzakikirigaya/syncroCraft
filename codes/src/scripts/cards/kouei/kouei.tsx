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
  import { Stream } from "xstream";
  
  type Sources = { DOM: DOMSource };
  type Sinks = { DOM: Stream<VNode> };
  export function main(sources: Sources): Sinks {
    const sinks = {
      DOM: sources.DOM.select(".slider")
        .events("mousedown")
        .debug("hoge")
        .map((ev: any) => (ev.target as HTMLInputElement).checked)
        .startWith(false)
        .map(() => (
          <div className="hoge">
            <div className="zennei">前衛</div>
            <div className="kouei">後衛</div>
            <div className="hands">手札</div>
            <div className="deck">デッキ</div>
          </div>
        ))
    };
    return sinks;
  }
  