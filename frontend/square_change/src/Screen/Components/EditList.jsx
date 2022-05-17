import React,{useState, useEffect, createRef, useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert, TextInput, ScrollView,Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigation, useIsFocused, useNavigation } from '@react-navigation/native';


import * as itemService from '../../api/item.service';
import * as listService from '../../api/list.service';
import * as authservice from '../../api/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';

 

export default function EditList ({ navigation, props }) { 
    //console.log("props: ", props)
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const { title, id, description } = props;
    const [body, setBody] = useState('');
    const [items, setItems ] = useState([]);
    const [isChecked, setIsChecked] = useState(false)
    const [completion, setCompletion] = useState(false)
    const [list, setList] = useState({})
    const [SMSArray, setSMSArray] = useState([])
    const [SMSBody, setSMSBody] = useState('')
    const [listTitle, setListTitle] = useState('');
    const [listDescription, setListDescription] = useState('');
    
    
    const isFocused = useIsFocused()
    const descriptionRef = createRef();
  
    async function getUserProfile() {
      const user = await AsyncStorage.getItem('user')
      .then(user => authservice.getProfile(user)) 
      .then(res => {
        setUserId(res.data.id)
      })
    }
  
  
    //console.log("list detail: ", id, title)
  
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
          navigation.navigate('HomeScreenStack')
      })
  
    }
    const itemBodyRef = createRef();
    async function addNewItem() {
      setErrortext('');
      
      if(!body) {
        alert('Please enter a list item');return;
      }
      setLoading(true);
      let item = {
        listId: id,
        body: body,
        complete: false
      }
      console.log(item)
      itemService.createItem(item)
      .then(res => {
        setLoading(false);
        console.log('res.data from addNewItem: ', res.data)
        getList();
        setLoading(false)
      })
      .then(() => setLoading(false))
    }
  
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
        setList(res.data)
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
        setItems(res.data)
      })
      .then(() => setLoading(false))
    }
  
    const editList = () => {
      setErrortext('');
      if(!listTitle){
        setListTitle(title)
      }
      if(!listDescription){
        setListDescription(description)
      }
      const list = {
        id: id,
        title: listTitle,
        description: listDescription,
      }
      listService.updateList(list.id, list)
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
        <View>
            <SafeAreaView style={{flex: 1, padding: 20}}>
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
                                onChangeText={(title) =>
                                    setListTitle(title)
                                }
                                placeholder={title} //12345
                                placeholderTextColor="#3a84be"
                                keyboardType="default"
                                blurOnSubmit={false}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    descriptionRef.current &&
                                    descriptionRef.current.focus()
                                }
                                clearButtonMode="always"
                                defaultValue={title}
                                />
                                <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(description) =>
                                    setListDescription(description)
                                }
                                placeholder={description} //12345
                                placeholderTextColor="#3a84be"
                                keyboardType="default"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                                ref={descriptionRef}
                                clearButtonMode="always"
                                defaultValue={description}
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
                                editList(), 
                                navigation.navigate('ListDetailScreenStack'), navigation={navigation}}}
                                >
                                <Text style={styles.buttonTextStyle}>Submit changes</Text>
                            </TouchableOpacity> 
                            </View>         
                    </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
           
        <StatusBar style="auto" />
    
    </SafeAreaView>
  </View>
    )



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
    //   position: 'relative',
    //   bottom: 0,
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
      height: 60,
      marginTop: 30,
    //   marginLeft: 30,
    //   marginRight: 30,
      marginBottom: 10,
    //   width: 300,
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
    //   marginLeft: 65,
    //   marginRight: 65,
      marginTop: 20,
      marginBottom: 10,
      width: 200,
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
      paddingTop: 10,
      paddingBottom:10,
      maxWidth: 240,
    //   paddingRight: 30,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
      backgroundColor: '#E7EBEF'
    },
  });
  
  