import xs, { Stream, Subscription } from "xstream";
import { Observable } from "xstream";

export function makeScrollDriver() {
  return function ScrollDriver(offsetTop$: Stream<number>): Stream<number> {
    const source$:Stream<number> = xs.create();

    const scrollTo = ({
      destination,
      duration
    }: {
      destination: number;
      duration: number;
    }) => {
      const start = window.pageYOffset;
      const startTime = window.performance.now();

      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const destinationOffsetToScroll =
        documentHeight - destination < windowHeight
          ? documentHeight - windowHeight
          : destination;

      const scroll = () => {
        const now = window.performance.now();
        const time = Math.min(1, (now - startTime) / duration);
        window.scroll(
          0,
          Math.ceil(time * (destinationOffsetToScroll - start) + start)
        );

        if (window.pageYOffset === destinationOffsetToScroll) return;

        window.requestAnimationFrame(scroll);
      };

      scroll();
    };

    window.addEventListener("scroll", () =>
      source$.shamefullySendNext(window.pageYOffset)
    );

    xs.from(offsetTop$).addListener({
      next: (offsetTop: number) =>
        scrollTo({ destination: offsetTop, duration: 400 })
    });

    return source$;
  };
}
