import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LockScreen = () => {
  const [tapCount, setTapCount] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const animationRef = useRef(null);

  const maxTaps = 5; // Number of taps to break the lock

  const handleTap = () => {
    if (tapCount < maxTaps - 1) {
      // Increment tap and progress the animation slightly
      setTapCount(tapCount + 1);
      const progress = (tapCount + 1) / maxTaps; // e.g., 0.2, 0.4, etc.
      animationRef.current?.play(0, progress * 100); // Play up to a percentage of the animation
    } else {
      // Break the lock fully
      setTapCount(tapCount + 1);
      animationRef.current?.play(); // Play the full animation
      setTimeout(() => setIsBroken(true), 1000); // Hide after animation finishes
    }
  };

  return (
    <View style={styles.container}>
      {!isBroken ? (
        <TouchableOpacity onPress={handleTap} activeOpacity={0.8}>
          <LottieView
            ref={animationRef}
            source={require('../assets/lock-breaking.json')} // Adjust path to your file
            style={styles.lottie}
            loop={false}
            autoPlay={false}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.brokenContainer}>
          {/* Optionally show a static "broken" state or text */}
          {/* <LottieView
            source={require('./assets/lock-broken.json')} // Optional: separate broken animation
            style={styles.lottie}
            autoPlay
            loop={false}
          /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  brokenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LockScreen;