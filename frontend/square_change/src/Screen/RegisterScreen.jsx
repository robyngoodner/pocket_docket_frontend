import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Button } from 'react-native';
// import { navigation } from '@react-navigation/native';
 

export default function Register ({ navigation }) {

    // return (
    //     <>
    //         <View style={styles.container}>
    //             <Image
    //                 source={require('../../assets/imgs/shutterstock_739769911.jpg')} 
    //                     style={{width: 400, height: 200}}
    //             />
    //             <Text>Register standin</Text>
    //             <Image style={styles.block3}
    //             source={require('../../assets/imgs/shutterstock_1145004488.jpg')} 
    //         />
    //         <Text style={styles.text}>Making a difference</Text>
    //         </View>
    //         <StatusBar style="auto" />
    //   </>
    // )
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
  