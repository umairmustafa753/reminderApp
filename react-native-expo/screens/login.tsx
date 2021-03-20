import React, { useEffect } from "react";
import { View, Button } from "react-native";
import { connect } from "react-redux";

import UserAction from "../store/Actions/user";
import styles from "../styles";

const Login = (props) => {
  const handleGoogleSignin = () => {
    props.loginWithGmail();
  };

  useEffect(() => {
    console.log({ user: props.user, loading: props.loading });
  }, [props?.loading]);

  return (
    <View style={styles.container}>
      <Button onPress={handleGoogleSignin} title="Log in with Google" />
    </View>
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
