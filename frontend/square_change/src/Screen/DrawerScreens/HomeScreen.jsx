import React,{useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert } from 'react-native';
import { navigation, useIsFocused } from '@react-navigation/native';
import * as authservice from '../../api/auth.service';
import * as listService from '../../api/list.service'
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export default function HomeScreen ({ navigation }) {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userProfile, setUserProfile] = useState({})
  const [lists, setLists] = useState([]);
  const [item, setItem] = useState('');

  const isFocused = useIsFocused();


  async function getUserProfile() {
    const user = await AsyncStorage.getItem('user')
    .then(user => authservice.getProfile(user)) 
    .then(res => {
      console.log("getUserProfile2 res ",res.data)
      AsyncStorage.setItem("userId", JSON.stringify(res.data.id))
      setUserProfile(res.data)
      console.log("get user profile res.data.id: ", res.data.id)
      setUserId(res.data.id)
      setLists(res.data.lists)
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

  // async function getLists() {
  //   const user = await AsyncStorage.getItem('user')
  //   .then(user => authservice.getProfile(user))
  //   .then(res => {
  //     console.log("setUserId res.data.id: ", res.data.id)
  //     setUserId(res.data.id)
  //   })
  //   // console.log("getLists userId: ",userId)
  //   .then(() => listService.getLists(userId))
  //   .then(res => {
  //     console.log("getLists res ", res)
  //     //setLists(res.data)
  //     //console.log("lists after setting: ", lists)

  //   })
  // }
  
  useEffect (() => {
  getUserProfile();
  // getLists();
  list();
  }, [isFocused]);
  
  const list = () => {
    return lists.map((element, key) => {
      return (
        <View key={key}>
          <TouchableOpacity key={key}
            onPress={() => { 
                navigation.navigate('ListDetailScreenStack', {screen: 'List Detail Screen', params: element})}}>
            <Text key={element.key} >
              {element.title}: {element.description}
            </Text>
          </TouchableOpacity>
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
            
            <Button
              title="About"
              onPress={() => { 
                navigation.navigate('About')}} />
          </View>
          <Text>{userProfile.firstName}'s To Do Lists: </Text>
          <View>{list()}</View>
          <Button
              title="New list"
              onPress={() => { 
                navigation.navigate('NewListScreenStack')}} />
          <Button
              title="Delete profile"
              onPress={deleteAlert} />
          <Image style={styles.block3}
            source={require('../../assets/imgs/shutterstock_1145004488.jpg')} 
          />
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
  