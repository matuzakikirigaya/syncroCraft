import xs, { Stream } from "xstream";
import { VNode, div } from "@cycle/dom";
import isolate from "@cycle/isolate";

type Sources = {
  props: {
    content$: Stream<VNode>;
    visibility$: Stream<boolean>;
  };
};

type Sinks = {
  DOM: Stream<VNode>;
};

function render(visible: boolean, transclude: VNode): VNode {
  return div(
    ".modal",
    {
      class: {
        "modal--visible": visible
      }
    },
    [div(".modal__content", [visible ? transclude : null])]
  );
}

function Component({ props }: Sources): Sinks {
  const view$: Stream<VNode> = xs
    .combine(props.visibility$.startWith(false), props.content$)
    .map((combined) => {
      const [visible, transclude] = combined;
      return render(visible, transclude);
    });

  return {
    DOM: view$
  };
}

export function ModalComponent({ props }: Sources): Sinks {
  return isolate(Component)({ props });
}
