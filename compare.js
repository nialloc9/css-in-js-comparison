const fs = require("fs");

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

const sc = getFilesizeInBytes("./dist/StyledComponents.js");
const st = getFilesizeInBytes("./dist/Styletron.js");
const em = getFilesizeInBytes("./dist/Emotion.js");

console.group()
    console.log("StyleComponents bundle size: " + sc + " bytes.")
    console.log("Styletron bundle size: " + st + " bytes.")
    console.log("Emotion bundle size: " + em + " bytes.")
console.groupEnd()