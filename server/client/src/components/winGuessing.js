import React , {Component} from 'react';
import { connect } from 'react-redux';

class winGuessing extends Component {
    constructor(props){
        super(props)
    }
    render(){
        if(!this.props.winningGuess && !this.props.winner){
            return(
            <div className='well justify-content-center'>
            <h1 className='text-center '> Time ran out! Try harder next round! </h1>
            <h2 className='text-center'> You are guessing next round, wait for drawer to start the game </h2>
            </div>)
          } else {
          return (
            <div className='well justify-content-center'>
          <h1 className='text-center '>{this.props.winner} won this round! They guessed "{this.props.winningGuess}" </h1>
          <h2 className='text-center'> You are guessing next round, wait for drawer to start the game </h2>
          </div>
          )}
    }
}

const mapStateToProps = ({noun}) => {
    return {noun}
}
export default connect(mapStateToProps)(winGuessing);