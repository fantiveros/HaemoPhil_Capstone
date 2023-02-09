import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native';
import { styles } from '../../landing/styles';
import ImageModal from 'react-native-image-modal';

export const ImageViewer = ({ onCancel, image, isVisible }) => {
  return (
    <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalStyle}>
                <View style={[styles.modalViewContainer, styles.modalViewContainerContentCenter]}>
                    <View>
                    <ImageModal
                        resizeMode="contain"
                        imageBackgroundColor="#000000"
                        style={{
                            width: 300,
                            height: 350,
                        }}
                        source={{ uri: image }}/>
                    </View>
                    <View style={styles.modalBtnContainer}>
                        <TouchableOpacity
                            onPress={onCancel}
                            style={[ styles.transparentBtn, { width: '40%', marginHorizontal: 10 } ]}>
                            <Text style={{ color: '#E15C63' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    </Modal>
  )
}