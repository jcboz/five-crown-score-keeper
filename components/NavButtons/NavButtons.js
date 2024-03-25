import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native';

import styles from './styles';

// eslint-disable-next-line react/prop-types
export default function NavButtons({ leftText, rightText, leftNav, rightNav }) {
  const navigation = useNavigation();

  function handleNavigation() {
    // Gonn have to map all the names in nameList useState to a regular array and then pass that into the navigate function
    const nameArr = [];
    // eslint-disable-next-line array-callback-return
    nameList.map((names) => {
      nameArr.push(names);
    });
    console.log('nameArr: ', nameArr);
    if (nameArr.length >= 2) navigation.navigate('Home', { names: nameArr });
    else Alert.alert('You must enter at least 2 players!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonLeft}>
        <Pressable
          onPress={() => navigation.navigate(leftNav, { leftNav })}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#D3D3D3' : 'white',
            },
            styles.button,
          ]}>
          <Text style={styles.text}>{leftText}</Text>
        </Pressable>
      </View>
      <View style={styles.buttonRight}>
        {rightText ? (
          <Pressable
            onPress={() => navigation.navigate(rightNav, { rightNav })}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#D3D3D3' : 'white',
              },
              styles.button,
            ]}>
            <Text style={styles.text}>{rightText}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
