import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ActionButton from "react-native-action-button";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

import { NAVIGATIONS } from "../constants/navigator";
import UserAction from "../store/Actions/user";
import styles from "../styles";

const Dashboard = (props) => {
  const navigator = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState({});

  const handleSignOut = async () => {
    firebase.auth().signOut();
    navigator.reset({ routes: [{ name: NAVIGATIONS.LOGIN }] });
  };

  useEffect(() => {
    if (!props?.user?.gmail) {
      props.getUser({ uid: route?.params?.uid });
      setUser(props.user);
    } else {
      setUser(props.user);
    }
  }, [props?.loading]);

  return (
    <View style={styles.container}>
      <Text>Hello {user?.gmail}</Text>
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        degrees={0}
        renderIcon={() => {
          return (
            <Ionicons name="person-outline" style={styles.actionButtonIcon} />
          );
        }}
      >
        <ActionButton.Item
          buttonColor="#CA1C3B"
          title="Log out"
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Edit Profile"
          onPress={() => {}}
        >
          <Ionicons name="md-pencil" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
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
    getUser: (obj) => {
      dispatch(UserAction.GetUser(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
