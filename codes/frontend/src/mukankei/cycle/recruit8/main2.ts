import xs, { Stream } from "xstream";
import run from "@cycle/run";
import {
  VNode,
  makeDOMDriver,
  div,
  h3,
  button,
  pre,
  input,
  textarea
} from "@cycle/dom";
import {
  makeHTTPDriver,
  RequestInput,
  HTTPSource,
  Response
} from "@cycle/http";
import { DOMSource, CycleDOMEvent } from "@cycle/dom";
import { withLatestfrom } from "../../../lib/xstreamXtension/withLatestfrom";

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
        h3(["POST"]),
        div(".form-group", [
          input("#post-title.form-control", {
            attrs: {
              placeholder: "Title ..."
            }
          })
        ]),
        div(".form-group", [
          textarea("#post-body.form-control", {
            attrs: {
              rows: 6
            }
          })
        ]),
        button("#post.btn.btn-outline-primary.btn-block", ["POST"])
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
  const eventClickPost$ = DOM.select("#post").events("click");
  const eventInputPostTitle$ = DOM.select("#post-title").events("input");
  const eventInputPostBody$ = DOM.select("#post-body").events("input");

  const Anoyatu = xs.from(eventClickPost$);
  const Bnoyatu = xs.combine(
    eventInputPostTitle$.map(
      (e: CycleDOMEvent) => (e.ownerTarget as HTMLInputElement).value
    ),
    eventInputPostBody$.map(
      (e: CycleDOMEvent) => (e.ownerTarget as HTMLInputElement).value
    )
  );
  const f = (_: any, [postTitle, postBody]: String[]) => ({
    url: "http://jsonplaceholder.typicode.com/posts",
    category: "api",
    method: "POST",
    send: {
      id: 1,
      title: postTitle,
      body: postBody
    }
  });
  // const request$ = Bnoyatu.map((b) => Anoyatu.map((a) => f(a, b))).flatten();  // withlatestfromのやつでこういう形にするらしい かなり苦労して作った。まる
  const request$ = withLatestfrom(Anoyatu, Bnoyatu, f);

  // );
  // const request$ = xs
  //     .from(eventClickPost$)
  //     .withLatestFrom(
  //     eventInputPostTitle$.map(
  //         (e: CycleDOMEvent) => (e.ownerTarget as HTMLInputElement).value
  //     ),
  //     eventInputPostBody$.map(
  //         (e: CycleDOMEvent) => (e.ownerTarget as HTMLInputElement).value
  //     ),
  //     (_, postTitle, postBody) => ({
  //         url: "http://jsonplaceholder.typicode.com/posts",
  //         category: "api",
  //         method: "POST",
  //         send: {
  //         id: 1,
  //         title: postTitle,
  //         body: postBody
  //         }
  //     })
  //     );

  const response$: Stream<Response> = HTTP.select("api")
    .map((x) => x)
    .flatten();

  const defaultPageState = {};
  const pageState$: Stream<{ response?: Response }> = response$
    .map<{ response?: Response }>((response) => ({ response }))
    .startWith(defaultPageState);

  const dom$ = pageState$.map((pageState) => render(pageState));

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
