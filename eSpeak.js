const espeak = require('espeak'),
    wav = require('wav'),
    Speaker = require('speaker');

// get file path from command argument.
process.argv.forEach((val, index) => {
    let text;
    if (index !== null && index === 2) {
        text = val;
        espeakSupport(text);
    }
});


function espeakSupport(text) {
    // optionally add custom cli arguments for things such as pitch, speed, wordgap, etc.
    espeak.speak(text, ['-p 10', '-s 120', '-g 2'], function (err, speak_data) {
        if (err) return console.error(err);

        // get the raw binary wav data
        let buffer = speak_data.buffer;

        try {
            let reader = new wav.Reader();
            reader.on('format', function (format) {
                reader.pipe(new Speaker(format));
            });
            let Readable = require('stream').Readable;
            let s = new Readable();
            s.push(buffer);
            s.push(null);
            s.pipe(reader);
        } catch (e) {
            console.log(e.message);
        }
    });
}