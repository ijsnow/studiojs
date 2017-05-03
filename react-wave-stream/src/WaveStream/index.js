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

  render() {
    const {data, backgroundColor, stroke} = this.props;
    let lineTo = this.props.lineTo;

    if (!lineTo) {
      lineTo = findLastNonZero(data);
    }

    const pathStyle = {
      ...styles.path,
      stroke,
    };

    const svgStyle = {
      ...styles.svg,
      backgroundColor,
    };

    return (
      <svg
        id="visualizer"
        ref={(ref) => { this.visualizer = ref; }}
        viewBox="0 0 255 255"
        preserveAspectRatio="none"
        style={svgStyle}
      >
        <path
          style={{...styles.path, ...styles.white, ...styles.hr}}
          d={`M 0, ${255 / 2} l 255, 0`}
        />
        {data.map((datum, idx) => (!this.shouldDraw(idx, datum) ? null : (
          <path
            key={idx}
            style={pathStyle}
            d={`M ${idx},${255 / 2} l 0,-${datum / 2}`}
          />
        )))}
        {data.map((datum, idx) => (!this.shouldDraw(idx, datum) ? null : (
          <path
            key={idx}
            style={pathStyle}
            d={`M ${idx},${255 / 2} l 0,${datum / 2}`}
          />
        )))}
        <path
          style={{...pathStyle, ...styles.hr}}
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
  backgroundColor: PropTypes.string,
  stroke: PropTypes.string,
};

WaveStream.defaultProps = {
  drawOffset: 12,
  data: [],
  lineTo: 255,
  backgroundColor: '#555',
  stroke: '#fff',
};

export default WaveStream;
