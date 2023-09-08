import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fadeOutAndStopAudio, playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import BeaconFTB from '../components/beaconFTB';
import LoadingSpinner from '../components/collectGame/loadingSpinner';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';



const ios = Platform.OS === 'ios';

export default function ChapterFive({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const nav = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      playAudio(require('../audio/samba.mp3'), 'samba');
      return () => stopAudio('samba'); // This stops 'beatOneHello.m4a' when navigating away from HomeScreen
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
        <TimerComponent duration={10} nextScreen="ChapterSix" navigation={navigation} />
    </View> 

        <View className="bg-white mx-4 p-4 rounded-xl items-center">
          <View className="mb-4"><LoadingSpinner /></View>
          <Text className="text-neutral-400 text-2xl text-center">Synthesising results{"\n"}Locating source infestation</Text>
        </View>

          
        <View className="grow"></View>  

     </View>

  </View>
      

   
  )
}
  
