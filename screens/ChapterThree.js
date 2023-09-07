import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const ios = Platform.OS === 'ios';

export default function ChapterThree({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const beacondetectHaptic = async () => {
    // Repeat the pattern 3 times
    for (let i = 0; i < 4 ; i++) {
      // Trigger a light impact
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  
      // Wait for 100ms
      await new Promise(resolve => setTimeout(resolve, 20));
  
      // Trigger a heavy impact
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  
      // Wait for 200ms
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  };

  const weedscanHaptic = async () => {
    // Repeat the pattern 3 times
    for (let i = 0; i < 40 ; i++) {
      // Trigger a light impact
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.light);
  
      // Wait for 100ms
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        playAudio(require('../audio/MysteryTheme.mp3'));
      }); // delaying by half a second
    } else {
      stopAudio(require('../audio/MysteryTheme.mp3'));
    }
}, [isFocused]);

  useEffect(() => {
    if (isFirstLoad) {
      setBottomSheetVisible(true);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  return (
    <View className="bg-neutral-100 flex-1">
    { isBottomSheetVisible &&
      <View className="z-50 absolute inset-0 bg-black/[.7]" />
    }

      <Header 
        isModalVisible={isHeaderModalVisible} 
        setModalVisible={setHeaderModalVisible} 
       /> 

    <View className="h-fit flex-col justify-end flex grow space-y-3">

     <View className="grow"></View>  

     <TimerComponent isModalVisible={isBottomSheetVisible || isHeaderModalVisible} duration={10} nextScreen="ChapterFour" />

      <View className="grow"></View> 

        <View className="flex-col grow bg-white mx-4 p-4 mb-10 rounded-xl">
          <Text className="text-neutral-900 text-center text-2xl font-bold">Task 3</Text>
          <Text className="text-neutral-900 text-center text-xs pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor ipsum at arcu condimentum, sed fermentum turpis aliquam. Fusce a dui egestas</Text>
          <View className="grow"></View>
          <TouchableOpacity className="bg-black p-3 mb-3 w-full items-center rounded-xl" onPress={() => Haptics.selectionAsync()}>
            <Text className="text-white">Async</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-black p-3 mb-3 w-full items-center rounded-xl" onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
          }>
            <Text className="text-white">Notification</Text>
          </TouchableOpacity> 
          <TouchableOpacity className="bg-black p-3 mb-3 w-full items-center rounded-xl" onPress={()=> {weedscanHaptic();}}>
            <Text className="text-white">Weed Scan</Text>
          </TouchableOpacity> 
          <TouchableOpacity className="bg-black p-3 mb-3 w-full items-center rounded-xl" onPress={()=> {beacondetectHaptic();}}>
            <Text className="text-white">Beacn Detect</Text>
          </TouchableOpacity>  
        </View>

        <BottomSheetModal
        isVisible={isBottomSheetVisible} 
        onClose={() => setBottomSheetVisible(false)}
        title="Chapter Title Here"
        content="Some description or instruction text here"
      />

<View className="grow"></View>

<View className="mx-4 p-4 items-center">
  <TouchableOpacity onPress={()=> navigation.replace('ChapterFour')}>
  <Text className="text-neutral-400 text-xs">Skip</Text>
  </TouchableOpacity>
  </View>  
          
     </View>  

     

  </View>
      

   
  )
}
