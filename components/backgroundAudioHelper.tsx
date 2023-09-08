import { Audio } from 'expo-av';

const activeSounds = {};

// the below values are need for the fade out
let currentVolume = 1;  // Assuming max volume is 1 and min is 0
const fadeOutInterval = 100; // Decrease volume every 100ms
const fadeOutStep = currentVolume / (5000 / fadeOutInterval); // 10 seconds = 10000ms


export const playAudio = async (audioFile, key, shouldLoop = true) => {
    if (activeSounds[key]) {
        await activeSounds[key].unloadAsync();
    }
    
    const { sound } = await Audio.Sound.createAsync(audioFile, { shouldPlay: true, isLooping: shouldLoop });
    activeSounds[key] = sound;
};

export const stopAudio = async (key) => {
    if (activeSounds[key]) {
        await activeSounds[key].unloadAsync();
        delete activeSounds[key];
    }   
};

export const fadeOutAndStopAudio = (key) => {
    // Check if the audio with the given key exists
    if (!activeSounds[key]) return;

    const interval = setInterval(async () => {  // <-- make this async
        currentVolume -= fadeOutStep;

        if (currentVolume <= 0) {
            clearInterval(interval);
            stopAudio(key);  // Use the existing stopAudio function
        } else {
            // Use setVolumeAsync to change the volume
            await activeSounds[key].setVolumeAsync(currentVolume);
        }
    }, fadeOutInterval);
};

