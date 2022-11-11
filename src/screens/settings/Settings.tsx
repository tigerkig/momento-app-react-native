import React, { useState } from "react";
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
import mainBg from "../../assets/mainBg.png";
import logoutMenuIcon from "../../assets/common/logoutMenuIcon.png";
import downloadIcon from "../../assets/common/downloadIcon.png"
import privacyMenuIcon from "../../assets/common/privacyMenuIcon.png";
import profileMenuIcon from "../../assets/common/profileMenuIcon.png";
import termsMenuIcon from "../../assets/common/termsMenuIcon.png"
import uploadImgMenuIcon from "../../assets/common/uploadImgMenuIcon.png"
import usersMenuIcon from "../../assets/common/usersMenuIcon.png"
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import {ApplicationState, userLogout, OnUserLogin} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import addIcon from '../../assets/common/addIcon.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign , Entypo } from '@expo/vector-icons'; 

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  userLogout: Function;
  OnUserLogin: Function;
  isSavePlayDeck: any;
}


const _Settings: React.FC<Props> = (props: Props) => { 
 
  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
  } 

  const logout = async () => {
    console.log('logout')
   
    await userLogout()
    console.log("!!!!")
    // props.navigation.navigate("home")

  }


  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <View style={styles.titleWithBack}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={31} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('userProfile')}>
              <Image source={profileMenuIcon} style={styles.listIcon} />
              <Text style={styles.menuTxt}>User Profile</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('termsAndConditions')}>
              <Image source={termsMenuIcon} style={styles.listIcon} />
              <Text style={styles.menuTxt}>{'Terms & Conditions'}</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}  onPress={() => handleNavigate('privaty')}>
              <Image source={privacyMenuIcon} style={styles.listIcon} />
              <Text style={styles.menuTxt}>Privacy</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}  onPress={() => handleNavigate('downloads')}>
              <Image source={downloadIcon} style={styles.listIcon} />
              <Text style={styles.menuTxt}>Downloads</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}  onPress={() => handleNavigate('uploadImg')}>
              <Image source={uploadImgMenuIcon} style={styles.listIcon} />
              <Text style={styles.menuTxt}>Image Uploads</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}  onPress={() => handleNavigate('userManagement')}>
              <Image source={usersMenuIcon} style={styles.listIcon} />
              <Text style={styles.menuTxt}>Users</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}  onPress={() => logout()}>
              <Image source={logoutMenuIcon} style={styles.listIcon} />
              <Text style={styles.menuTxt}>Log Out</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={addIcon}
          centerIconPress={gotoAddDeck}
          />
      </ImageBackground>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  contentContainer: {
    flex:1,
    padding: 25,
    paddingBottom: 80,
    marginBottom: -20
  },
  mainImgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleWithBack: {
    flexDirection: "row",
    alignItems: 'center'
  },
  menuContent: {
    padding: 25,
  },
  menuItem: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 22,
    alignItems: 'center'
  },
  menuTxt: {
    flex:1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    color: 'white'
  },
  listIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 16,
  },
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const Settings = connect(mapStateToProps, { userLogout, OnUserLogin})(
  _Settings
);

export default Settings;
