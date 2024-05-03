import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';

const BottomModal = () => {
  const bottomSheetRef = useRef(null);
  const handleModal = () => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-Dimensions.get('window').height / 3);
    }
  };
  const data = Array(50)
    .fill(0)
    .map((_, index) => `index: ${index}`);
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.button} onPress={handleModal} />
      <BottomSheet ref={bottomSheetRef}>
        <View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View>
                <Text>{item}</Text>
              </View>
            )}
          />
          <View>
            <Text>Adesh</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: Dimensions.get('screen').width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'orange',
    opacity: 0.6,
  },
});
