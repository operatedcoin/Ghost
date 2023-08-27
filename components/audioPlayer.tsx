import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import ScanIndicator from './scanIndicator';

const audioFiles = {
  'conspiracyV4.mp3': require('../audio/conspiracyV4.mp3'),
  'meatballV4.mp3': require('../audio/meatballV4.mp3'),
  // Add other audio files here...
};

interface AudioPlayerProps {
  beaconName: string;
  beaconTitle: string;
  trackTitle: string;
  audioName: string;
  bgColor: string;
  isPlaying: boolean; // New Prop
  onPlay: () => void;  // New Prop
  onPause: () => void; // New Prop
}

function formatTime(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
}

const AudioPlayer = forwardRef((props: AudioPlayerProps, ref) => {
  const { beaconTitle, trackTitle, audioName, bgColor, isPlaying: propIsPlaying, onPlay, onPause } = props;
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  async function loadAudio() {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(audioFiles[audioName]);
      setSound(newSound);

      console.log(`Audio file "${audioFiles[audioName]}" loaded successfully.`); // Added console log line with filename.
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
            
            if (status.isPlaying) {
                setIsPlaying(true);
            }
            
            if (status.didJustFinish) {
                setIsPlaying(false);
                onPause(); // If onPause is responsible for resuming scanning
                if (sound) {
                    sound.setPositionAsync(0);  // Reset audio position to start
                    setPosition(0);  // Update your local state as well
                }
            }
        }
    });
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }

  async function playAudioHelper() {
    if (sound && !isPlaying) {
      try {
        await sound.playAsync();
        setIsPlaying(true);
        onPlay(); // Call onPlay when audio starts
      } catch (error) {
        console.error('Error while playing audio:', error);
      }
    }
  }

  async function pauseAudio() {
    if (sound && isPlaying) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
        onPause(); // Call onPause when audio pauses
      } catch (error) {
        console.error('Error while pausing audio:', error);
      }
    }
  }

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync();
          setIsPlaying(false);
        }
      };
    }, [sound])
  );

  const toggleAudio = () => (isPlaying ? pauseAudio() : playAudioHelper());

  function getProgress() {
    if (position !== null && duration !== null && duration !== 0) {
      return ((position / duration) * 100).toFixed(2);
    }
    return '0';
  }

  return (
    <View className={`flex-col justify-end mx-4 mt-3 mb-10 p-2 ${bgColor} rounded-xl items-center basis-1/3`}>
     {/* Scanning label */}
    <View className="grow">
          {
        isPlaying ? (
          <View className="flex-row bg-neutral-200 rounded-full p-1 px-2 items-center justify-center">
            <View className="bg-neutral-400 w-2 h-2 rounded-full mr-1" />
            <Text className="text-neutral-400 text-[10px]">Scanning paused</Text>
          </View>
        ) : (
          <View className="flex-row bg-white rounded-full p-1 px-2 items-center justify-center">
            <ScanIndicator />
            <Text className="text-black text-[10px]">Scanning</Text>
          </View>
        )
      }
    </View>
    <View className="pb-4"><Ionicons name="radio" size={30} color="white" /></View>
    <Text className="text-white font-bold pb-1">{beaconTitle} Available</Text>
    <Text className="text-white text-xs">Secondary text</Text>
    <View className="grow"></View>

    <View className="flex-row bg-white p-3 w-full rounded-lg space-x-3">
      <TouchableOpacity onPress={toggleAudio}>
        <View className={`flex justify-center h-12 w-12 rounded-full items-center ${bgColor}`}>
          {isPlaying ? (
            <Ionicons name="ios-pause" size={30} color="white" />
          ) : (
            <Ionicons name="play" size={30} color="white" />
          )}
        </View>
      </TouchableOpacity>
      <View className="flex-col justify-center grow">
        <Text className="font-bold">{trackTitle}</Text>
        <View className="w-full bg-gray-100 rounded-lg h-2 mt-2">
          <View
            className={`${bgColor} rounded-lg h-2`}
            style={{ width: `${getProgress()}%` } as View["props"]["style"]}
          />
        </View>
        <View className="flex-row">
          <Text className="text-xs text-neutral-500">{formatTime(position)}</Text>
          <View className="grow" />
          <Text className="text-xs  text-neutral-500">{formatTime(duration - position)}</Text>
        </View>
      </View>
    </View>
  </View>
  );
});

export default AudioPlayer;