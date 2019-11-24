const tsqlChecksum = require('./tsql-checksum.js').checksum;
const assert = require('assert');

var tests = [
    {s: String.fromCharCode(1,1,1,1,1,1,1), expected: 17895697, note: "7x binary 1's"},
    {s: String.fromCharCode(1,1,1,1,1,1,1,1), expected: 286331153, note: "8x binary 1's"},
    {s: String.fromCharCode(15,15,15,15,15,15,15,15), expected: -1, note: "8x binary 15's"},
    {s: String.fromCharCode(16,16,16,16,16,16,16), expected: 286331152, note: "7x binary 16's"},
    {s: String.fromCharCode(16,16,16,16,16,16,16,16), expected: 286331153, note: "8x binary 16's"},
    {s: String.fromCharCode(1,1,1,1,1,1,1,1,1), expected: 286331152, note: "9x binary 1's"},
    {s: "aaaaaaa", expected: -2040109458, note: "ASCII short string"},
    {s: "aaaaaaaa", expected: 1717986918, note: "ASCII overflow"},
]

for (let i = 0; i < tests.length; i++) {
    console.log("TEST " + i + ": checksum('" + tests[i].s + "') == " +
                tests[i].expected + "; " + tests[i].note);
    assert.strictEqual(tsqlChecksum(tests[i].s), tests[i].expected);
}
