import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appNavigation';

type TimerComponentProps = {
  duration: number;
  nextScreen: keyof RootStackParamList;
  isModalVisible: boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  const TimerComponent: React.FC<TimerComponentProps> = ({ duration, nextScreen, isModalVisible, navigation }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        // Only proceed if the modal is not visible
        if (!isModalVisible) {
          // Start the countdown if timeLeft is more than 0
          if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
          } else {
            // When time is up, navigate to the next screen
            navigation.replace(nextScreen as any);
          }
        }
      }, [timeLeft, navigation, nextScreen, isModalVisible]);

  return (

    <View className="flex items-center">
    <View className="rounded-full bg-black px-5">
      <Text className="mt-2 text-white text-6xl font-light text-end">{formatTime(timeLeft)}</Text>
    </View>
    </View>
  );
}

export default TimerComponent;