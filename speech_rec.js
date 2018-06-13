var SpeechRecognition = (
  window.SpeechRecognition ||
  window.webkitSpeechRecognition
);
recognizing = false
// Create a new recognizer
var recognizer = new SpeechRecognition();
var ignore_onend;
// Start producing results before the person has finished speaking
recognizer.interimResults = true;
recognizer.continuous = true;

// Set the language of the recognizer
recognizer.lang = lang_select;

recognizer.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
  }

// Define a callback to process results
recognizer.onresult = function (event) {
  var interim_transcript = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        rec_area.innerHTML = final_transcript
      } else {
        interim_transcript += event.results[i][0].transcript;
        rec_area.innerHTML = interim_transcript
      }
    }

};

function startButton(event) {
   final_transcript = '';
  if (recognizing) {
    rec_button.innerHTML = 'Record'
    rec_button.class="btn btn-outline-danger"
    recognizing = false
    recognizer.stop();
    return;
  }
  ignore_onend = false;
  var interim_transcript = '';
  recognizing = true
  rec_button.class="btn btn-warning"
  rec_button.innerHTML = 'Recording'
  recognizer.start();
  rec_area.innerHTML = interim_transcript

  }
