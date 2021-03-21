import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "#FFF"
  },
  loaderContent: {
    color: "#FFF"
  },
  lottie: {
    width: 500,
    height: 500
  },
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width
  },
  logoContainer: {
    marginTop: 100,
    alignSelf: "center",
    zIndex: 1
  },
  logoImage: {
    width: 150,
    height: 150
  },
  logoText: {
    marginTop: 10,
    fontSize: 20,
    color: "#FFF",
    textAlign: "center"
  }
});

export default styles;
