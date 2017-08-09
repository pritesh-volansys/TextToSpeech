const fs = require('fs');
const request = require('request');

const clientId = 'test-app';                             // Can be anything
const clientSecret = '879a55ea55604ca193ab8c7c15424314'; // API key from Azure marketplace

// Get file path from command argument.
process.argv.forEach((val, index) => {
    var filename; // File path with name from command line.
    if (index === 2) {
        filename = val;
        processSTT(filename);
    }
});

// MS get token and start speech to text conversion
function processSTT(fileName) {
    request.post({
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'Ocp-Apim-Subscription-Key': clientSecret
        }
    }, function (err, resp, accessToken) {
        if (err || resp.statusCode != 200) {
            console.log(err, resp.body);
        } else {
            speechToText(fileName, accessToken, function (err, res) {
                if (err) return console.log(err);
                console.log('Confidence ' + res.results[0].confidence + ' for: "' + res.results[0].lexical + '"');
            });
        }
    });
}

// Get token from clientId,clientSecret with support of Bing speech API
function getAccessToken(clientId, clientSecret, callback) {
    request.post({
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
        form: {
            'grant_type': 'client_credentials',
            'client_id': encodeURIComponent(clientId),
            'client_secret': encodeURIComponent(clientSecret),
            'scope': 'https://speech.platform.bing.com'
        }
    }, function (err, resp, body) {
        if (err) return callback(err);
        try {
            var accessToken = JSON.parse(body).access_token;
            if (accessToken) {
                callback(null, accessToken);
            } else {
                callback(body);
            }
        } catch (e) {
            callback(e);
        }
    });
}

// MS speech to text conversion
function speechToText(filename, accessToken, callback) {
    fs.readFile(filename, function (err, waveData) {
        if (err) return callback(err);
        request.post({
            url: 'https://speech.platform.bing.com/recognize/query',
            qs: {
                'scenarios': 'ulm',
                'appid': 'D4D52672-91D7-4C74-8AD8-42B1D98141A5', // This magic value is required
                'locale': 'en-US',
                'device.os': 'wp7',
                'version': '3.0',
                'format': 'json',
                'requestid': '1d4b6030-9099-11e0-91e4-0800200c9a66', // can be anything
                'instanceid': '1d4b6030-9099-11e0-91e4-0800200c9a66' // can be anything
            },
            body: waveData,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'audio/wav; samplerate=16000',
                'Content-Length': waveData.length
            }
        }, function (err, resp, body) {
            if (err) return callback(err);
            try {
                callback(null, JSON.parse(body));
            } catch (e) {
                callback(e);
            }
        });
    });
}