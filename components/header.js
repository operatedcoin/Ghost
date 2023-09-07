import { View, Text, Platform, TouchableOpacity, Modal, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const ios = Platform.OS === 'ios';

export default function Header({ isModalVisible, setModalVisible }) {

  return (
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="dark" />
        <View className="flex-row justify-between items-center mx-4">
          <Text className="text-neutral-900 text-2xl font-bold">
              Green Thumb</Text>
        {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity> */}
        </View>

          {/* Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <SafeAreaProvider>
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
       <View className="relative mx-4">
          <Text className="text-neutral-900 text-2xl font-bold text-center">
                Instructions</Text>
          <TouchableOpacity className="absolute top-1 left-0 " title="Close" onPress={() => setModalVisible(false)}>
          <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="mx-4 pt-8">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View> 
        </SafeAreaView>
        </SafeAreaProvider>
      </Modal>

        </SafeAreaView>
  )
}
