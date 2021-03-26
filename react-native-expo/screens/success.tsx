import * as React from "react";
import { View, Text, SafeAreaView, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import styles from "../styles";

const Success = () => {
  const navigator = useNavigation();
  const route = useRoute();

  const handleNavigate = () => {
    navigator.reset({ routes: [{ name: route?.params?.navigateTo }] });
  };

  return (
    <SafeAreaView style={styles.successContainer}>
      <Text style={styles.title}>Horray !</Text>
      <View style={styles.mTop} />
      <Text style={styles.title}>{route?.params?.msg}</Text>
      <View style={styles.mTop} />
      <CountdownCircleTimer
        isPlaying
        duration={5}
        size={180}
        colors={[
          ["#004777", 0.4],
          ["#F7B801", 0.4],
          ["#A30000", 0.2]
        ]}
        onComplete={handleNavigate}
      >
        {({ remainingTime }) => (
          <>
            <Animated.Text>Redirecting in</Animated.Text>
            <View style={styles.mTop} />
            <Animated.Text style={styles.AnimatedText}>
              {remainingTime}
            </Animated.Text>
            <View style={styles.mTop} />
            <Animated.Text>seconds</Animated.Text>
          </>
        )}
      </CountdownCircleTimer>
    </SafeAreaView>
  );
};

export default Success;
