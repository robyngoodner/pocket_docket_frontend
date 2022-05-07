import React,{useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { navigation } from '@react-navigation/native';
import * as authservice from '../../api/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export default function HomeScreen ({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userProfile, setUserProfile] = useState({})
  const [donationOptionOne, setDonationOptionOne] = useState('');
  const [donationOptionTwo, setDonationOptionTwo] = useState('');
  const [donationOptionThree, setDonationOptionThree] = useState('');

  const getUserProfile = async () => {
    await authservice.getProfile()
    .then((res) => {
      console.log("HomeScreen line 19 response ",res)
      //setUserName = res.firstName;
      // setUserStatus = res.data.type_user
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  useEffect (() => {
  getUserProfile();
  }, [getUserProfile]);
  
  
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <View style={{flex: 1, padding: 16}}> */}
        <View style={styles.container}>
          <Image
          source={require('../../assets/imgs/shutterstock_739769911.jpg')} 
            style={{width: 400, height: 180}}
        />
        <View style={styles.home}>
          <View style={styles.overlap}>
            <Text>sQuaRe change</Text>
            <Text>No cash? No problem. Using microtransactions to make a difference.</Text>
            <Button
              title="About"
              onPress={() => { 
                navigation.navigate('About')}} />
          </View>
          <Image style={styles.block3}
            source={require('../../assets/imgs/shutterstock_1145004488.jpg')} 
          />
          <Text>Welcome, {userName}.</Text>
          <Text>{userStatus}</Text>
          <Text style={styles.text}>Making a difference</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    {/* </View> */}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
      backgroundColor: '#E7EBEF'
    },

    hidden: {
      display: 'none',
      /* padding-top: 10vh; */
      /* margin-bottom: 10vh */
      marginBottom: -15,
      padding: 2,
      margin: 2,
      backgroundColor: '#E7EBEF',
    },

    horizontal: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: 180,
    }
  });
  