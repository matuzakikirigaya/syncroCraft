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
  import "../../stylus/style.styl";
  import { run } from "@cycle/run";
  import { Stream } from "xstream";
  
  type Sources = { DOM: DOMSource };
  type Sinks = { DOM: Stream<VNode> };
  export function main(sources: Sources): Sinks {
    const sinks = {
      DOM: sources.DOM.select(".slider")
        .events("mousedown")
        .map((ev: any) => (ev.target as HTMLInputElement).checked)
        .startWith(false)
        .map(() => (
          <div className="hoge">
            <input className="slider" type="checkbox">
              aaaaaaaaaa
            </input>ああああああああああああああああ
          </div>
        ))
    };
    return sinks;
  }
