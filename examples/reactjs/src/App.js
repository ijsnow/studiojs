import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WaveStream from '../../../react-wave-stream/dist';
import Recorder from '../../../recorder/lib/Recorder';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      blob: null,
      isRecording: false,
      stream: null,
      analyserData: {data: [], lineTo: 0},
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.download = this.download.bind(this);

    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

    this.recorder = new Recorder(this.audioContext, {
      onAnalysed: data => this.setState({analyserData: data}),
    });

    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        this.setState({stream});
        this.recorder.init(stream);
      })
      .catch(this.dontGotStream);
  }

  start() {
    this.recorder.start()
      .then(() => this.setState({isRecording: true}));
  }

  stop() {
    this.recorder.stop()
      .then(({blob}) => this.setState({
        isRecording: false,
        blob,
      }));
  }

  dontGotStream(error) {
    console.log('Get stream failed', error);
  }

  download() {
    Recorder.download(this.state.blob, 'react-audio');

    this.setState({blob: null});
  }

  render() {
    const {
      isRecording,
      blob,
      stream,
    } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Recording Studio</h2>

          <div className="App-buttons">
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
          </div>
        </div>
        <div className="App-studio">
          <WaveStream {...this.state.analyserData} />
        </div>
      </div>
    );
  }
}

export default App;
