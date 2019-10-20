import React from 'react';
import { View } from 'react-native';

import FAB from '../components/FAB';
import BackButton from '../components/BackButton';

const NewTransaction = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: '#22252D' }}>
    <BackButton />
    <FAB icon='check' onPress={() => navigation.navigate('Home')} />
  </View>
);

export default NewTransaction;
