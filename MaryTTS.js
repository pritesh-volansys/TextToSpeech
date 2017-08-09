var http = require('http');
var fs = require('fs');
let file_name = 'maryTTS.wav';
let file = fs.createWriteStream(file_name);

// get file path from command argument.
process.argv.forEach((val, index) => {
    let text;
    if (index === 2) {
        text = val;
        maryTTS(text);
    }
});

// Mary text to speech conversion.
function maryTTS(text) {
    let replaced = text.split(' ').join('+');
    if (replaced !== null) {
        let url = "http://mary.dfki.de:59125/process?INPUT_TEXT=" + replaced + "&INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&AUDIO=WAVE_FILE&LOCALE=en_US";
        const request = http.get(url, function (response) {
            response.pipe(file);
            console.log(file_name + " : downloaded successfully.");
        });
    }
}

