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

export default function ChapterSeven({ navigation }) {

  useFocusEffect(
    React.useCallback(() => {
      // When the screen is focused, play the audio.
      playAudio(require('../audio/MysteryWin.mp3'), 'win');

      // Return a cleanup function that will be called when the screen is blurred.
      return () => {
        // When the screen is blurred, stop the audio.
        stopAudio('win');
      };
    }, [])
  );

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="dark" />
        <View className="mx-4 items-center h-full flex-col justify-end flex grow">
          <View className="grow" />

          <View className="pt-2 mr-2">
            <WeedIcon size={100} fill="white" />
          </View>

          <Text className="text-neutral-50 text-2xl font-bold text-center mb-3">
            SOURCE DETECTED
          </Text>

          <Text className="text-neutral-50 text-lg text-center">
          You did it!{"\n"}Please return the device.
          </Text>
          
          <View className="grow" />

          <TouchableOpacity className="mb-6 w-full items-center rounded-xl" onPress={() => navigation.navigate('Home')}>
            <Text className="text-neutral-700 text-xs">Bioscanner has been returned</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}