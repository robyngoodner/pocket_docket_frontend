import React,{useState, useEffect, createRef, useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert, TextInput, ScrollView,Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { navigation, useIsFocused } from '@react-navigation/native';
import SendSMS from 'react-native-sms';
import * as itemService from '../../api/item.service';
import * as listService from '../../api/list.service';
import * as authservice from '../../api/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';

 

export default function EditItemScreen ({ navigation, route }) {
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const { body, id } = route.params
  const [list, setList] = useState({})
  const [itemBody, setItemBody] = useState('');
  
  
  const isFocused = useIsFocused()
  const descriptionRef = createRef();

  async function getUserProfile() {
    const user = await AsyncStorage.getItem('user')
    .then(user => authservice.getProfile(user)) 
    .then(res => {
      //console.log("getUserProfile2 res ",res.data)
      setUserId(res.data.id)
    })
  }


  const itemBodyRef = createRef();

  const clearBody = () => {
    setBody('')
  }

  async function getList() {
    console.log("is getList running")
    setErrortext('');
    setLoading(true);
    listService.getList(id)
    .then(res => {
      setLoading(false)
      // console.log("get single list res.data: ", res.data)
      setList(res.data)
      //console.log(list[0].title)
      //console.log("this list's id? ",id)
    })
    .then(() => setLoading(false))
  }

  async function getItems () {
    console.log("getItems??")
    setErrortext('');
    setLoading(true);
    itemService.getItems(id)
    .then(res => {
      setLoading(false)
      //console.log("get items res.data: ", res.data)
      setItems(res.data)
    })
    .then(() => setLoading(false))
  }

  const editItem = () => {
    setErrortext('');
    //setLoading(true);
    if(!itemBody){
      setItemBody(body)
    }
    const item = {
      id: id,
      body: itemBody,
    }
    //console.log('update item object: ',item)
    itemService.updateItem(item.id, item)
    .then(res => {
      setLoading(false)
      console.log(res.data)
    })
  }

  

  
  useEffect (() => {
    getUserProfile();
    getList();
    getItems();
  }, [isFocused]);
  
  
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
            <KeyboardAvoidingView enabled>
              <View style={styles.InputStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(body) =>
                    setItemBody(body)
                  }
                  placeholder={body} //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  blurOnSubmit={false}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  clearButtonMode="always"
                  defaultValue={body}
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
                onPress={() => {
                  editItem(), 
                  navigation.navigate('ListDetailScreenStack')}}
                >
                <Text style={styles.buttonTextStyle}>Submit changes</Text>
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
  