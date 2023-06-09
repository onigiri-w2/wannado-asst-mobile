import {TouchableOpacity, StyleSheet} from 'react-native';

import {Box} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ACCENT_COLOR, BORDER_CIRCLE_RADIUS} from '@/styles/const';

import {useWannadoneModalContext} from '../../providers/WannadoneModalProvider';

export const Buttons = () => {
  const {isModalVisible, hideModal, showModal} = useWannadoneModalContext();
  const handlePress = () => {
    if (isModalVisible) {
      hideModal();
    } else {
      showModal();
    }
  };

  return (
    <Box style={styles.buttonView} alignItems="center">
      <TouchableOpacity onPress={handlePress}>
        <Box
          mb={4}
          p={2}
          background="white"
          borderWidth={1}
          borderColor={isModalVisible ? ACCENT_COLOR : 'black'}
          borderRadius={BORDER_CIRCLE_RADIUS}
          bg={isModalVisible ? ACCENT_COLOR : 'white'}>
          <Ionicons
            name="md-checkmark-done"
            size={24}
            color={isModalVisible ? 'white' : 'black'}
          />
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 2,
  },
});
