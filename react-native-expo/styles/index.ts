import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "#FFF"
  },
  backIcon: {
    fontSize: 30,
    height: 52,
    width: 52,
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
  },
  fastImage: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  username: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 15
  },
  bottom20: {
    marginBottom: 20
  },
  Mbottom20: {
    marginBottom: -20
  },
  Mbottom35: {
    marginBottom: -35
  },
  right10: {
    marginRight: 10
  },
  left5: {
    marginLeft: 5
  },
  cardView: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5
  },
  mBottom50: {
    marginBottom: 50
  },
  mBottomM80: {
    marginBottom: -80
  },
  logoImageWithSelf: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  buttonBackground: {
    backgroundColor: "#1C70CA"
  },
  reminderContainer: {
    marginTop: 50,
    padding: 20,
    zIndex: 1
  },
  horizentalList: {
    width: 60,
    marginRight: 15
  },
  mTop: {
    marginTop: 20
  },
  mTop5: {
    marginTop: 5
  },
  whiteText: {
    color: "white"
  },
  textBox: {
    color: "white"
    // maxHeight: 200
  },
  font22: {
    fontSize: 22
  },
  avatar: {
    height: 60,
    width: 60,
    justifyContent: "flex-end"
  },
  spinnerTextStyle: {
    color: "#fff"
  },
  avatarIcon: {
    top: -5,
    right: -20,
    zIndex: 1,
    position: "absolute"
  },
  zIndex: {
    zIndex: 1
  },
  successContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  padding: {
    padding: 30
  },
  AnimatedText: {
    fontSize: 40
  }
});

export default styles;
