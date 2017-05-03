import React, {Component} from 'react';
import {storiesOf} from '@kadira/storybook';
import WaveStream from '../WaveStream';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - (min + 1))) + min;
}

function generateRandomData() {
  return new Array(255)
    .fill(1)
    .map(d => getRandomInt(0, 100));
}

class WaveStreamStory extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      data: generateRandomData(),
    };

    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({data: generateRandomData()}), 2000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div style={{border: '1px solid red'}}>
        <WaveStream
          data={this.state.data}
        />
      </div>
    );
  }
}

storiesOf('WaveStream', module)
  .add('Re-animate', () => (
    <WaveStreamStory />
  ));
