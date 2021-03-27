import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import { SocialIcon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

import { NAVIGATIONS } from "../constants/navigator";
import UserAction from "../store/Actions/user";
import Loader from "../components/loader";
import Wavy from "../components/wavy";
import styles from "../styles";

const Login = (props) => {
  const navigator = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleGoogleSignin = () => {
    props.loginWithGmail();
  };

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigator.reset({
          routes: [
            {
              name: NAVIGATIONS.DASHBOARD,
              params: {
                uid: user?.uid
              }
            }
          ]
        });
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <>
      {props.loading || isLoggedIn ? (
        <Loader loading={props.loading || isLoggedIn} />
      ) : (
        <View style={styles.container}>
          <StatusBar style="inverted" />
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>My Reminder</Text>
          </View>
          <Wavy
            customStyles={styles.svgCurve}
            customHeight={345}
            customTop={245}
            customBgColor="#de4b39"
            customWavePattern="M0,32L60,58.7C120,85,240,139,360,160C480,181,600,171,720,138.7C840,107,960,53,1080,64C1200,75,1320,149,1380,186.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              bottom: 50
            }}
          >
            <SocialIcon
              title="Sign In with Google"
              button
              type="google"
              onPress={handleGoogleSignin}
            />
          </View>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state?.userReducer?.obj,
    loading: state?.userReducer?.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithGmail: () => {
      dispatch(UserAction.LoginWithGmail());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
