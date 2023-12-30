/* eslint-disable react/prop-types */
import { Inter_300Light, useFonts } from '@expo-google-fonts/inter';
import { Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
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
import HangScreen from './screens/HangScreen/HangScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 2,
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
    color: '#000',
  },
  safeAreaDark: {
    backgroundColor: '#000',
    flex: 1,
  },
  safeAreaLight: {
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    fontFamily: 'Inter_300Light',
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
      <SafeAreaView style={[styles.safeArea, themeSafeAreaStyle]}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Hang" component={HangScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar animated style={'auto'} />
      </SafeAreaView>
    </AnimatedAppLoader>
  );
}
