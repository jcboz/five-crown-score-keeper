import { Asset } from 'expo-asset';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import splash from '../../assets/splash.png';

// eslint-disable-next-line react/prop-types
function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle error
    } finally {
      setAppReady(true);
    }
  }, []);

  const animationStyles = {
    width: '100%',
    height: '100%',
    resizeMode: Constants.expoConfig.splash.resizeMode || 'contain',
    transform: [
      {
        scale: animation,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.expoConfig.splash.backgroundColor,
              opacity: animation,
            },
          ]}>
          <Animated.Image
            style={animationStyles}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

// eslint-disable-next-line react/prop-types
function AnimatedAppLoader({ children }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Promise.all([Asset.loadAsync(splash)]);

      setSplashReady(true);
    }

    prepare();
  }, []);
  if (!isSplashReady) return null;

  return <AnimatedSplashScreen image={splash}>{children}</AnimatedSplashScreen>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedAppLoader;
