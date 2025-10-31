import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { setupPlayer, addTrack } from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';
import TrackPlayer from 'react-native-track-player';

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
    return () => {
      (async () => {
        try {
          await TrackPlayer.reset();
        } catch (error) {
          console.warn('Error resetting TrackPlayer:', error);
        }
      })();
    };
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" style={{ marginTop: 250 }} />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
