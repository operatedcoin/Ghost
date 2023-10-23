import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import BeaconFTB from '../components/beaconFTB';


const ios = Platform.OS === 'ios';

export default function ChapterOne({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      playAudio(require('../audio/beatTwoSetUp.m4a'), 'two');
      return () => stopAudio('two'); // This stops 'beatOneHello.m4a' when navigating away from HomeScreen
    }, [])
  );

  useEffect(() => {
    if (isFirstLoad) {
      setBottomSheetVisible(true);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  return (
    <View className="bg-neutral-100 flex-1">
        <Header 
        isModalVisible={isHeaderModalVisible} 
        setModalVisible={setHeaderModalVisible} 
       />


    <View className="h-fit flex-col justify-end flex grow space-y-3">

     <View className="grow"></View>  




        <View className="bg-white mx-4 p-4 rounded-xl">
          <Text className="text-neutral-900 text-center text-2xl font-bold mb-4">TESTY TWO</Text>
          
          <TouchableOpacity className="bg-green-500 p-3 mb-3 w-full items-center rounded-xl" onPress={()=> navigation.navigate('ChapterTwo')}>
            <Text className="text-white">I'm willing to help</Text>
          </TouchableOpacity>    
          
        </View>

          
        <View className="grow"></View>  

     </View>

  </View>
      

   
  )
}


    //<TimerComponent isModalVisible={isBottomSheetVisible || isHeaderModalVisible} duration={10} nextScreen="ChapterTwo" />

  //   <BottomSheetModal
  //   isVisible={isBottomSheetVisible} 
  //   onClose={() => setBottomSheetVisible(false)}
  //   title="Find somewhere quiet."
  //   content="When you're alone. When you're safe. Click below."
  // />

  
