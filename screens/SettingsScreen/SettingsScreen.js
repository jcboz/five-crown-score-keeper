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

import PlayerScores from '../../components/PlayerScores/PlayerScores';

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
  },
  buttons: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#E7C721',
    borderRadius: 12,
    borderWidth: 2,
    height: 60,
    justifyContent: 'center',
    margin: 10,
    width: 220,
  },
  container: {
    alignItems: 'center',
    flex: 1,
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
  menu_button: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 10,
    shadowoffset: { width: 5, height: 5 },
    width: 100,
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

function SettingsScreen() {
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
      <View style={[styles.container, themeContainerStyle]}>
        <Pressable style={styles.menu_button} onPress={() => navigation.navigate('Start')}>
          <Text>Menu</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default SettingsScreen;
