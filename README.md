# Speech to Text & Text to speech in Node

This project for performing speech recognition and text to speech, with support for several engines and APIs

### Paid Speech recognition APIs support:

* Microsoft Bing Voice Recognition [Link](https://azure.microsoft.com/en-in/services/cognitive-services/speech/)
* IBM Speech Recognition [Link](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html)
* Google Cloud Speech API [Link](https://cloud.google.com/speech)

### Open source Text to speech support:

* ESpeck [Link](http://espeak.sourceforge.net)
* MaryTTS [Link](http://mary.dfki.de)

## Install package

**NPM package**

```
$ npm install
```

### Speech to text paid APIs :

IBM :

* Create new user : [Link](https://console.bluemix.net/)
* Get user and password detail :  [Link](https://console.bluemix.net/catalog/services/speech-to-text?env_id=ibm:yp:au-syd&taxonomyNavigation=services)

```
$ npm install watson-developer-cloud --save
```

Bing Speech API :

* Get API Key : [Link](https://azure.microsoft.com/en-us/try/cognitive-services/?productId=%2Fproducts%2FBing.Speech.Preview)

### Open source Text to speech  :

ESpeck :

```
$ sudo apt-get install espeak
$ npm install espeak
```

MaryTTS :

* Get latest version of MaryTTS 5.2 : [click here](http://mary.dfki.de/download/index.html)
* After install MaryTTS [link](http://localhost:59125)
* Online MaryTTS [link](http://mary.dfki.de:59125)

## Usage


### Speech to text :

IBM :

```
$ node IBM.js ".wav file path & name"
```
Example :

```
$ node IBM.js /home/pritesh/Priteshdtl/Lumin_Project/wav/test3.wav
```
Result : Check console log with your converted text.

Bing Speech API :


```
$ node MS.js ".wav file path & name"
```

Example :

```
$ node MS.js /home/pritesh/Priteshdtl/Lumin_Project/wav/test3.wav
```

Result : Check console log with your converted text.

### Text to speech :

ESpeck :

```
$ node eSpeak.js  "your text"
```

Result : It will speak the converted wav file.

MaryTTS :

```
$ node MaryTTS.js "your text"
```
Result : It will download the .wav file on API path.

