import React,{useState, useEffect, createRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert, TextInput, ScrollView,Keyboard, KeyboardAvoidingView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { navigation } from '@react-navigation/native';
import * as itemService from '../../api/item.service';
import * as listService from '../../api/list.service';
import * as authservice from '../../api/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
 

export default function ListDetailScreen ({ navigation, route }) {
    const [userId, setUserId] = useState({})
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const { title, id, description } = route.params
    const [body, setBody] = useState('');
    const [items, setItems ] = useState([]);
    const [isChecked, setIsChecked] = useState(false)
    const [completion, setCompletion] = useState(false)


    const descriptionInputRef = createRef();

  async function getUserProfile() {
    const user = await AsyncStorage.getItem('user')
    .then(user => authservice.getProfile(user)) 
    .then(res => {
      //console.log("getUserProfile2 res ",res.data)
      setUserId(res.data.id)
    })
  }


  console.log("list detail: ", id, title)

  async function createNewList() {
    setErrortext('');
    if(!title) {
      alert('Please enter a title for your list');
      return;
    }
    setLoading(true);
    let list = {
        title: title,
        description: description,
        user: userId
    }

    const user = await AsyncStorage.getItem('userId')
    .then(user => listService.createList(user, list))
    .then(res => {
        setLoading(false);
        console.log("res.data from createnewList ", res.data)
        navigation.navigate('HomeScreenStack')
    })

  }

  async function addNewItem() {
    setErrortext('');
    if(!body) {
      alert('Please enter a list item');return;
    }
    setLoading(true);
    let item = {
      list: id,
      body: body
    }
    itemService.createItem(item)
    .then(res => {
      setLoading(false);
      console.log('res.data from addNewItem: ', res.data)
      getItems();
      setLoading(false)
    })
  }

  async function getList() {
    setErrortext('');
    setLoading(true);
    listService.getList(id)
    .then(res => {
      setLoading(false)
      //console.log("get single list res.data: ", res.data)
      //console.log("this list's id? ",id)
    })
  }

  async function getItems () {
    setErrortext('');
    setLoading(true);
    itemService.getItems(id)
    .then(res => {
      setLoading(false)
      console.log("get items res.data: ", res.data)
      setItems(res.data)
    })
  }

  async function updateItemCompletion (oldItem) {
    setErrortext('');
    //setLoading(true);
    if (completion === false) setCompletion(true)
    else if (completion === true) setCompletion(false);
    const item = {
      id: oldItem.id,
      body: oldItem.body,
      complete: completion
    }
    console.log('update item object: ',item)
    itemService.updateItem(item.id, item)
    .then(res => {
      setLoading(false)
      console.log(res.data)
    })
  }

  const listItems = () => {
    return items.map((element, key) => {
      console.log("list item",element)
      return (
        <View style={styles.listItems} key={key}>
          <Text key={key}>
            {element.body}
          </Text>
          <BouncyCheckbox 
            isChecked = {element.complete}
            onPress={(isChecked) => {updateItemCompletion(element)}}
            fillColor="#5B5A60" 
            size={20}
            />
        </View>
      )
    })
  }

  
  useEffect (() => {
  getUserProfile();
  getList();
  getItems();
  }, []);
  
  
  return (
    <View style={styles.container}>
            <View style={styles.home}>
    <SafeAreaView style={{flex: 1, padding: 20}}>
        <View style={styles.container}>
          <Image
          source={require('../../assets/imgs/shutterstock_739769911.jpg')} 
            style={{width: 400, height: 180}}
        />
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
          <View style={styles.SectionStyle}>
                {listItems()}
              </View>
            <KeyboardAvoidingView enabled>
              
              <View style={styles.InputStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(body) =>
                    setBody(body)
                  }
                  placeholder="Add a list item" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
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
                onPress={addNewItem}>
                <Text style={styles.buttonTextStyle}>Add Item</Text>
              </TouchableOpacity>
              
              </KeyboardAvoidingView>
              </View>
            </ScrollView>
            </View>
          <Image style={styles.block3}
            source={require('../../assets/imgs/shutterstock_1145004488.jpg')} 
          />
        </View>
        <StatusBar style="auto" />
    
  </SafeAreaView>
  </View>
  </View>
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

    listItems: {
      color: 'black',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 20
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
      flexDirection: 'column',
      paddingLeft: 180,
    },
    // mainBody: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: '#5B5A60',
    //     alignContent: 'center',
    //     paddingTop: 48,
    //   },
      SectionStyle: {
        flexDirection: 'column',
        // height: 100,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        margin: 10,
        width: 300,
        color: 'black',
      },
      InputStyle: {
        flexDirection: 'column',
        height: 40,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        margin: 10,
        width: 300,
        color: 'black',
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
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
      },
  });
  