/* eslint-disable react/prop-types */
import { Inter_300Light, useFonts } from '@expo-google-fonts/inter';
import { Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Appearance,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AnimatedAppLoader from './components/AnimatedAppLoader/AnimatedAppLoader';
import GameScreen from './screens/GameScreen/GameScreen';
import HangScreen from './screens/HangScreen/HangScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import StartScreen from './screens/StartScreen/StartScreen';

SplashScreen.preventAutoHideAsync();

const Tab = createNativeStackNavigator();

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  //   flex: 2,
  //   justifyContent: 'center',
  // },
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
    color: '#000',
  },
  safeAreaBottom: {
    backgroundColor: '#905fc3',
    flex: 1,
  },
  safeAreaDark: {
    // backgroundColor: '#000',
    backgroundColor: '#905fc3',
    flex: 1,
  },
  safeAreaLight: {
    // backgroundColor: '#fff',
    backgroundColor: '#905fc3',
    flex: 1,
  },
  // text: {
  //   fontFamily: 'Inter_300Light',
  // },
  safeAreaTop: {
    backgroundColor: '#5b1190',
    flex: 0,
  },
});

export default function App() {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeSafeAreaStyle = colorScheme === 'light' ? styles.safeAreaLight : styles.safeAreaDark;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const [fontsLoaded, fontError] = useFonts({
    Shrikhand_400Regular,
    Inter_300Light,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <AnimatedAppLoader image={{ uri: Constants.expoConfig.splash.image }}>
      {/* <LinearGradient
        colors={['#5b1190', '#6c24aa', '#905fc3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}> */}
      <SafeAreaView style={styles.safeAreaTop} />
      <SafeAreaView style={styles.safeAreaBottom}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Start"
            screenOptions={{ animation: 'slide_from_bottom' }}>
            <Tab.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Hang" component={HangScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar animated style={'auto'} />
      </SafeAreaView>
      {/* </LinearGradient> */}
    </AnimatedAppLoader>
  );
}
