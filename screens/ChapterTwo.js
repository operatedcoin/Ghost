import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import Beacon from '../components/beaconStandard';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';


const ios = Platform.OS === 'ios';

const beaconsData = [
  {
    beaconName: "MsgOne",
    beaconTitle: "Story Dot #1",
    trackTitle: "Conspiracy",
    audioName: "conspiracyV4.mp3",
    bgColor: "bg-purple-500"
  },
  {
    beaconName: "MsgTwo",
    beaconTitle: "Story Dot #2",
    trackTitle: "Meatball",
    audioName: "meatballV4.mp3",
    bgColor: "bg-green-500"
  },
  {
    beaconName: "MsgThree",
    beaconTitle: "Story Dot #3",
    trackTitle: "Conspiracy",
    audioName: "conspiracyV4.mp3",
    bgColor: "bg-blue-500"
  },
  {
    beaconName: "MsgFour",
    beaconTitle: "Story Dot #4",
    trackTitle: "Meatball",
    audioName: "meatballV4.mp3",
    bgColor: "bg-orange-500"
  },
  {
    beaconName: "MsgFive",
    beaconTitle: "Story Dot #5",
    trackTitle: "Conspiracy",
    audioName: "conspiracyV4.mp3",
    bgColor: "bg-teal-500"
  },
  {
    beaconName: "MsgSix",
    beaconTitle: "Story Dot #6",
    trackTitle: "Meatball",
    audioName: "meatballV4.mp3",
    bgColor: "bg-fuchsia-500"
  },
  {
    beaconName: "MsgSeven",
    beaconTitle: "Story Dot #7",
    trackTitle: "Conspiracy",
    audioName: "conspiracyV4.mp3",
    bgColor: "bg-rose-500"
  },
  {
    beaconName: "MsgEight",
    beaconTitle: "Story Dot #8",
    trackTitle: "Meatball",
    audioName: "meatballV4.mp3",
    bgColor: "bg-sky-500"
  },
  // Add other beacons as needed...
];

export default function ChapterTwo({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

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

     <TimerComponent isModalVisible={isBottomSheetVisible || isHeaderModalVisible} duration={10} nextScreen="ChapterThree" />

      <View className="grow"></View> 

        <View className="bg-white mx-4 p-4 rounded-xl">
          <Text className="text-neutral-900 text-center text-2xl font-bold">Task 2</Text>
          <Text className="text-neutral-900 text-center text-xs pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor ipsum at arcu condimentum, sed fermentum turpis aliquam. Fusce a dui egestas</Text>
        </View>

       { isFocused && <Beacon beacons={beaconsData} /> }

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
