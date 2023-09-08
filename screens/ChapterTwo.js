import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio, fadeOutAndStopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import BeaconFTB from '../components/beaconFTB';
import LoadingSpinner from '../components/collectGame/loadingSpinner';
import { useFocusEffect } from '@react-navigation/native';


const ios = Platform.OS === 'ios';

export default function ChapterTwo({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      playAudio(require('../audio/beatThreeTaskV2.m4a'), 'three');
      return () => stopAudio('three'); // This stops 'beatOneHello.m4a' when navigating away from HomeScreen
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


     <View className="my-8">
        <TimerComponent duration={56} nextScreen="ChapterFour" navigation={navigation} />
    </View> 

        <View className="bg-white mx-4 p-4 rounded-xl items-center">
        
        <View className="mb-4"><LoadingSpinner /></View>
        <Text className="text-neutral-400 text-2xl text-center">Activating Bioscanner</Text>
      
        </View>

          
        <View className="grow"></View>

        <View className="mx-4 p-4 items-center">
          <TouchableOpacity onPress={()=> navigation.replace('ChapterFour')}>
          <Text className="text-neutral-200 text-xs">Skip</Text>
          </TouchableOpacity>
          </View>  

     </View>

  </View>
      

   
  )
}