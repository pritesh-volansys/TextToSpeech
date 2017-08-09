function convertAudioToText(flacFile, languageCode) {
  
  var file = DriveApp.getFilesByName(flacFile).next();
  var bytes = file.getBlob().getBytes();
  
  var payload = {
    config:{
      encoding: "LINEAR16",
      sampleRate: 16000,
      languageCode: languageCode || "en-US"
    },
    audio: {
      // You may also upload the audio file to Google 
      // Cloud Storage and pass the object URL here
      content:Utilities.base64Encode(bytes)
    }
  };
  
  // Replace XYZ with your Cloud Speech API key
  var response = UrlFetchApp.fetch(
    "https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=XYZ", {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
  
  Logger.log(response.getContentText());
  
}