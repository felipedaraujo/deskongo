import React, { Component } from 'react';
import { chicago } from './offices';
import { fabric } from 'fabric';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import './App.css';

class App extends Component {
  async componentDidMount() {
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
    });

    const canvasSize = await this._canvasSize(chicago);

    this.canvas.setDimensions(canvasSize);

    this.canvas.on({
      'selection:created': this._onSelect,
      'selection:updated': this._onSelect,
      'mouse:over': this._onMouseOver,
    });

    fabric.loadSVGFromURL(chicago, (objects, options) => {
      objects.forEach(object => {
        object.hasBorders = false;
        object.hasControls = false;

        this.canvas.add(object);
      });
    });
  }

  _onSelect = evt => {
    const { target } = evt;

    // Ignore selection if object isn't desk
    if (!this._isItDesk(target)) {
      return;
    }

    const selected = target.fill === '#c7e8ac';

    target.set({ fill: selected ? '#eee' : '#c7e8ac' });
  };

  _onMouseOver(evt) {
    const { target } = evt;

    if (isNull(target)) {
      return;
    }

    // Avoid all objects to be dragged, resized, and rotated
    target.set({
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockUniScaling: true,
      lockRotation: true,
    });
  }

  _canvasSize(source) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = source;

      image.addEventListener('load', () => {
        resolve({ width: image.width, height: image.height });
      });

      image.addEventListener('error', () => {
        console.error('[IMAGE LOADING ERROR]');

        reject();
      });
    });
  }

  _isItDesk({ id }) {
    return !isUndefined(id) && id.includes('desk');
  }

  render() {
    return (
      <div className="App">
        <canvas ref="canvas" id="canvas" />
      </div>
    );
  }
}

export default App;
