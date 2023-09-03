import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import useBLE from './useBLE';
import { Ionicons } from '@expo/vector-icons';
import AudioPlayer from './audioPlayer';
import ScanIndicator from './scanIndicator';

interface BeaconInfo {
    beaconName: string;
    beaconTitle: string;
    trackTitle: string;
    audioName: string;
    bgColor: string;
  }
  
  interface BeaconProps {
    beacons: BeaconInfo[];
  }

const Beacon = ({ beacons }: BeaconProps) => {
  const { nearestDevice, scanForPeripherals, requestPermissions, stopScanning } = useBLE();
  const [visibleBeacons, setVisibleBeacons] = useState<BeaconInfo[]>([]);
 

  useEffect(() => {
    requestPermissions((granted) => {
        if (granted) scanForPeripherals();
    });

    // Cleanup function
    return () => {
        stopScanning();
    };
}, [requestPermissions, scanForPeripherals, stopScanning]);



  const playerRef = useRef(null);

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


    // State to manage whether audio is playing
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
        {visibleBeacons.length > 0 ? (
          visibleBeacons.map((beacon) => (
            <AudioPlayer
              ref={playerRef}
              beaconName={beacon.beaconName}
              beaconTitle={beacon.beaconTitle}
              trackTitle={beacon.trackTitle}
              audioName={beacon.audioName}
              bgColor={beacon.bgColor}
              key={beacon.beaconName}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ))
        ) : (
        <View className={`flex-col justify-end mx-4 mt-3 mb-10 p-2 bg-neutral-200 rounded-xl items-center basis-1/3`}>
            <View className="grow">
                  <View className="flex-row bg-white rounded-full p-1 px-2 items-center justify-center">
                    <ScanIndicator />
                    <Text className="text-black text-[10px]">Scanningtt</Text>
                  </View>
            </View>
            <View className="pb-4"><Ionicons name="radio" size={30} style={{ color: 'rgb(163, 163, 163)' }} /></View>
            <Text className="text-neutral-400 font-bold pb-1">Nothing is growing here.</Text>
            <Text className="text-neutral-400 text-xs">Place this device next to strange weeds to scan their bio data.</Text>
            <View className="grow"></View>
          </View>
        )}
      </>
    );

  };

export default Beacon;



