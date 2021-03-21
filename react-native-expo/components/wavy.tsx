import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Wavy = ({
  customStyles,
  customHeight,
  customTop,
  customBgColor,
  customWavePattern
}) => {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: customBgColor, height: customHeight }}>
        <Svg
          height="80%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: customTop }}
        >
          <Path fill={customBgColor} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
};

export default Wavy;
