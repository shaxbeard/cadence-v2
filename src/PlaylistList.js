import React from "react";
import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ userPlaylists, onPlaylistSelect }) => {
  const renderedList = userPlaylists.map(playlist => {
    // return <p>{playlist.name}</p>;
    return (
      <PlaylistItem onPlaylistSelect={onPlaylistSelect} playlist={playlist} />
    );
  });

  return <div>{renderedList}</div>;
};

export default PlaylistList;
