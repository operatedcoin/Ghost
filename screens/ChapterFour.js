import { View, Text, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import { weedsDataLookup } from '../beaconData/weedsData';
import BeaconCollect from '../components/collectGame/beaconCollect';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';



const ios = Platform.OS === 'ios';


export default function ChapterFour({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [collectedWeedsCount, setCollectedWeedsCount] = useState(0);
  const nav = useNavigation();


  const handleGoToHome = () => {
    navigation.navigate('ChapterFive');
  };


  useFocusEffect(
    React.useCallback(() => {
      playAudio(require('../audio/MysteryLight.mp3'), 'four');
      return () => stopAudio('four'); 
    }, [])
  );

  useEffect(() => {
    if (isFirstLoad) {
      setBottomSheetVisible(true);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    console.log("Collected weeds count:", collectedWeedsCount);
}, [collectedWeedsCount]);

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

     <View className="my-8">
      <TimerComponent 
          isModalVisible={isBottomSheetVisible || isHeaderModalVisible} 
          duration={540} nextScreen="Failed"  
          navigation={navigation}/>
             <View className="mx-4 p-4 items-center">
      <TouchableOpacity onPress={()=> navigation.replace('ChapterFive')}>
      <Text className="text-neutral-200 text-xs">Skip</Text>
      </TouchableOpacity>
      </View>  
    </View>


        <View className="bg-white mx-4 p-4 rounded-xl">
          <Text className="text-neutral-900 text-center text-2xl font-bold">Collect the Samples</Text>
          <Text className="text-neutral-900 text-center text-xs pt-2">Hold the device close the centre of the weeds.{"\n"} Then tap the weeds icon to collect the sample.</Text>
        </View>

        <BeaconCollect 
          goToHome={handleGoToHome} 
          beaconData={weedsDataLookup}
          onWeedsCollected={setCollectedWeedsCount}
        />

        <BottomSheetModal
        isVisible={isBottomSheetVisible} 
        onClose={() => setBottomSheetVisible(false)}
        title="Stop the Spread!"
        content="We have 9 minutes before the infestation grows."
      />

     </View>  

  </View>

  
      

   
  )
}
