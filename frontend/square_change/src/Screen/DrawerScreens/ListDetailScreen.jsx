import React,{useState, useEffect, createRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button, SafeAreaView, Alert, TextInput, ScrollView,Keyboard, KeyboardAvoidingView } from 'react-native';
import { navigation } from '@react-navigation/native';
import * as listService from '../../api/list.service';
import * as authservice from '../../api/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
 

export default function ListDetailScreen ({ navigation, route }) {
    const [userId, setUserId] = useState({})
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const { title, id, description } = route.params
    const [body, setBody] = useState('')

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

  async function createNewList(e) {
    e.preventDefault();
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

    async function addNewItem(e) {
      e.preventDefault();
      setErrortext('');
      if(!body) {
        alert('Please enter a list item');return;
      }
    }

    const user = await AsyncStorage.getItem('userId')
    .then(user => listService.createList(user, list))
    .then(res => {
        setLoading(false);
        console.log("res.data from createnewList ", res.data)
        navigation.navigate('HomeScreenStack')
    })

  }
  
  useEffect (() => {
  getUserProfile();
  }, []);
  
  
  return (
    <View style={styles.container}>
            <View style={styles.home}>
    <SafeAreaView style={{flex: 1, padding: 20}}>
      {/* <View style={{flex: 1, padding: 16}}> */}
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
              {/* <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(title) =>
                    setTitle(title)
                  }
                  placeholder="Enter a list title"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    descriptionInputRef.current &&
                    descriptionInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(description) =>
                    setDescription(description)
                  }
                  placeholder="Describe your list!" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={descriptionInputRef}
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
                onPress={createNewList}>
                <Text style={styles.buttonTextStyle}>Create List</Text>
              </TouchableOpacity> */}
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
    },
    // mainBody: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: '#5B5A60',
    //     alignContent: 'center',
    //     paddingTop: 48,
    //   },
      SectionStyle: {
        flexDirection: 'row',
        height: 30,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        margin: 10,
        width: 200,
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
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
      },
  });
  