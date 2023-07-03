export function increment(num: number) {
    return num + 1;
  }

export const fn = (ary: number[]) => {
    ary.flatMap(function (n) { return [n, n + 1]; });
}
