import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { SocialIcon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

import { NAVIGATIONS } from "../constants/navigator";
import UserAction from "../store/Actions/user";
import Loader from "../components/loader";
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
    user: state.userReducer.obj,
    loading: state.userReducer.loading
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
