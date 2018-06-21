import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import './App.css';
const axios = require('axios');

class App extends Component {
  constructor(){
    super()
    this.state = {
      current: 0,
      rocking: false
    },

    this.playa = React.createRef();
  }

  //play button
  onPlay=()=>{
    this.playa.current.play();
    this.setState({
      rocking: true
    })
  }

  //Pause Button
  onPause=()=>{
    this.playa.current.pause();
    this.setState({
      rocking: false
    })
  }

  //lifecycle function that checks if song was playing before hand
  componentDidUpdate=()=>{
    if (this.state.rocking === true) {
     this.playa.current.play();
   }
 }

//manually switch between songs
  changeSong = (value)=>{
    let beats = this.props.songs.length-1; //-1 because we want the index # not the length
    //if next was hit add 1 to current state
    if (value === 'plus') {
    let next = this.state.current+1
    //if state number exceeds the song list, reset state to begining of list
      if (next > beats) {
        this.setState({
          current: 0
        })
      } else { //set state
        this.setState({
          current: next
        })
      }
    } else { //if previous button was hit, subtract 1 from current state
      let previous = this.state.current-1;
      //if state number is less then 0, reset to last index in song list
      if (previous < 0) {
        this.setState({
          current: beats
        })
      } else {
        this.setState({
          current: previous
        })
      }      
    }// becuase of async and we want the state of play to remain
    this.componentDidUpdate();
  }

  //play song from display song list
  playSong=(id)=>{
    //take id and set as state
    this.setState({
      current : id,
      rocking: true
    })
    this.componentDidUpdate();
  }

  componentDidMount(){
    axios.get('http://localhost:8080/')
          .then(results =>{
            console.log(results.data);
          })
          .catch(error=>{
            console.log('You better lose yourself in the music, the moment You own it, you better never let it go');
          })
  };



  render() { 
  let current = this.state.current;
      const Music = ({ match }) => (
  <div>
    <h3>ID: {match.params.songId}</h3>
    <SongDetails songs={this.props.songs} match = {match.params.songId}playSong = {this.playSong} onPause = {this.onPause}/>
  </div>
)
    return (
      <div className="App container">
        <div className = "jumbotron">
          <h1>Sound Bug <i className="fas fa-music"></i></h1>
        </div>
        <div className = 'playa'>
          <h3>{this.props.songs[current].title}</h3>        
          <audio id = 'playa' ref = {this.playa} src= {this.props.songs[current].source} type = 'audio/mpeg'></audio>
          <button className = 'btn' type = 'button' onClick = {()=>{this.onPlay()}} > <i className="fas fa-play"></i></button>
          <button className = 'btn' type = 'button' onClick = {()=>{this.onPause()}} > <i className="fas fa-pause"></i></button>
          <button className = 'btn' type = 'button' onClick = {()=>{this.changeSong('minus')}} > <i className="fas fa-chevron-left"></i></button>
          <button className = 'btn' type = 'button' onClick = {()=>{this.changeSong('plus')}} > <i className="fas fa-chevron-right"></i></button>
        </div>
        <Route exact path="/" render={()=><SongsList songs={this.props.songs} playSong = {this.playSong} onPause = {this.onPause} />}/>
        <Route path='/:songId' component = {Music} />
      </div>
    );
  }
}

export default App;
