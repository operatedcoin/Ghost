import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { playAudio, stopAudio } from '../components/backgroundAudioHelper';
import Header from '../components/header';
import TimerComponent from '../components/timerComponent';
import BottomSheetModal from '../components/bottomSheet';
import { useIsFocused } from '@react-navigation/native';
import { weedsDataLookup } from '../beaconData/weedsData';
import BeaconCollect from '../components/collectGame/beaconCollect';

const ios = Platform.OS === 'ios';


export default function ChapterFour({ navigation }) {
  const isFocused = useIsFocused();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isHeaderModalVisible, setHeaderModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleGoToHome = () => {
    navigation.navigate('Home');
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

     <View className="my-8">
      <TimerComponent isModalVisible={isBottomSheetVisible || isHeaderModalVisible} duration={1000} nextScreen="Home" />
    </View>
        <View className="bg-white mx-4 p-4 rounded-xl">
          <Text className="text-neutral-900 text-center text-2xl font-bold">Collect the Weeds</Text>
          <Text className="text-neutral-900 text-center text-xs pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor ipsum at arcu condimentum, sed fermentum turpis aliquam. Fusce a dui egestas</Text>
        </View>

        <BeaconCollect goToHome={handleGoToHome} beaconData={weedsDataLookup} />

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
