/* eslint-disable react/prop-types */
import { Inter_300Light, useFonts } from '@expo-google-fonts/inter';
import { Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import AnimatedAppLoader from './components/AnimatedAppLoader/AnimatedAppLoader';
import GameScreen from './screens/GameScreen/GameScreen';
import HangScreen from './screens/HangScreen/HangScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import StartScreen from './screens/StartScreen/StartScreen';
import styles from './styles';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
});

SplashScreen.preventAutoHideAsync();

const Tab = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Shrikhand_400Regular,
    Inter_300Light,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <AnimatedAppLoader image={{ uri: Constants.expoConfig.splash.image }}>
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
