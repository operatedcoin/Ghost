import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { stopAudio } from '../components/backgroundAudioHelper';

const ios = Platform.OS === 'ios';

export default function HomeScreen({ navigation }) {

  useFocusEffect(
    React.useCallback(() => {
      stopAudio();  // Ensure the background audio is stopped every time we navigate to Home
      return () => {};
    }, [])
  );

  return (
    <View className="flex-1 bg-neutral-100 \">
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="dark" />
        <View className="mx-4 items-center h-full flex-col justify-end flex grow">
        <View className="grow" />
          <Text className="text-neutral-900 text-2xl font-bold">
              Green Thumb</Text>
              <Text>
            Intro text goes here
          </Text>
          <View className="grow" />
          <TouchableOpacity className="bg-black p-3 mb-3 w-full items-center rounded-xl" onPress={()=> navigation.navigate('ChapterOne')}>
            <Text className="text-white">Begin</Text>
          </TouchableOpacity>    
        </View>
      </SafeAreaView>
      
      
  </View>
      

   
  )
}
