import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import WeedIcon from '../components/collectGame/weedIcon';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS === 'ios';

export default function FailedScreen({ navigation }) {
  const isFocused = useIsFocused();
  const nav = useNavigation();

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="dark" />
        <View className="mx-4 items-center h-full flex-col justify-end flex grow">
        <View className="grow" />

        <View className="pt-2 mr-2"><WeedIcon size={100} fill="white" /></View>
          
              <Text className="text-neutral-50 text-2xl font-bold text-center">
              You have failed.
              </Text>
              
          <View className="grow" />

          
           
        </View>

      </SafeAreaView>
      
      
  </View>
      

   
  )
}
