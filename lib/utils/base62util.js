"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let map = [];
for (let i = 0; i < 10; i++) {
    map.push(String(i));
}
for (let i = 0; i < 26; i++) {
    map.push(String.fromCharCode(i + 'A'.charCodeAt(0)));
}
for (let i = 0; i < 26; i++) {
    map.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
}
function nToBase62(num) {
    let res = '';
    while (num > 0) {
        res += map[num % 62];
        num = Math.floor(num / 62);
    }
    return res.split('').reverse().join('');
}
exports.nToBase62 = nToBase62;
function base62Ton(str) {
    let res = 0;
    for (let i = 0; i < str.length; i++) {
        let nNum = findIdx(str.charAt(i));
        let weight = str.length - i - 1;
        res += nNum * Math.pow(62, weight);
    }
    return res;
}
exports.base62Ton = base62Ton;
function findIdx(xhar) {
    for (let i = 0; i < map.length; i++) {
        if (map[i] === xhar) {
            return i;
        }
    }
    return -1;
}
//# sourceMappingURL=base62util.js.map