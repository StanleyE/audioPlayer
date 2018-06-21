import React, {Component} from 'react';

class SongDetails extends Component {
    render() {
        let song = this.props.songs;
        let match = this.props.match;
        return (
            <div>
                <h2>{song[match].title}</h2>
                <h3>{song[match].description}</h3>  
                <button className = "btn" onClick = {()=>{this.props.playSong(song[match].id)}}><i class="fas fa-play"></i></button> 
                <button className = "btn" onClick = {()=>{this.props.onPause()}}><i class="fas fa-pause"></i></button>      
            </div>
        )
    }
}

export default SongDetails;