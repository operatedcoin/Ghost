import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChapterOne from '../screens/ChapterOne';
import ChapterTwo from '../screens/ChapterTwo';
import ChapterThree from '../screens/ChapterThree';
import ChapterFour from '../screens/ChapterFour';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="ChapterOne" options={{headerShown: false}} component={ChapterOne}  />
        <Stack.Screen name="ChapterTwo" options={{headerShown: false}} component={ChapterTwo}  />
        <Stack.Screen name="ChapterThree" options={{headerShown: false}} component={ChapterThree}  />
        <Stack.Screen name="ChapterFour" options={{headerShown: false}} component={ChapterFour}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}