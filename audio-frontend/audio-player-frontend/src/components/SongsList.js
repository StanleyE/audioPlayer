import React, {Component} from 'react';
import Song from './Song';


class SongsList extends Component {
    render() {
        let songs = this.props.songs;
        let songsJSX = songs.map((beat)=>{
            return <Song title = {beat.title} description = {beat.description} id = {beat.id} source = {beat.source} playSong = {this.props.playSong} onPause= {this.props.onPause} />
        })
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-sm'>
                        {songsJSX}
                    </div>
                </div>
            </div>
        )
    }
}

export default SongsList;