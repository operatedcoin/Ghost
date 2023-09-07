import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChapterOne from '../screens/ChapterOne';
import ChapterTwo from '../screens/ChapterTwo';
import ChapterThree from '../screens/ChapterThree';
import ChapterFour from '../screens/ChapterFour';
import ChapterFive from '../screens/ChapterFive';
import ChapterSix from '../screens/ChapterSix';
import ChapterSeven from '../screens/ChapterSeven';
import FailedScreen from '../screens/FailedScreen';


export type RootStackParamList = {
  Home: undefined;
  ChapterOne: undefined;
  ChapterTwo: undefined;
  ChapterThree: undefined;
  ChapterFour: undefined;
  ChapterFive: undefined;
  ChapterSix: undefined;
  ChapterSeven: undefined;
  Failed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="ChapterOne" options={{headerShown: false}} component={ChapterOne}  />
        <Stack.Screen name="ChapterTwo" options={{headerShown: false}} component={ChapterTwo}  />
        <Stack.Screen name="ChapterThree" options={{headerShown: false}} component={ChapterThree}  />
        <Stack.Screen name="ChapterFour" options={{headerShown: false}} component={ChapterFour}  />
        <Stack.Screen name="ChapterFive" options={{headerShown: false}} component={ChapterFive}  />
        <Stack.Screen name="ChapterSix" options={{headerShown: false}} component={ChapterSix}  />
        <Stack.Screen name="ChapterSeven" options={{headerShown: false}} component={ChapterSeven}  />
        <Stack.Screen name="Failed" options={{headerShown: false}} component={FailedScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}