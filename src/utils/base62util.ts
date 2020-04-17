
let map: Array<String> = [];
for (let i = 0; i < 10; i++) {
    map.push(String(i));
}
for (let i = 0; i < 26; i++) {
    map.push(String.fromCharCode(i + 'A'.charCodeAt(0)));
}
for (let i = 0; i < 26; i++) {
    map.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
}

export function nToBase62(num: number): string {
    let res = '';
    while (num > 0) {
        res += map[num%62];
        num = Math.floor(num/62);
    }
    return res.split('').reverse().join('');
}

export function base62Ton(str: string): number {
    let res = 0;
    for (let i = 0; i < str.length; i++) {
        let nNum = findIdx(str.charAt(i));
        let weight = str.length - i - 1;
        res += nNum * Math.pow(62, weight);
    }
    return res;
}

function findIdx(xhar: string): number {
    for (let i = 0; i < map.length; i++) {
        if (map[i] === xhar) {
            return i;
        }
    }
    return -1;
}