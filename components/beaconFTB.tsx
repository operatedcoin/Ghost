import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WeedIcon from './collectGame/weedIcon';
import useBLE from './useBLE';
import AudioPlayer from './audioPlayer';
import ScanIndicator from './scanIndicator';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

interface BeaconInfo {
  beaconName: string;
  beaconTitle: string;
  trackTitle: string;
  audioName: string;
  bgColor: string;
}

interface BeaconFTBProps {
  beacons: BeaconInfo[];
}

const BeaconFTB = ({ beacons }: BeaconFTBProps) => {
  const { nearestDevice, scanForPeripherals, requestPermissions, stopScanning } = useBLE();
  const [visibleBeacons, setVisibleBeacons] = useState<BeaconInfo[]>([]);
  const playerRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions((granted) => {
        if (granted) scanForPeripherals();
    });

    // Cleanup function
    return () => {
        stopScanning();
    };
}, [requestPermissions, scanForPeripherals, stopScanning]);



useEffect(() => {
  console.log("nearestDevice:", nearestDevice);

  const currentBeacon = beacons.find(beacon => beacon.beaconName === nearestDevice);

  if (playerRef.current) {
    playerRef.current.unloadAudio().catch(error => {
      console.error("Error unloading audio:", error);
    });
  }

  if (currentBeacon) {
    setVisibleBeacons([currentBeacon]);
  } else {
    setVisibleBeacons([]);
  }

  // Cleanup function
  return () => {
      if (playerRef.current) {
          playerRef.current.unloadAudio().catch(error => {
              console.error("Error unloading audio during cleanup:", error);
          });
      }
  };

}, [beacons, nearestDevice]);

useEffect(() => {
  if (visibleBeacons.length > 0 && visibleBeacons[0].beaconName === 'MsgEight') {
    // Trigger haptic feedback when the condition is met
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
}, [visibleBeacons]);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
        stopScanning();
    } else {
        scanForPeripherals();
    }

    // Cleanup function
    return () => {
        stopScanning();
    };
}, [isPlaying, scanForPeripherals, stopScanning]);


  return (
    <>
      {visibleBeacons.length > 0 && visibleBeacons[0].beaconName === 'MsgEight' ? (
  <>
  <View className={`flex-col justify-end mx-4 mt-3 mb-10 p-2 bg-green-500 rounded-xl items-center basis-1/3`}>
          <View className="grow">
            <View className="flex-row bg-white rounded-full p-1 px-2 items-center justify-center">
            <ScanIndicator />
              <Text className="text-black text-[10px]">Scanning</Text>
            </View>
          </View>
          <View className="pb-4"><WeedIcon size={50} fill="#ffffff"/></View>
          <Text className="text-white font-bold pb-1">The Source Weed is Detected</Text>
          <View className="grow"></View>
          <TouchableOpacity className="bg-black p-3 w-full items-center rounded-xl"  onPress={() => {(navigation as any).replace('ChapterSeven');}}>
            <Text className="text-white">Extract Source DNA</Text>
          </TouchableOpacity>   
        </View>   
  </>
) : visibleBeacons.length > 0 ? (
        <View className={`flex-col justify-end mx-4 mt-3 mb-10 p-2 bg-neutral-700 rounded-xl items-center basis-1/3`}>
          <View className="grow">
            <View className="flex-row bg-white rounded-full p-1 px-2 items-center justify-center">
            <ScanIndicator />
              <Text className="text-black text-[10px]">Scanning</Text>
            </View>
          </View>
          <View className="pb-4"><Ionicons name="radio" size={30} color="white" /></View>
          <Text className="text-white font-bold pb-1">Weed Detected</Text>
          <Text className="text-white text-xs">This is not the source of the infestation. Keep searching.</Text>
          <View className="grow"></View>
        </View>
      ) : (
        <View className={`flex-col justify-end mx-4 mt-3 mb-10 p-2 bg-neutral-200 rounded-xl items-center basis-1/3`}>
          <View className="grow">
            <View className="flex-row bg-white rounded-full p-1 px-2 items-center justify-center">
            <ScanIndicator />
              <Text className="text-black text-[10px]">Scanning</Text>
            </View>
          </View>
          <View className="pb-4"><Ionicons name="radio" size={30} style={{ color: 'rgb(163, 163, 163)' }} /></View>
          <Text className="text-neutral-400 font-bold pb-1">Source Currently Undetected</Text>
          <Text className="text-neutral-400 text-xs">Keep searching.</Text>
          <View className="grow"></View>
        </View>
      )}
    </>
  );
};

export default BeaconFTB;
