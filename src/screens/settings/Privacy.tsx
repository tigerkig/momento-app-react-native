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
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import addIcon from '../../assets/common/addIcon.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign , Entypo } from '@expo/vector-icons'; 

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}


const _Privacy: React.FC<Props> = (props: Props) => { 
 
  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
  }

  const logout = () => {
    console.log('logout')
    AsyncStorage.removeItem('user')
    .then(() => {
      props.navigation.navigate('Login')
    })    
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
            <Text style={styles.pageTitle}>
              Privacy Policy
            </Text>
            <Text style={styles.pageDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh consectetur aliquam accumsan vel faucibus molestie. Dui molestie imperdiet malesuada a, viverra massa. Orci leo nisl tortor pulvinar tincidunt massa, at cursus. Nec pretium netus gravida proin non aliquam.Lorem ipsum dolor sit amet, consectetur elto adipiscing elit. Nulla morbi neque consectetu id tellus vel. Dui morbi sed volutpat sit aleani eleifend commodo massa. Laoreet sit makse convallis pellentesque id malesuada egeta lo imperdiet neque duis. Nunc adipiscing maker elementum, et ornare aenean sit euconvallis pellentesque
            </Text>
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
    flex: 1,
    padding: 18,
    backgroundColor: '#292627',
    borderRadius: 21,
    borderStyle: 'dashed',
    marginTop: 60,
    borderWidth: 1,
    borderColor: '#fece26CE'    ,
    marginBottom: 80,
  },
  pageTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 19,
    color: '#FFFFFF',
    marginTop: 51,
    textAlign: 'center',
  },
  pageDesc: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22.5,
    color: '#FFFFFF',
    marginTop: 53,
    marginBottom: 82,
    textAlign: 'center'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const Privacy = connect(mapStateToProps, { })(
  _Privacy
);

export default Privacy;
