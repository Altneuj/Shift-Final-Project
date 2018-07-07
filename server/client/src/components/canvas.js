import React, { Component } from 'react';
import canvasScript from '.././assets/canvas.js';
import ReactCountdownClock from 'react-countdown-clock'
import { socketConnect } from 'socket.io-react'



class Canvas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            timer: false,
        }
    }
    componentDidMount = () => {
        canvasScript();
        this.props.socket.on('start-timer', (data) =>{
            this.setState({timer: data})
        })
        this.props.socket.on('stop-timer', (data) => {
            this.setState({timer: data})
        })
    }
    renderTimer = () => {
        if(this.state.timer && this.props.draw){
            return <ReactCountdownClock
            seconds={30}
            size={100}
            onComplete={() => {
                this.setState({timer: false})
                this.props.socket.emit('winner', {username: false, guess: false})
            }
            } />
        }
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
                    {this.renderTimer()}
                </div>
            </div>
        )
    }
}

export default socketConnect(Canvas)