import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const BackButton = ({ icon, navigation }) => (
  <TouchableOpacity
    style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      position: 'absolute',
      bottom: 40,
      left: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={() => navigation.goBack()}
  >
    <Feather name='arrow-left' size={20} color="#FFFFFF" />
  </TouchableOpacity>
);

export default withNavigation(BackButton);
