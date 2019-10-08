import xs, { Stream } from "xstream";
export const withLatestfrom: <T, S, M>(
  a$: Stream<T>,
  bs$: Stream<S[]>,
  f: (c: T, d: S[]) => M
) => Stream<M> = (a$, bs$, f) =>
  bs$
    .map((bs) =>
      a$.map((a) => {
        return f(a, bs);
      })
    )
    .flatten();

// 参考にしたのは `https://github.com/staltz/xstream/issues/102`