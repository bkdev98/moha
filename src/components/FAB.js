import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FAB = ({ icon, onPress }) => (
  <TouchableOpacity
    style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      position: 'absolute',
      bottom: 40,
      right: 20,
    }}
    onPress={onPress}
  >
    <LinearGradient
      colors={['#FB9ED3', '#EB7483']}
      start={[1,0]}
      end={[0,1]}
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Feather name={icon} size={20} color="#FFFFFF" />
    </LinearGradient>
  </TouchableOpacity>
);

export default FAB;
