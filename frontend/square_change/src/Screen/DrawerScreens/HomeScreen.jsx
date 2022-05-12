import React,{useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert } from 'react-native';
import { navigation } from '@react-navigation/native';
import * as authservice from '../../api/auth.service';
import * as listService from '../../api/list.service'
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export default function HomeScreen ({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userProfile, setUserProfile] = useState({})
  const [lists, setLists] = useState([]);
  const [item, setItem] = useState('');


  async function getUserProfile() {
    const user = await AsyncStorage.getItem('user')
    .then(user => authservice.getProfile(user)) 
    .then(res => {
      //console.log("getUserProfile2 res ",res.data)
      setUserProfile(res.data)
    })
  }

  async function deleteProfile() {
    const user = await AsyncStorage.getItem('user')
    .then(user => authservice.deleteProfile(user)) 
    .then(navigation.navigate('SplashScreen'))
    .then(navigation.navigate('DrawerNavigationRoutes'))
  }
  
  const deleteAlert = () => {
      Alert.alert('Delete Profile', 'Are you sure you want to delete your profile?', [
        {text: 'Cancel', onPress: () => console.log('Canceled'),
        style: 'cancel', 
        },
        {text: 'Delete', onPress: () => {
          deleteProfile()
          alert('Deleting your profile. This may take a second.')}}
      ])
      
  }

  async function getLists() {
    const user = await AsyncStorage.getItem('user')
    .then(user => listService.getLists(user)) 
    .then(res => {
      console.log("Lists res ",res.data)
      setLists(res.data)
      console.log("lists after setting: ", lists)

    })
  }
  
  useEffect (() => {
  getUserProfile();
  getLists();
  }, []);
  
  const list = () => {
    return lists.map((element, key) => {
      return (
        <View key={element.key}>
          <Text>{element.title}: {element.description}</Text>
        </View>
      )
    })
  }
  
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
          <Text>To Do Lists: </Text>
          <View>{list()}</View>
          <Button
              title="NewList"
              onPress={() => { 
                navigation.navigate('NewListScreenStack')}} />
          <Button
              title="Delete profile"
              onPress={deleteAlert} />
          <Image style={styles.block3}
            source={require('../../assets/imgs/shutterstock_1145004488.jpg')} 
          />
          <Text>Welcome, {userProfile.firstName}.</Text>
          <Text>{userProfile.type_user}</Text>
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
  