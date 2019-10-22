import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from 'easy-peasy';
import { PersistGate } from "redux-persist/integration/react";

import AppContainer from './src/navigation';
import store, { persistor } from './src/store';

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const loadAssets = async () => {
    await Font.loadAsync({
      'major-mono': require('./assets/fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf'),
      'playfair-black': require('./assets/fonts/Playfair_Display/PlayfairDisplay-Black.ttf'),
      'playfair-blackitalic': require('./assets/fonts/Playfair_Display/PlayfairDisplay-BlackItalic.ttf'),
      'playfair-bold': require('./assets/fonts/Playfair_Display/PlayfairDisplay-Bold.ttf'),
      'playfair-bolditalic': require('./assets/fonts/Playfair_Display/PlayfairDisplay-BoldItalic.ttf'),
      'playfair-italic': require('./assets/fonts/Playfair_Display/PlayfairDisplay-Italic.ttf'),
      'playfair-regular': require('./assets/fonts/Playfair_Display/PlayfairDisplay-Regular.ttf'),
    });
    setIsReady(true);
  }

  useEffect(() => {
    loadAssets();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='#FFFFFF' />
      </View>
    )
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <StoreProvider store={store}>
        <>
          <SafeAreaProvider>
            <AppContainer />
          </SafeAreaProvider>
          <StatusBar barStyle='light-content' translucent />
        </>
      </StoreProvider>
    </PersistGate>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22252D',
  },
});
