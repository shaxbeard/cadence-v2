import React from "react";

const PlaylistList = props => {
  const userPlaylists = props.userPlaylists.map(playlist => {
    return <p>{playlist.name}</p>;
  });

  return <div>{userPlaylists}</div>;
};

export default PlaylistList;
