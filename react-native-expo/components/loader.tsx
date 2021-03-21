import React from "react";
import AnimatedLoader from "react-native-animated-loader";

import styles from "../styles";

const Loader = (loading: any) => {
  return (
    <AnimatedLoader
      visible={Boolean(loading)}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      source={require("../assets/990-inattentive.json")}
      speed={1}
    />
  );
};

export default Loader;
