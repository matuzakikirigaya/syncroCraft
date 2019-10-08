import xs, { Stream } from "xstream";
import run from "@cycle/run";
import {
  VNode,
  makeDOMDriver,
  div,
  h3,
  button,
  pre,
  p,
  code
} from "@cycle/dom";
import {
  makeHTTPDriver,
  RequestInput,
  HTTPSource,
  Response
} from "@cycle/http";
import { DOMSource } from "@cycle/dom";
type SoAll = {
  DOM: DOMSource;
  HTTP: HTTPSource;
};

type SiAll = {
  DOM: Stream<VNode>;
  HTTP: Stream<RequestInput>;
};

type PageState = {
  response?: Object;
};

function render(pageState: PageState): VNode {
  return div(".container-fluid", [
    div(".row", [
      div(".col-5", [
        h3(["GET"]),
        button("#get-posts.btn.btn-info.btn-block", ["GET"]),
        p([
          code("http://jsonplaceholder.typicode.com/posts"),
          " API を叩きます。"
        ])
      ]),
      div(".col-7", [
        div(".card.bg-light", [
          div(".card-body", [
            pre([JSON.stringify(pageState.response, null, 2)])
          ])
        ])
      ])
    ])
  ]);
}

function main({ DOM, HTTP }: SoAll): SiAll {
  const eventClickGet$ = DOM.select("#get-posts").events("click");

  const request$ = Stream.from(eventClickGet$).mapTo({
    url: "http://jsonplaceholder.typicode.com/posts",
    category: "api"
  });

  const response$ = HTTP.select("api")
    .map((x) => x)
    .flatten();
  const defaultPageState: { response?: Response } = {};

  const pageState$: Stream<{ response?: Response }> = response$
    .map<{ response?: Response }>((response) => ({ response }))
    .startWith(defaultPageState);

  const dom$ = pageState$.map((pageState) => {
    return render(pageState);
  });

  return {
    DOM: dom$,
    HTTP: request$
  };
}

export function start() {
  run(main, {
    DOM: makeDOMDriver("#app"),
    HTTP: makeHTTPDriver()
  });
}
