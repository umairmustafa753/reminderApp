import React, {useState} from 'react';
import LoginScreen from 'react-native-login-screen';
import {Text, View, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {NAVIGATIONS} from '../constants/navigator';
import Styles from '../styles';

const Auth = () => {
  const navigator = useNavigation();
  const [spinnerVisibility, setSpinnerVisibility] = useState<boolean>(false);

  const handleLogin = () => {
    setSpinnerVisibility(true);
    setTimeout(() => {
      setSpinnerVisibility(false);
    }, 2000);
    navigator.reset({routes: [{name: NAVIGATIONS.DASHBOARD}]});
  };

  const renderLogo = () => (
    <View style={Styles.logoConatiner}>
      <Image
        resizeMode="contain"
        source={require('../assets/images/logo.png')}
        style={Styles.logoImage}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={Styles.backgroundColor}>
      <LoginScreen
        spinnerEnable
        spinnerVisibility={spinnerVisibility}
        labelTextStyle={Styles.labelTextStyle}
        logoTextStyle={Styles.logoTextStyle}
        loginButtonTextStyle={Styles.loginButtonTextStyle}
        textStyle={Styles.textStyle}
        signupStyle={Styles.signupStyle}
        logoComponent={renderLogo()}
        source={require('../assets/images/cover.jpg')}
        usernameOnChangeText={username => {}}
        onPressSettings={() => alert('Settings Button is pressed')}
        passwordOnChangeText={password => {}}
        onPressLogin={handleLogin}
        onPressSignup={() => {
          {
          }
        }}>
        <View style={Styles.AuthContainer}>
          <Text style={Styles.AuthContent}>Inside Login Screen Component</Text>
        </View>
      </LoginScreen>
    </ScrollView>
  );
};

export default Auth;
