import React, { useState, useEffect } from 'react';
import { Table, Icon } from "semantic-ui-react";
import { size, map } from "lodash";
import { usePlayer } from "../../hooks";
import "../../scss/components/ListSongs.scss";

export function ListSongs(props) {

  const { songs, album } = props;
  
  const { playSong } = usePlayer();
  

const onPlay = async (item) => {

    const miniature = window.location.origin + "/storage/" + album.artist + "/" + album.image;
    playSong(item, miniature);

};

  if (size(songs) === 0) {
    return <p className="no-songs">Este album aun no tiene canciones</p>;
  }

  return (
    <Table inverted className="list-songs">

      <Table.Body>
        {map(songs, (song) => (
          <Table.Row key={song.id} onClick={() => onPlay(song)}>
            <Table.Cell collapsing>
              <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell collapsing>
              {song.number}
            </Table.Cell>
            <Table.Cell>{song.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
