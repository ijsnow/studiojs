import React, {Component} from 'react';

import Waveform from './Waveform';

import Recorder from '../../../recorder/lib/Recorder';
import Analyser from '../../../analyser/lib/Analyser';

class RecordingStudio extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      blob: null,
      isRecording: false,
      waveData: new Array(255).fill(0),
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.download = this.download.bind(this);

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

    this.recorder = new Recorder();
    this.analyser = new Analyser(this.audioContext, {
      step: 255,
      onAnalysed: this.gotAnalyseData.bind(this),
    });
  }

  start() {
    navigator.mediaDevices.getUserMedia({audio:true})
      .then((stream) => {
        this.recorder.start(this.audioContext, stream)
          .then(mic => mic.connect(this.analyser.get()))
          .then(() => this.analyser.start())
          .then(() => this.setState({isRecording: true}));
      })
      .catch(this.dontGotStream);
  }

  stop() {
    this.recorder.stop()
      .then(({blob}) => this.setState({
        isRecording: false,
        blob,
      }));

    this.analyser.stop();
  }

  dontGotStream(error) {
    console.log('Get stream failed', error);
  }

  download() {
    const a = document.createElement('a');

    a.style = 'display: none';
    document.body.appendChild(a);

    var url = window.URL.createObjectURL(this.state.blob);

    a.href = url;
    a.download = 'react-audio.wav';
    a.click();

    window.URL.revokeObjectURL(url);

    document.body.removeChild(a);

    this.setState({blob: null});
  }

  gotAnalyseData(datum, locationIndex) {
    const waveData = this.state.waveData;

    waveData[locationIndex] = datum;

    this.setState({
      waveData,
    });
  }

  render() {
    const {
      isRecording,
      blob,
    } = this.state;

    return (
      <div>
        {isRecording ? (
          <button onClick={this.stop}>Stop</button>
        ) : (
          <button onClick={this.start}>Start</button>
        )}
        {blob && (
          <button
            onClick={this.download}
          >
            Download
          </button>
        )}
        <div style={{border: '1px solid red'}}>
          <Waveform data={this.state.waveData} />
        </div>
      </div>
    );
  }
}

export default RecordingStudio;
