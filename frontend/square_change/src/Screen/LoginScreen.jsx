import React, {useState, createRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, TextInput, ScrollView,Keyboard, KeyboardAvoidingView } from 'react-native';
// import { navigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import axios from 'axios';
import * as authService from '../../../api/auth.service'

export default function Login ({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmit = () => {
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
    let formBody=[];
    for (let key in userData) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(userData[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
  }

  await authService.login(email, password)
    .then((res) => res.json())
    .then((responseJson) => {
      setLoading(false);
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status === 'success') {
        AsyncStorage.setItem('user_id', responseJson.data.email);
        console.log(responseJson.data.email);
        navigation.replace('DrawerNavigationRoutes');
      } else {
        setErrortext(responseJson.msg);
        console.log('Please check your email id or password');
      }
      })
      .catch((error) => {
      //Hide Loader
      setLoading(false);
      console.error(error);
      });
    

  // return (
  //       <>
  //           <View style={styles.container}>
  //               <Image
  //                   source={require('../../assets/imgs/shutterstock_739769911.jpg')} 
  //                       style={{width: 400, height: 200}}
  //               />
  //               <Text>Login standin</Text>
  //               <Image style={styles.block3}
  //               source={require('../../assets/imgs/shutterstock_1145004488.jpg')} 
  //           />
  //           <Text style={styles.text}>Making a difference</Text>
  //           </View>
  //           <StatusBar style="auto" />
  //     </>
  //   )
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
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
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
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
      position:'relative',
      bottom: 40,
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
      bottom: -160,
      width: 400, 
      height: 200
    },
  
    text: {
      position: 'relative',
      top: 100,
      paddingLeft: 20,
    },

    login : {
      display: 'flex',
      justifyContent: 'center',
    },

    hidden: {
      display: 'none',
      /* padding-top: 10vh; */
      /* margin-bottom: 10vh */
      marginBottom: -15,
      padding: 2,
      margin: 2,
      backgroundColor: '#E7EBEF',
    }
  });
  