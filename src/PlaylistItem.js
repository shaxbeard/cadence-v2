import React from "react";

const PlaylistItem = ({ playlist, onPlaylistSelect }) => {
  return <div onClick={() => onPlaylistSelect(playlist)}>{playlist.name}</div>;
};

export default PlaylistItem;
