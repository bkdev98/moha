import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as Localization from 'expo-localization';

const Initial = ({ navigation }) => {
  const budget = useStoreState(state => state.app.budget);
  const locale = useStoreState(state => state.app.locale);
  const setLocale = useStoreActions(state => state.app.setLocale);
  const setCurrency = useStoreActions(state => state.app.setCurrency);

  useEffect(() => {
    if (!locale) {
      if (Localization.locale.includes('vi')) {
        setLocale('vi');
        setCurrency('vnd');
      } else {
        setLocale('en');
        setCurrency('usd');
      }
    } else {
      setLocale(locale);
    }

    if (!budget) {
      navigation.navigate('EditBudget', { showBack: false });
    } else {
      navigation.navigate('App');
    }
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#22252D' }} />;
}

export default Initial;
