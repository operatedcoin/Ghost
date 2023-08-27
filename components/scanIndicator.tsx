import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const ScanIndicator = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      const fadeInOut = Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ])
      );
  
      fadeInOut.start();
  
      // This will stop the animation when the component unmounts
      return () => fadeInOut.stop();
    }, []);

    return (
        <Animated.View className="bg-green-500 w-2 h-2 rounded-full mr-1"
          style={[
            {
              opacity: fadeAnim
            }
          ]}
        />
      );
    };
    
    export default ScanIndicator;
    