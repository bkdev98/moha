import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, StatusBar, UIManager } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from 'easy-peasy';
import { PersistGate } from "redux-persist/integration/react";
import i18n from 'i18n-js';
// import { enableScreens } from 'react-native-screens';

import AppContainer from './src/navigation';
import store, { persistor } from './src/store';
import { BLACK_ICONS, WHITE_ICONS, GRADIENT_ICONS } from './src/utils/icons';
import { vi, en } from './src/translations';

i18n.fallbacks = true;
i18n.translations = { vi, en };

// enableScreens();

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
    await Asset.loadAsync([...BLACK_ICONS, ...WHITE_ICONS, ...GRADIENT_ICONS]);
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
          {/* <SafeAreaProvider> */}
            <AppContainer />
          {/* </SafeAreaProvider> */}
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
