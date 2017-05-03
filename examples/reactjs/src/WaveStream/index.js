import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

function findLastNonZero(data) {
  let idx = data.length - 1;

  for (; idx >= 0; idx -= 1) {
    if (data[idx] !== 0) {
      return idx;
    }
  }

  return 0;
}

class WaveStream extends Component {
  shouldDraw(idx, datum) {
    const {lineTo} = this.props;

    return !(
      datum === 0 ||
      idx % 2 === 1 ||
      idx > lineTo ||
      idx < this.props.drawOffset ||
      idx > 255 - this.props.drawOffset
    );
  }

  getData() {
    return this.props.list;
  }

  render() {
    const data = this.getData();
    const {lineTo, list} = this.props;

    return (
      <svg
        id="visualizer"
        ref={(ref) => { this.visualizer = ref; }}
        viewBox="0 0 255 255"
        preserveAspectRatio="none"
        style={styles.svg}
      >
        <path
          style={{...styles.path, ...styles.white, ...styles.hr}}
          d={`M 0, ${255 / 2} l 255, 0`}
        />
        {list.map((datum, idx) => (!this.shouldDraw(idx, datum) ? null : (
          <path
            key={idx}
            style={styles.path}
            d={`M ${idx},${255 / 2} l 0,-${datum / 2}`}
          />
        )))}
        {list.map((datum, idx) => (!this.shouldDraw(idx, datum) ? null : (
          <path
            key={idx}
            style={styles.path}
            d={`M ${idx},${255 / 2} l 0,${datum / 2}`}
          />
        )))}
        <path
          style={{...styles.path, ...styles.hr}}
          d={`M 0, ${255 / 2} l ${lineTo}, 0`}
        />
      </svg>
    );
  }
}

WaveStream.propTypes = {
  lineTo: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  drawOffset: PropTypes.number,
};

WaveStream.defaultProps = {
  drawOffset: 12,
  data: [],
  lineTo: 255,
};

export default WaveStream;
