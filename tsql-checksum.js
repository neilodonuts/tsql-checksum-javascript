
var xorcodes = [
    0, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30, 31,
    0, 33, 34, 35, 36, 37, 38, 39,  //  !"#$%&'
    40, 41, 42, 43, 44, 45, 46, 47,  // ()*+,-./
    132, 133, 134, 135, 136, 137, 138, 139,  // 01234567
    140, 141, 48, 49, 50, 51, 52, 53, 54,  // 89:;<=>?@
    142, 143, 144, 145, 146, 147, 148, 149,  // ABCDEFGH
    150, 151, 152, 153, 154, 155, 156, 157,  // IJKLMNOP
    158, 159, 160, 161, 162, 163, 164, 165,  // QRSTUVWX
    166, 167, 55, 56, 57, 58, 59, 60,  // YZ[\]^_`
    142, 143, 144, 145, 146, 147, 148, 149,  // abcdefgh
    150, 151, 152, 153, 154, 155, 156, 157,  // ijklmnop
    158, 159, 160, 161, 162, 163, 164, 165,  // qrstuvwx
    166, 167, 61, 62, 63, 64, 65, 66,  // yz{|}~
];

function rol(x, n) {
    // simulate a rotate shift left (>>> preserves the sign bit)
    return (x<<n) | (x>>>(32-n));
}

exports.checksum = function checksum(s) {
    var checksum = 0;
    for (var i = 0; i < s.length; i++) {
        checksum = rol(checksum, 4);

        var c = s.charCodeAt(i);
        var xorcode = 0;
        if (c < xorcodes.length) {
            xorcode = xorcodes[c];
        }
        checksum ^= xorcode;
    }
    return checksum;
};
