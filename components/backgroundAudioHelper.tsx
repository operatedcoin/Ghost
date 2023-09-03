import { Audio } from 'expo-av';

const activeSounds = {};

export const playAudio = async (audioFile, key) => {
    if (activeSounds[key]) {
        await activeSounds[key].unloadAsync();
    }
    
    const { sound } = await Audio.Sound.createAsync(audioFile, { shouldPlay: true, isLooping: true });
    activeSounds[key] = sound;
};

export const stopAudio = async (key) => {
    if (activeSounds[key]) {
        await activeSounds[key].unloadAsync();
        delete activeSounds[key];
    }
};
