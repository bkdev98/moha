import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FAB = ({ icon, onPress, scaleValue }) => {
  const [animatedValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: scaleValue || 0.94,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  };

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue,
      },
    ],
  };

  return (
    <TouchableWithoutFeedback
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={{
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 40,
        right: 20,
        zIndex: 99,
        ...animatedStyle,
      }}>
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
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default FAB;
