const request = require('request'),
    fs = require('fs'),
    SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1'),
    config = require('./Config');


// get file path from command argument.
process.argv.forEach((val, index) => {
    let filename;    // File path from command line.
    if (index === 2) {
        filename = val;
        speechToText(filename);
    }
});

// IBM speech to text conversion
function speechToText(filename) { 
    // User name and password from your IBM account.   
    let speech_to_text = new SpeechToTextV1({
        username: config.ibmUserName,
        password: config.ibmPassword
    });

    let params_STT = {
        audio: fs.createReadStream(filename),
        content_type: 'audio/wav',
        timestamps: true,
        word_alternatives_threshold: 0.9,
        keywords: ['colorado', 'tornado', 'tornadoes'],
        keywords_threshold: 0.5
    };

    speech_to_text.recognize(params_STT, function (error, transcript) {
        if (error)
            console.log('Error:', error);
        else {                        
            if(transcript.results[0].final){                
                console.log( "Converted result :" +  transcript.results[0].alternatives[0].transcript);                                
            }
            else{
                console.log('Not covnerted proper, need to chcek file details');
            }
            
        }
    });
}