import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import BeaconFTB from '../components/beaconFTB';


const ios = Platform.OS === 'ios';

const beaconsData = [
  {
    beaconName: "MsgFive",
    beaconTitle: "Story Dot #1",
    trackTitle: "Conspiracy",
    audioName: "conspiracyV4.mp3",
    bgColor: "bg-purple-500"
  },
  // Add other beacons as needed...
];

export default function ChapterOne({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        playAudio(require('../audio/cityBinauralV4.mp3'));
      });
    } else {
      stopAudio(require('../audio/cityBinauralV4.mp3'));
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

    <TimerComponent isModalVisible={isBottomSheetVisible || isHeaderModalVisible} duration={10} nextScreen="ChapterTwo" />

      <View className="grow"></View> 

        <View className="bg-white mx-4 p-4 rounded-xl">
          <Text className="text-neutral-900 text-center text-2xl font-bold">Task 1</Text>
          <Text className="text-neutral-900 text-center text-xs pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor ipsum at arcu condimentum, sed fermentum turpis aliquam. Fusce a dui egestas</Text>
        </View>

        <BeaconFTB beacons={beaconsData} />
          
        <BottomSheetModal
        isVisible={isBottomSheetVisible} 
        onClose={() => setBottomSheetVisible(false)}
        title="Chapter Title Here"
        content="Some description or instruction text here"
      />

     </View>

  </View>
      

   
  )
}
