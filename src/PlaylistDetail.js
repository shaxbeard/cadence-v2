import React from "react";

const PlaylistDetail = ({ playlist }) => {
  if (!playlist) {
    return <div>Loading...</div>;
  }
  console.log(playlist);
  return <div>{playlist.name}</div>;
};

export default PlaylistDetail;
