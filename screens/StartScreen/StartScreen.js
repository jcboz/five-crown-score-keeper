import { StrokeText } from '@charmy.tech/react-native-stroke-text';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Appearance,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { OutlinedTextView } from 'react-native-outlined-text';

import Logo from '../../components/Logo/Logo';

const styles = StyleSheet.create({
  button_text: {
    color: 'white',
    fontFamily: 'Shrikhand_400Regular',
    fontSize: 16,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 1,
  },
  buttons: {
    alignItems: 'center',
    borderColor: '#E7C721',
    borderRadius: 12,
    borderWidth: 2,
    height: 60,
    justifyContent: 'center',
    margin: 15,
    width: 220,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
  lightContainer: {
    color: '#000',
  },
  lightThemeText: {
    color: '#fff',
  },
  logo: {
    position: 'relative',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  text: {
    color: 'white',
    fontFamily: 'Shrikhand_400Regular',
    fontSize: 96,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 1,
  },
});

function StartScreen() {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#5b1190', '#6c24aa', '#905fc3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 250,
          }}>
          <Logo style={styles.logo} />
        </View>
        <View style={[styles.container, themeContainerStyle]}>
          <Pressable
            onPress={() => navigation.navigate('Hang')}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#D3D3D3' : 'white',
              },
              styles.buttons,
            ]}>
            <Text style={styles.button_text}>Keep Score</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Hang')}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#D3D3D3' : 'white',
              },
              styles.buttons,
            ]}>
            <Text style={styles.button_text}>Play 5👑</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#D3D3D3' : 'white',
              },
              styles.buttons,
            ]}>
            <Text style={styles.button_text}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

export default StartScreen;
