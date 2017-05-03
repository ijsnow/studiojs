# Recorder.js

An easy to use audio recorder with on Matt Diamond's
[recorderjs](https://github.com/mattdiamond/Recorderjs) at the core.

## Installation

```
yarn add recorder-js # or npm install recorder-js --save
```

## Usage

```javascript
import Recorder from 'recorder-js';

const audioContext =  new (window.AudioContext || window.webkitAudioContext)();

const recorder = new Recorder(audioContext, {
  // An array of 255 Numbers
  // You can use this to visualize the audio stream
  // If you use react, check out react-wave-stream
  onAnalysed: data => console.log(data),
});

let isRecording = false;
let blob = null;

navigator.mediaDevices.getUserMedia({audio: true})
  .then(stream => recorder.init(stream))
  .catch(err => console.log('Uh oh... unable to get stream...', err));

function startRecording() {
  recorder.start()
    .then(() => isRecording = true));
}

function stopRecording() {
  recorder.stop()
    .then(({blob, buffer}) => {
      blob = blob;

      // buffer is an AudioBuffer
    }));
}

function download() {
  Recorder.download(blob, 'my-audio-file'); // downloads a .wav file
}
```

### Cool stuff that helped me out

- https://github.com/mattdiamond/Recorderjs
- https://github.com/cwilso/AudioRecorder
- https://codepen.io/zapplebee/pen/gbNbZE
