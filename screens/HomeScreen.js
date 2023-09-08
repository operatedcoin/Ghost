import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio, fadeOutAndStopAudio } from '../components/backgroundAudioHelper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import WeedIcon from '../components/collectGame/weedIcon';
import { useNavigation } from '@react-navigation/native';
//import { stopAudio } from '../components/backgroundAudioHelper';

const ios = Platform.OS === 'ios';

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const nav = useNavigation();

  useEffect(() => {
    // Listener for navigation state changes
    const unsubscribe = nav.addListener('state', (e) => {
      // For React Navigation v5
      const currentRoute = e.data.state.routes[e.data.state.index];
      if (currentRoute && currentRoute.name === 'ChapterTwo') {
          fadeOutAndStopAudio('background');
      }
      if (currentRoute && currentRoute.name === 'ChapterFour') {
          stopAudio('oathDrone'); // Stop the oathDrone audio when ChapterFour is reached
      }
    });

    // Cleanup listener on component unmount
    return unsubscribe;
  }, [nav]);

  useFocusEffect(
    React.useCallback(() => {
      playAudio(require('../audio/beatOneHello.m4a'), 'hello');
      return () => stopAudio('hello'); // This stops 'beatOneHello.m4a' when navigating away from HomeScreen
    }, [])
  );

  useEffect(() => {
    if (isFocused) {
      playAudio(require('../audio/MysteryTheme.mp3'), 'background'); // Play the new background audio when HomeScreen is focused
      playAudio(require('../audio/oathDroneLow.wav'), 'oathDrone'); // Play the oathDrone audio when HomeScreen is focused
    }
    // No need to stop the new background audio here, it will be stopped by the navigation listener when 'ChapterFour' is reached
  }, [isFocused]);

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="dark" />
        <View className="mx-4 items-center h-full flex-col justify-end flex grow">
        <View className="grow" />

        <View className="pt-2 mr-2"><WeedIcon size={100} fill="white" /></View>
          
              <Text className="text-neutral-50 text-2xl font-bold text-center">
              Something strange is {"\n"}growing around the campus. {"\n"}Your help is needed.
              </Text>
              
          <View className="grow" />

          <TouchableOpacity className="bg-green-500 p-3 mb-6 w-full items-center rounded-xl" onPress={()=> navigation.navigate('ChapterOne')}>
            <Text className="text-white">I can hear you</Text>
          </TouchableOpacity>   
           
        </View>

      </SafeAreaView>
      
      
  </View>
      

   
  )
}
