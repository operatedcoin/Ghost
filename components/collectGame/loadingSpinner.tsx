import React from 'react';
import { View, StyleSheet, Animated} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRef } from 'react';

const LoadingSpinner = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000, // Adjust the rotation speed (in milliseconds) here
          useNativeDriver: true,
        })
      ).start();
    };
  
    React.useEffect(() => {
      startRotation();
    }, []);
  
    const rotation = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  
    return (
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <AntDesign name="loading1" size={50} color="#22C55E" />
        </Animated.View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default LoadingSpinner;
  