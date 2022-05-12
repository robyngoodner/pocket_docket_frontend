import React, {useState, createRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, TextInput, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
// import { navigation } from '@react-navigation/native';
import Loader from './Components/Loader'
import SelectDropDown from 'react-native-select-dropdown'
import * as authService from '../api/auth.service'
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const RegisterScreen = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [errortext, setErrortext] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const emailInputRef = createRef();
  const lastNameInputRef = createRef();
  const passwordInputRef = createRef();
  const userTypeInputRef = createRef();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrortext('');
    if(!userEmail) {
      alert('Please enter your email address.');
      return;
    }
    if(!userFirstName) {
      alert('Please enter your first name.');
      return;
    }
    if(!userLastName) {
      alert('Please enter your last name.');
      return;
    }
    if(!userPassword) {
      alert('Please enter a password.');
      return;
    }
 

    //show loader
    setLoading(true);
    let userData = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
    };

    // console.log(userData)
    authService.register(userData)
    .then((res) => {
      //hide loader
      setLoading(false);
      // console.log("Register screen line 86",res.status);
      // If server response message same as data
      if (res.status == '201') {
        setIsRegistrationSuccess(true);
        // alert('Registration Successful. Please Login to proceed');
        //attempt to login in upon registration
        // AsyncStorage.setItem('user_id', res.config.data.email);
        // AsyncStorage.setItem('token', res.config.headers.Authorization);
        // navigation.replace('DrawerNavigationRoutes');
      } else {
        setErrortext(res.msg);
      }
    })
    .catch((error) => {
      //hide loader
      setLoading(false);
      console.error(error.response.data);
    })
  };
  if(isRegistrationSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/imgs/shutterstock_739769911.jpg')} 
              style={{width: 400, height: 200}}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful. Please login to proceed.
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
          source={require('../assets/imgs/shutterstock_739769911.jpg')} 
              style={{width: 400, height: 200}}
        />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserFirstName) => setUserFirstName(UserFirstName)}
              underlineColorAndroid="#f000"
              name="firstName"
              placeholder="First Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                lastNameInputRef.current && lastNameInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserLastName) => setUserLastName(UserLastName)}
              name="lastName"
              underlineColorAndroid="#f000"
              placeholder="Last Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={lastNameInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              name="email"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              name="password"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                userTypeInputRef.current &&
                userTypeInputRef.current.focus() &&
                Keyboard.dismiss                
              }
              blurOnSubmit={false}
            />
          </View>
          {/* <View style={styles.SectionStyle}>
            <SelectDropDown
              style={styles.inputStyle}
              data={userTypes}
              onSelect={(UserType) => setUserType(UserType)}
              underlineColorAndroid="#f000"
              ref={userTypeInputRef}
              name="type_user"
              buttonTextAfterSelection={(UserType) => {
                return UserType
              }}
              rowTextForSelection={(item) =>{
                return item
              }}
              returnKeyType="next"
              
              blurOnSubmit={false}
            />
          </View> */}
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmit}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;


const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
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
  