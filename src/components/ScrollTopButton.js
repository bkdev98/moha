import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ScrollTopButton = ({ onPress, visible }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 200,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 200,
        }
      ).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={{
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 40,
        left: 20,
        opacity: fadeAnim,
      }}
    >
      <TouchableOpacity style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }} onPress={onPress}>
        <Feather name='chevron-up' size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default ScrollTopButton;
