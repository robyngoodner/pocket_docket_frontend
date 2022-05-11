import React, {useState, createRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, TextInput, ScrollView,Keyboard, KeyboardAvoidingView } from 'react-native';
import { navigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Components/Loader';
import axios from 'axios';
import * as authService from '../api/auth.service'

export default function Login ({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrortext('');
    if(!userEmail) {
      alert('Please enter your email address');
      return;
    }
    if(!userPassword) {
      alert('Please enter your password');
      return;
    }
    setLoading(true);
    let userData = {email: userEmail, password: userPassword };

    authService.login(userData)
    .then((res) => {
      //hide loader
      setLoading(false);
      // If server response message same as data
      if (res.status == '201') {
        // console.log("login screen line 48",res.config.data.email)
        //AsyncStorage.setItem('user_id', res.config.data.email);
        AsyncStorage.setItem('token', res.data.token);
        console.log(res.config.data);
        navigation.replace('DrawerNavigationRoutes');
      } else {
        setErrortext('Please check your email id or password');
        console.log('Please check your email id or password');
        console.log(res)
      }
      })
      .catch((error) => {
      //Hide Loader
      setLoading(false);
      setErrortext('Please check your email id or password');
      console.error(error);
      });
    }
    
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/imgs/shutterstock_739769911.jpg')} 
            style={{width: 400, height: 200}}
      />
      <View style={styles.overlap}>
        <Text>sQuaRe change</Text>
        <Text>No cash? No problem. Using microtransactions to make a difference.</Text>
        <Button
          title="About"
          onPress={() => { 
            navigation.navigate('About')}} />
      </View>
      <View style={styles.mainBody}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={styles.login}>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) =>
                    setUserEmail(UserEmail)
                  }
                  placeholder="Enter Email" //dummy@abc.com
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  placeholder="Enter Password" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errortext}
                </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmit}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <View style={styles.registerText}>
                <Text
                  style={styles.registerTextStyle}
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  New Here ? Register
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <Image style={styles.block3}
          source={require('../assets/imgs/shutterstock_1145004488.jpg')} 
        />
        <Text style={styles.text}>Making a difference</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5B5A60',
    alignContent: 'center',
    paddingTop: 48,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 30,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#E7EBEF',
    borderWidth: 0,
    color: '#5B5A60',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#5B5A60',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
   registerText: {
     position: 'relative',
     top: -20
    },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  login: {
    paddingTop: 20,
  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    home: {
      width: 375,
      backgroundColor :'#5B5A60',
      height: 500,
    },
  
    overlap: {
      position:'absolute',
      bottom: 445,
      left: 4,
      backgroundColor: '#E7EBEF',
      /* border: 2px solid #5B5A60,
      border-radius: 10px, */
      marginRight: 150,
      marginLeft: 30,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    },
  
    block3: {
      position: 'relative',
      bottom: -50,
      width: 400, 
      height: 200
    },
  
    text: {
      position: 'relative',
      top: -50,
      paddingLeft: 20,
    },

  });
  