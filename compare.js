const fs = require("fs");

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

const sc = getFilesizeInBytes("./dist/StyledComponents.js");
const st = getFilesizeInBytes("./dist/Styletron.js");
const em = getFilesizeInBytes("./dist/Emotion.js");
const jss = getFilesizeInBytes("./dist/Jss.js");

console.group()
    console.log("styled-components bundle size: " + sc + " bytes.")
    console.log("styletron bundle size: " + st + " bytes.")
    console.log("emotion bundle size: " + em + " bytes.")
    console.log("react-jss: " + jss + " bytes.")
console.groupEnd()