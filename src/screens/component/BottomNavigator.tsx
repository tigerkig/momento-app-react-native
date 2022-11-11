import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from "react-redux";
import { useRoute } from '@react-navigation/native';

import homeIcon from "../../assets/bottomNavigator/homeIcon.png";
import homeActiveIcon from "../../assets/bottomNavigator/homeActiveIcon.png";
import favIcon from "../../assets/bottomNavigator/favIcon.png";
import favActiveIcon from "../../assets/bottomNavigator/favActiveIcon.png";
import userIcon from "../../assets/bottomNavigator/userIcon.png";
import userActiveIcon from "../../assets/bottomNavigator/userActiveIcon.png";
import settingIcon from "../../assets/bottomNavigator/settingIcon.png";
import settingActiveIcon from "../../assets/bottomNavigator/settingActiveIcon.png";
import addIcon from '../../assets/common/addIcon.png'
import playIcon from '../../assets/common/playIcon.png'
import backIcon from '../../assets/common/backIcon.png'
import AsyncStorage from "@react-native-async-storage/async-storage";

const settingsUrls = ['settings', 'userProfile', 'termsAndConditions', 'privaty', 'downloads', 'uploadImg', 'userManagement']
const homeUrls = ['home', 'deckDetail', 'videoDeckDetail', 'playDeck', 'deckCardRateSetting']
const profileUrls = ['profile', 'contentCreatorProfile']

function BottomNavigator({ navigation , centerIcon, centerIconPress }: {navigation: any, centerIcon: object, centerIconPress: Function}) { 

  const route = useRoute();
  let curRoute = route.name; 

  const handleNavigate = (screen: string): void => {
    navigation.navigate(screen);
  };

  return (   
    <View style={{ 
      flexDirection: 'row',
      height: 73,
      paddingTop: 22,
      paddingBottom: 22,      
      justifyContent: 'space-between',
      backgroundColor: '#564E65' }}>   
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={curRoute == 'home' ? { selected: true } : {}}
            onPress={()=>{handleNavigate('home')}}
            onLongPress={()=>{}}
            style={{ flex: 1 ,  justifyContent: 'center', alignItems: 'center'}} >
            <Image source={homeUrls.includes(curRoute) ? homeActiveIcon : homeIcon} style={{height: 27, resizeMode: "contain"}} />
        </TouchableOpacity>
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={curRoute == 'savedDecks' ? { selected: true } : {}}
            onPress={()=>{handleNavigate('savedDecks')}}
            onLongPress={()=>{}}
            style={{ flex: 1 ,  justifyContent: 'center', alignItems: 'center'}} >
            <Image source={curRoute == 'savedDecks' ? favActiveIcon : favIcon} style={{height: 27, resizeMode: "contain"}} />
        </TouchableOpacity>

        <TouchableOpacity
            accessibilityRole="button"
            onPress={()=>centerIconPress()}
            onLongPress={()=>{}}
            style={{ flex: 1 , marginTop: -50, justifyContent: "center", alignContent: "center"}}
        >
            <View style={{
                backgroundColor: '#1C152A80', 
                display: "flex", 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                alignItems: 'center', 
                borderRadius: 50,
                width: 78,
                padding:10,
                alignContent: 'center'}}>
                <Image source={centerIcon} style={{height: 58, resizeMode: "contain"}} />
            </View>            
        </TouchableOpacity>

        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={curRoute == 'profile' ? { selected: true } : {}}
            onPress={()=>{handleNavigate('profile')}}
            onLongPress={()=>{}}
            style={{ flex: 1 ,  justifyContent: 'center', alignItems: 'center'}} >
            <Image source={curRoute=='profile'? userActiveIcon : userIcon} style={{height: 27, resizeMode: "contain"}} />
        </TouchableOpacity>
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={curRoute == 'settings' ? { selected: true } : {}}
            onPress={()=>{handleNavigate('settings')}}
            onLongPress={()=>{}}
            style={{ flex: 1 ,  justifyContent: 'center', alignItems: 'center'}} >
            <Image source={settingsUrls.includes(curRoute)? settingActiveIcon : settingIcon} style={{height: 27, resizeMode: "contain"}} />
        </TouchableOpacity>
    </View>
  );
}


export default BottomNavigator ;