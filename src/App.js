import React, { Component } from 'react';
import floorplan from './floor-plan.svg';
import { fabric } from 'fabric';
import './App.css';

class App extends Component {
  componentDidMount() {
    const canvas = new fabric.Canvas('canvas');

    fabric.loadSVGFromURL(floorplan, (objects, options) => {
      console.log('[OBJECTS]', objects);

      objects.forEach(object => canvas.add(object));
    });
  }

  render() {
    return (
      <div className="App">
        <canvas ref="canvas" id="canvas" width="1955.56px" height="1511.11px" />
      </div>
    );
  }
}

export default App;
