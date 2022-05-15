import React,{useState, useEffect, createRef, useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert, TextInput, ScrollView,Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigation, useIsFocused } from '@react-navigation/native';


import * as itemService from '../../api/item.service';
import * as listService from '../../api/list.service';
import * as authservice from '../../api/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';

 

export default function EditItem ({ navigation, route }) {
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#DDE0DD',}}>
      <ScrollView>
      <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
        <View style={styles.home}>
          <Loader loading={loading} />
          <View style={styles.SectionStyle}>
              <View style={styles.InputStyle}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(body) =>
                    setItemBody(body)
                  }
                  placeholder={body} //12345
                  placeholderTextColor="#3a84be"
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
              </View>
            </View>
        <StatusBar style="auto" />
  </KeyboardAwareScrollView>
  </ScrollView>
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
      maxWidth: 400,
      backgroundColor :'#DDE0DD',
      position: 'relative',
      bottom: 0,
    },
    SectionStyle: {
      maxWidth: '100%',
      flexDirection: 'column',
      marginLeft: 10,
      marginRight: 10,
    },
    listItems: {
      color: '#2D608F',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
      paddingRight: 20,
      paddingLeft: 20
    },
    InputStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      height: 40,
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 10,
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
      marginLeft: 65,
      marginRight: 65,
      marginTop: 20,
      marginBottom: 10,
    },
    buttonTextStyle: {
      color: '#1c5d8e',
      paddingVertical: 10,
      fontSize: 16,
    },
    textInputStyle: {
      flex: 1,
      justifyContent: 'center',
      color: '#0f3c68',
      paddingLeft: 15,
      paddingRight: 15,
      height: 50,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
      backgroundColor: '#E7EBEF'
    },
  });
  