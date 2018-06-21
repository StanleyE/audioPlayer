import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Song extends Component {
    render() {
        return (
            <div className = 'music'>
                <h3>Title: 
                <Link to= {`/${this.props.id}`} className = 'link'> {this.props.title}</Link> </h3>
                <button className = 'btn' onClick= {()=> {this.props.playSong(this.props.id)}}><i className="fas fa-play"></i></button>
                <button className = 'btn' onClick= {()=> {this.props.onPause()}}><i className="fas fa-pause"></i></button>                
            </div>
        ); 
    }
}

export default Song;