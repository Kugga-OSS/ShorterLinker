"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const promiseTest = () => new Promise((resolve, reject) => {
    resolve(1);
});
describe('Example async/await test', () => {
    it('awaits promise', async () => {
        const x = await promiseTest();
        chai_1.assert.equal(x, 1);
    });
});
//# sourceMappingURL=index.js.map