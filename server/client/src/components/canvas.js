import React, { Component } from 'react';
import canvasScript from '.././assets/canvas.js';

class Canvas extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount = () => {
        canvasScript();

    }
    componentDidUpdate = () => {
    }
    render() {
        return (
            <div className=' col-xs-6 '>
                <canvas height={window.innerHeight} width={window.innerWidth} id='canvas' className="whiteboard well" ></canvas>
                <div className="colors">
                    <div className="color black"></div>
                    <div className="color red"></div>
                    <div className="color green"></div>
                    <div className="color blue"></div>
                    <div className="color yellow"></div>
                    <button className='btn btn-warning clear-button' id='clear-button'>Clear</button>
                </div>
            </div>
        )
    }
}

export default Canvas