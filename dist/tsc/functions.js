export function increment(num) {
    return num + 1;
}
export var fn = function (ary) {
    ary.flatMap(function (n) { return [n, n + 1]; });
};
