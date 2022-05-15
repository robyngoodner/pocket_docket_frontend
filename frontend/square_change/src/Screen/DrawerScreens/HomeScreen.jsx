import React,{useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert } from 'react-native';
import { navigation, useIsFocused } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as authservice from '../../api/auth.service';
import * as listService from '../../api/list.service'
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export default function HomeScreen ({ navigation }) {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userProfile, setUserProfile] = useState({})
  const [lists, setLists] = useState([]);
  const [item, setItem] = useState('');
  const [isChecked, setIsChecked] = useState(false)
  const [completion, setCompletion] = useState(false)

  const isFocused = useIsFocused();


  async function getUserProfile() {
    const user = await AsyncStorage.getItem('user')
    .then(user => authservice.getProfile(user)) 
    .then(res => {
      //console.log("getUserProfile2 res ",res.data)
      AsyncStorage.setItem("userId", JSON.stringify(res.data.id))
      setUserProfile(res.data)
      //console.log("get user profile res.data.id: ", res.data.id)
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

  
  async function updateListCompletion (oldList) {
    // setErrortext('');
    setLoading(true);
    const list = {
      id: oldList.id,
      title: oldList.title,
      description: oldList.description,
      complete: true,
    }
    console.log('update item object: ',list)
    listService.updateList(list.id, list)
    .then(res => {
      setLoading(false)
      console.log("list update? ",res.data)
      setLists([])
      //console.log(res.data)
      getUserProfile();
    })
  }

  useEffect (() => {
  getUserProfile();
  // getLists();
  list();
  }, [isFocused]);
  
  const list = () => {
    if(lists) {
      return lists.map((element, key) => {
        if(!element.complete === true) {
        return (
          <View style={styles.listItems} key={key}>
            <TouchableOpacity key={key}
              onPress={() => { 
                  navigation.navigate('ListDetailScreenStack', {screen: 'List Detail Screen', params: element})}}>
              <Text  style={styles.listText} key={element.key} >
                {element.title}: {element.description}
              </Text>
            </TouchableOpacity>
            <BouncyCheckbox 
              isChecked = {element.complete}
              onPress={(isChecked) => {updateListCompletion(element)}}
              fillColor="#98BBD8" 
              size={20}
              />
          </View>
        )
      } else {
        return null
      }
      })
    } else {
      return (
      <View style={styles.listItems}>
        <Text>You have no lists! Begin by adding a to-do list.</Text>
      </View>
      )
    }
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/imgs/Center_todo.jpg')} 
            style={{width: 400, height: 180}}
        />
        <View style={styles.home}>
          <View style={styles.overlap}>
            <Text style={{fontSize: 18,color: '#00050a',}}>{userProfile.firstName}'s current to-do lists: </Text>
          </View>
          
          <View>{list()}</View>
          <View style={styles.buttons}>
            <Button
              title="New list"
              color='#1c5d8e'
              onPress={() => { 
                navigation.navigate('NewListScreenStack')}} />
            <Button
              title="All lists"
              color='#1c5d8e'
              onPress={() => { 
                navigation.navigate('AllListsScreenStack')}} />
          </View>
          <View style={styles.buttons}>
            <Button
              title="Delete profile"
              color='#1c5d8e'
              onPress={deleteAlert} />
          </View>
        </View>
      <StatusBar style="auto" />
    </View>
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
      backgroundColor :'#DDE0DD',
      height: 500,
    },
    overlap: {
      position:'relative',
      bottom: 40,
      left: 4,
      backgroundColor: '#98BBD8',
      /* border: 2px solid #5B5A60,
      border-radius: 10px, */
      marginRight: 100,
      marginLeft: 30,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    },
    text: {
      position: 'relative',
      top: 100,
      paddingLeft: 20,
    },
    listItems: {
      color: '#404343',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
      paddingRight: 10,
      paddingLeft: 10
    },
    listText: {
      color: '#00050a',
      fontSize: 16,
      // fontWeight: 'bold',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 10,
      paddingLeft: 10
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'relative',
      top: 150,
      color: '#404343',
    },
  });
  