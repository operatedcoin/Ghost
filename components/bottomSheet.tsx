import React from 'react';
import { View, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

function BottomSheetModal({ isVisible, onClose, title, content }) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
         <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1" style={{ backgroundColor: 'transparent' }} />
        </TouchableWithoutFeedback>
  
        <View className="h-1/2 justify-end flex bg-white p-5">
            <Text className="text-3xl font-bold text-center mb-6">{title}</Text>
          <Text className="text-center">{content}</Text>
            <View className="grow"></View>
          <TouchableOpacity className="bg-black p-3 w-full items-center rounded-xl mb-3" title="Close" onPress={onClose} >
            <Text className="text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
  
  export default BottomSheetModal;