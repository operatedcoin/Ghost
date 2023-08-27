import React, { useState, useEffect, forwardRef } from 'react';
import { Audio } from 'expo-av';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AudioPlayerProps = {
  audioFile: any;
  trackTitle: string;
  onPlay: () => void;
  onPause: () => void;
};

function formatTime(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
}

const CollectAudioPlayer = forwardRef((props: AudioPlayerProps, ref) => {
  const { audioFile, trackTitle, onPlay, onPause } = props;
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  async function loadAudio() {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
      setSound(newSound);

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
                newSound.setPositionAsync(0);  // Reset audio position to start with newSound
                setPosition(0);  // Update your local state as well
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
  }, []);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const toggleAudio = () => (isPlaying ? pauseAudio() : playAudioHelper());

  function getProgress() {
    if (position !== null && duration !== null && duration !== 0) {
      return ((position / duration) * 100).toFixed(2);
    }
    return '0';
  }

  return (
    <View className="flex-row bg-white w-full rounded-lg space-x-3">
      <TouchableOpacity onPress={toggleAudio}>
        <View className="flex justify-center h-12 w-12 rounded-full items-center bg-green-500">
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
            className="bg-green-500 rounded-lg h-2"
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
  );
});

export default CollectAudioPlayer;
