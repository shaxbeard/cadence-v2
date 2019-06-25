import React, { Component } from "react";
import "./App.css";
import Spotify from "spotify-web-api-js";
import axios from "axios";

import PlaylistList from "./PlaylistList";
import PlaylistDetail from "./PlaylistDetail";
import PlaylistTrackList from "./PlaylistTrackList";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();

    this.state = {
      paramsST: params.access_token,
      loggedIn: params.access_token ? true : false,
      userPlaylists: [],
      playlistId: null,
      playlistTracks: [],
      selectedPlaylist: null,
      nowPlaying: {
        name: "Not Checked",
        image: ""
      }
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
    axios
      .get(
        "https://api.spotify.com/v1/playlists/0UeDsSYClhiopusVz5tZxJ/tracks",
        {
          headers: {
            Authorization: "Bearer " + params.access_token
          }
        }
      )
      .then(response => {
        this.setState({
          playlistTracks: response.data.items
        });
      });
  }

  fetchUserPlaylists() {
    spotifyWebApi.getUserPlaylists().then(response => {
      this.setState({
        userPlaylists: response.items
      });
    });
  }

  onPlaylistSelect = playlist => {
    // this.setState({ selectedPlaylist: playlist });
    this.setState({ playlistId: playlist.id });
  };

  //This is the onPlaylistSelect function with a sample callback
  // onPlaylistSelect = playlist => {
  //   // this.setState({ selectedPlaylist: playlist });
  //   this.setState({ playlistId: playlist.id }, () => this.getNowPlaying());
  // };

  // fetchPlaylistTracks() {
  //   axios
  //     .get(
  //       "https://api.spotify.com/v1/playlists/0UeDsSYClhiopusVz5tZxJ/tracks",
  //       {
  //         headers: {
  //           Authorization: "Bearer " + params.access_token
  //         }
  //       }
  //     )
  //     .then(response => console.log(response));
  // }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      });
    });
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button>Login with Spotify</button>
        </a>
        <div> Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
        </div>
        <button onClick={() => this.fetchUserPlaylists()}>
          Fetch User Playlists
        </button>
        <button onClick={() => this.fetchPlaylistTracks()}>
          Fetch Playlist Tracks
        </button>
        <PlaylistDetail playlist={this.state.playlistId} />
        <PlaylistList
          onPlaylistSelect={this.onPlaylistSelect}
          userPlaylists={this.state.userPlaylists}
        />

        <div>token: {this.state.paramsST}</div>
        <div>found: {this.state.playlistTracks.length} tracks</div>
      </div>
    );
  }
}

export default App;
