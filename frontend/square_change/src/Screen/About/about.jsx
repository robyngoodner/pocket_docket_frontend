import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
 

export default function About ({navigation}) {
    return (
        <>
            <View style={styles.about}>
            <Image
                source={require('../../assets/imgs/shutterstock_1170187039.jpg')} 
                    style={{width: 400, height: 200}}
            />
            <View style={styles.overlap}>
                <Text>sQuaRe change</Text>
                <Text>While our desire to help has not waned, our ability to do so has. Go back to making a daily difference.</Text>
            </View>
            <View style={styles.about_text}>
                <Text>sQuaRe change was designed to bridge the gap between people who need help and people who are interested in giving it, but who no longer have an easy way to do so. sQuaRe change enables you to quickly donate small amounts of money to others by scanning their QR code. The money you have donated is redeemable only at participating local grocery stores. sQuaRe change also enables participating stores to match your donation, making your small contribution go even further. Register for an account today in order to: donate, recieve, help those without smart phones sign up, or register as a local grocery store.</Text>
                
            </View>
            <Image
                source={require('../../assets/imgs/shutterstock_621138047.jpg')} 
                    style={{width: 400, height: 200}}
            />

            <StatusBar style="auto" />
        </View>
      </>
    )
}

const styles = StyleSheet.create({
    about: {
        backgroundColor: '#787568',
    },
  
    about_text: {
        padding: 4,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#F2E6D5'
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

  });
  