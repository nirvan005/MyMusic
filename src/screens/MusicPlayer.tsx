import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCentre from '../components/ControlCentre';
import { playListData } from '../constants';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null | undefined>(null);
  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged],
    async (event: any) => {
      switch (event.type) {
        case Event.PlaybackActiveTrackChanged:
          setTrack(event.track);
          break;
      }
    },
  );

  const renderArtwork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImg}
              source={{ uri: track?.artwork?.toString() }}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={playListData}
        renderItem={renderArtwork}
        horizontal
        keyExtractor={song => song.id.toString()}
        pagingEnabled
        onMomentumScrollBegin={() => TrackPlayer.skipToNext()}
      />
      <SongInfo track={track} />
      <SongSlider />
      <ControlCentre />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
