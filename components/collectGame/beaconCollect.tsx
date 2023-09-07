    import React, { useState, useEffect, useRef } from 'react';
    import { View, Text, TouchableOpacity } from 'react-native';
    import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import CircleComponent from './circleComponent';
    import useBLE from '../useBLE';
    import { targetDevices } from '../useBLE';
    import ScanIndicator from '../scanIndicator';
    import { Ionicons } from '@expo/vector-icons';
    import WeedIcon from './weedIcon';
    import CollectAudioPlayer from './collectAudioPlayer';
    import LoadingSpinner from './loadingSpinner';
    import * as Haptics from 'expo-haptics';
    import { Audio } from 'expo-av';

    const Stack = createNativeStackNavigator();

    function MainScreen({ navigation, beaconData, goToHome, onWeedsCollected }) {
    const [tappedBeacons, setTappedBeacons] = useState([]);
    const { nearestDevice, scanForPeripherals, requestPermissions, stopScanning } = useBLE();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const isFocused = useIsFocused();
    

    const playInactiveAudio = async (audioPath) => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
          }
        const { sound: newSound } = await Audio.Sound.createAsync(audioPath);
        setSound(newSound);
        await newSound.playAsync();
      };

      useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

    // Request permissions and initiate scanning for devices
    useFocusEffect(
        React.useCallback(() => {
          // Request permissions and start scanning when the Main screen is focused
          requestPermissions((granted) => {
            if (granted) scanForPeripherals();
          });
    
          return () => {
            // Stop scanning when the Main screen loses focus
            stopScanning();
          };
        }, [requestPermissions, scanForPeripherals, stopScanning])
      );

    //console.log("Nearest Device:", nearestDevice);

    const handleCirclePress = (beaconName) => {
        const currentBeaconData = beaconData[beaconName];

            // Stop any playing audio
            if (sound) {
                sound.stopAsync();
            }
    
            if (!tappedBeacons.includes(beaconName)) {
                setTappedBeacons(prev => [...prev, beaconName]);
        
                // Check if onWeedsCollected is a function before calling it
                if (typeof onWeedsCollected === 'function') {
                    onWeedsCollected(tappedBeacons.length + 1);
                }
    
        navigation.navigate('LoadingScreen');
        
        setTimeout(() => {
            navigation.navigate('BeaconDetail', { 
            beaconName: currentBeaconData.name, 
            beaconDescription: currentBeaconData.description,
            beaconWeight: currentBeaconData.weight,
            beaconHeight: currentBeaconData.height,
            beaconOrigin: currentBeaconData.origin,
            audioFilePath: currentBeaconData.audioFilePath,
            trackTitle: currentBeaconData.trackTitle
            });
        }, 2000); // Change this to set the duration of the "loading" screen
        } else {
        navigation.navigate('BeaconDetail', { 
            beaconName: currentBeaconData.name, 
            beaconDescription: currentBeaconData.description,
            beaconWeight: currentBeaconData.weight,
            beaconHeight: currentBeaconData.height,
            beaconOrigin: currentBeaconData.origin,
            audioFilePath: currentBeaconData.audioFilePath,
            trackTitle: currentBeaconData.trackTitle
        });
        }
    };
    
    
    
    

    return (
        <View className="flex-1 flex-col mx-4 mt-3 mb-10 p-2 bg-neutral-200 rounded-xl items-center">


            <View className="flex-row bg-white rounded-full p-1 px-2 items-center justify-center">
                <ScanIndicator />
                <Text className="text-black text-[10px]">Scanning</Text>
            </View>

            <View className="grow" />
            
            <Text className="text-green-500 text-xl font-bold">{`${tappedBeacons.length} out of 7 Weeds collected`}</Text>
            <Text className="text-neutral-400 text-center text-xs pt-2 pb-4">Hint: Tap an uncollected weed for a location clue</Text>
            <View className="flex flex-row flex-wrap w-full">
                {targetDevices
                    .filter(device => device !== 'MsgEight')
                    .map(device => (
                    <View className="w-1/4" key={device}>
                        <CircleComponent
                            beaconName={device}
                            isActive={nearestDevice === device}
                            onPress={handleCirclePress}
                            playInactiveAudio={playInactiveAudio}
                            beaconData={beaconData}
                        />

                    </View>
                ))}
            </View>

            <View className="grow" />
            
            {tappedBeacons.length === 7 && 
                <TouchableOpacity className="bg-black p-3 mb-3 w-full items-center rounded-xl" onPress={goToHome}>
                    <Text className="text-white">Synthesise results</Text>
                </TouchableOpacity>
            }
        </View>

    );
    }

    function LoadingScreen() {

        const weedscanHaptic = async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            await new Promise(resolve => setTimeout(resolve, 50));
        };

        useEffect(() => {
            // Start the haptic pattern
            const interval = setInterval(() => {
            weedscanHaptic();
            }, 50);
        
            // Stop the haptic pattern after 2000 milliseconds
            const timeout = setTimeout(() => {
            clearInterval(interval);
            }, 2000);
        
            // Cleanup function to clear the interval and timeout if the component is unmounted before 2000ms
            return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            };
        }, []);

    return (
        <View className="flex-1 flex-col mx-4 mt-3 mb-10 p-2 bg-neutral-200 rounded-xl justify-center items-center">
        <View className="mb-4"><LoadingSpinner /></View>
        <Text className="text-neutral-400 text-2xl">Analysing sample...</Text>
        </View>
    );
    }

    function BeaconDetailScreen({ route, navigation }) {
    const { beaconName, beaconDescription, beaconWeight, beaconHeight, beaconOrigin, audioFilePath, trackTitle } = route.params;
    
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioPlayerRef = useRef(null);
    const [audioLoaded, setAudioLoaded] = useState(false);


    const handleAudioPlay = () => {
        setAudioPlaying(true);
    };

    const handleAudioPause = () => {
        setAudioPlaying(false);
    };

    useEffect(() => {
        if (audioLoaded) {
          audioPlayerRef.current?.playAudio();
        }
      }, [audioLoaded]);
      
    return (
        <View className="flex-1 flex-col justify-between mx-4 mt-3 mb-6 p-3 bg-green-500 rounded-xl items-center">
            <View className="flex flex-row justify-between items-center">
                <TouchableOpacity className="flex-row" onPress={()=> navigation.navigate('Main')}>
                <Ionicons name="chevron-back" size={24} color="white" />    
                <Text className="text-white text-lg">Back</Text>
                </TouchableOpacity>
                <View className='grow' />
                <View>
                    <CollectAudioPlayer
                    ref={audioPlayerRef} 
                    audioFile={audioFilePath} 
                    trackTitle={trackTitle} 
                    onPlay={handleAudioPlay} 
                    onPause={handleAudioPause}
                    onAudioLoaded={setAudioLoaded} 
                    />
                </View>
            </View>
            
            <View className="flex-col bg-green-600 p-3 w-full grow mt-3 rounded-lg">
                <View className="flex-row justify-between ">
                    <View className="pt-2 mr-2"><WeedIcon size={100} fill="white" /></View>
                    <View className="grow">
                        <Text className="text-xs text-white uppercase opacity-50">Fact File</Text>
                        <Text className="text-white text-xl font-bold">{beaconName}</Text>
                        <View className="flex-row justify-between mt-4">
                            <View className="flex pr-4 border-r border-white/50  items-center">
                                <Text className="text-white text-xs font-bold">{beaconWeight}</Text>
                                <Text className="text-white text-xs opacity-50">Weight</Text>
                            </View>
                            <View className="flex pr-4 border-r border-white/50 items-center">
                                <Text className="text-white text-xs font-bold">{beaconHeight}</Text>
                                <Text className="text-white text-xs opacity-50">Height</Text>
                            </View>
                            <View className="flex items-center">
                                <Text className="text-white text-xs font-bold">{beaconOrigin}</Text>
                                <Text className="text-white text-xs opacity-50">Origin</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="flex">
                    <Text className="text-white text-xs font-bold uppercase">Analysis</Text>
                    <Text className="text-white text-xs">{beaconDescription}</Text>
                </View>    
            </View>
        </View>
    );
    }

    function BeaconCollect({ beaconData, goToHome }) {
        
    return (
        <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Main" screenOptions={{gestureEnabled: false, animation: 'simple_push', animationDuration: 200}}>
            <Stack.Screen name="Main" options={{ headerShown: false }}>
            {props => <MainScreen {...props} beaconData={beaconData} goToHome={goToHome} />}
            </Stack.Screen>
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="BeaconDetail" component={BeaconDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
    );
    }

    export default BeaconCollect;
