import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Fetch = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        setData(data.products);
      });
  }, []);
  return (
    <View>
      <Text>Fetch</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.box}>
            <Image source={{uri: item?.thumbnail}} style={styles.image} />
            <Text>{item?.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
