import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useStoreState } from 'easy-peasy';

const Initial = ({ navigation }) => {
  const budget = useStoreState(state => state.app.budget);

  useEffect(() => {
    if (!budget) {
      navigation.navigate('EditBudget', { showBack: false });
    } else {
      navigation.navigate('App');
    }
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#22252D' }} />;
}

export default Initial;
