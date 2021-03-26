const $API = require('./../utils/api');
const Lzma = require("lzma");

// function base64ToArrayBuffer(base64) {
//     const binary_string = window.atob(base64);
//     const len = binary_string.length;
//     let bytes = new Uint8Array(len);
//     for (let i = 0; i < len; i++) {
//         bytes[i] = binary_string.charCodeAt(i);
//     }
//     return bytes.buffer;
// }

async function test() {
    const data = await $API('/get_replay', {b: '862642', u: 'Katxu'})
    let buff = new Buffer(data.content, 'base64');
    Lzma.decompress(buff, (result, error) => {
        console.log('result', result)
        console.log('error', error)
    });

}

module.exports = test;