import React, {Component} from 'react';
import canvasScript from '.././assets/canvas.js';

class Canvas extends Component {
    componentDidMount = () => {
        canvasScript();

    }
    componentDidUpdate = () =>{
        canvasScript()
    }
    render() {
        return (
            <div>
        <canvas height='600px' width='600px' style={{border: '1px solid black'}} id='canvas' className="whiteboard" ></canvas>
        <div className="colors">
          <div className="color black"></div>
          <div className="color red"></div>
          <div className="color green"></div>
          <div className="color blue"></div>
          <div className="color yellow"></div>
      </div>
      </div>
        )
    }
}

export default Canvas