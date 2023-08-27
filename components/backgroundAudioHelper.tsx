import { Audio } from 'expo-av';

let activeSound = null;
let lastPlayedFile = null;

export const playAudio = async (audioFile) => {
    if (activeSound) {
        await activeSound.unloadAsync();
        activeSound = null;
    }
    
    const { sound } = await Audio.Sound.createAsync(audioFile, { shouldPlay: true, isLooping: true });
    activeSound = sound;
    lastPlayedFile = audioFile;
};

export const stopAudio = async () => {
    if (activeSound) {
        await activeSound.unloadAsync();
        activeSound = null;
    }
};