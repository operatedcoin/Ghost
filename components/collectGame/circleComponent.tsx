import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import WeedIcon from './weedIcon';
import * as Haptics from 'expo-haptics';

function CircleComponent({ isActive, beaconName, onPress, playInactiveAudio, beaconData }) {

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

  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    if (isActive || (isActive && isTapped)) {
      beacondetectHaptic();
    }
  }, [isActive, isTapped]); 

  const getCircleStyle = () => {
    if (isActive && isTapped) return "border-white bg-green-500";
    if (isTapped) return "border-green-500 bg-transparent";
    if (isActive) return "border-white bg-green-500";
    return "border-neutral-500 bg-transparent";
  };  

  const getCircleContent = () => {
    if (isActive && isTapped) {
      return <WeedIcon size={45} fill="white" />;
    }
    if (isTapped) {
      return <WeedIcon size={45} fill="#22C55E" />;
    }
    if (isActive) {
      return <Text className="text-white text-center font-bold text-[9px] uppcase">TAP TO COLLECT</Text>;
    }
    return <WeedIcon size={45} fill="#737373" />;
  };

  return (
    <TouchableOpacity 
      onPress={() => { 
        console.log("Circle tapped");

        if (!isActive) {
          playInactiveAudio(beaconData[beaconName].inactiveAudioPath);
        } else {
          setIsTapped(true);
          onPress(beaconName);
        }
      }}    
      disabled={isTapped && !isActive}
      className={`w-16 h-16 rounded-full border-2 m-1 justify-center items-center ${getCircleStyle()}`}
    >
     <View>
        {getCircleContent()}
      </View>
    </TouchableOpacity>
  );
}

export default CircleComponent;
