import xs, { Stream } from "xstream";
import {
  VNode,
  div,
  makeDOMDriver,
  button,
  span,
  h4,
  header,
  h2,
  hr,
  pre,
  code,
  p,
  img
} from "@cycle/dom";
import { DOMSource } from "@cycle/dom";
import { run } from "@cycle/run";
import { ModalComponent } from "./modalComponent";

type Sources = {
  DOM: DOMSource;
};

type Sinks = {
  DOM: Stream<VNode>;
};

export function main(sources: Sources): Sinks {
  const modal = ModalComponent({
    props: {
      // モーダルの前面に表示する DOM 要素
      content$: xs.of(
        div(".container", [
          div(".row", [
            div(".col-sm-6.col-sm-offset-3", [
              div(".panel.panel-default", [
                header(".panel-heading", [
                  button("#dialog-close.close", [span("×")]),
                  h4(".panel-title", "Dummy text")
                ]),
                div(".panel-body", [p("Vivamus suscipit ...")])
              ])
            ])
          ])
        ])
      ),
      // モーダルを表示するかどうか
      visibility$: xs
        .merge(
          sources.DOM.select("#dialog-open")
            .events("click")
            .mapTo(true),
          sources.DOM.select("#dialog-close")
            .events("click")
            .mapTo(false)
        )
        .startWith(false)
    }
  });

  return {
    DOM: xs.from(modal.DOM).map((modalDOM) => {
      return div(".container", [
        h2(".page-header", "Modal"),
        div([button("#dialog-open.btn.btn-default", "Open"), modalDOM])
      ]);
    })
  };
}

