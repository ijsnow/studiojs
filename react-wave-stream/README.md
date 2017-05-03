# React WaveStream

Visualize frequency data from audio streams.

Or just draw a bunch of lines ¯\\_(ツ)_/¯

Made with [recorder-js](../recorder/README.md) in mind.

## Installation

```
$ yarn add react-wave-stream # or npm install react-wave-stream --save
```

## Usage

Check out real usage [here](../examples/reactjs/src/App.js)

```javascript
const data = getMyAudioFrequencyData();

<WaveStream
  data={data}
/>
```

## Props

- `data`: `PropTypes.arrayOf(PropTypes.number).isRequired`

An array of 255 numbers. These numbers will be used in determining the height of the lines.

- `lineTo`: `PropTypes.number`

Must be between 0 and 255. This number determines the length of the white line
coming from the right side. If you don't proved this prop, we draw the line
to the last non-zero number in the list. We decided to make this a prop because
[`recorder-js`](../recorder/README.md) gives this to use in the `onAnalysed` response.
