import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackAuthScreens from "./StackAuth";
import HomeStack from "./HomeStack"
import { connect } from "react-redux";
import {ApplicationState} from "../redux";

const _Main = (userReducer:any) => {

  const [loggedinUser, setLoggedinUser] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {    
    userReducer?.userReducer.then((userData:any)=>{
      console.log('loggedIn $$$$$$$$$$$$$$$$$$$$$$$', userData.isLoggedIn)
      if(userData.isLoggedIn) {
        
        setLoggedinUser(true)
      }
      else {
        setLoggedinUser(false)
      }
      setLoaded(true)
    })
  }, [userReducer]);
  
  return (
    <NavigationContainer independent={true}>
      {loaded ?
        loggedinUser ? <HomeStack /> :  <StackAuthScreens /> : <StackAuthScreens />
      }
    </NavigationContainer>
  );
};


const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const Main = connect(mapStateToProps, { })(
  _Main
);

export default Main;
