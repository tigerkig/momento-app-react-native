import React, { useState, useEffect, useContext } from "react";
import { Dispatch } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { TextField } from "../../components";
import { ButtonWithTitle } from "../../components/ButtonWithTittle/ButtonWithTitle";
import { connect } from "react-redux";
import {
  ApplicationState,
  OnUserLogin,
  OnUserSignup,
  UserState,
  OnUserSignupWithGoogle,
} from "../../redux";

import mainBg from "../../assets/mainBg.png";
import emainIcon from "../../assets/signin/emainIcon.png";
import passIcon from "../../assets/signin/passIcon.png";
import facebookIcon from "../../assets/signin/facebook.png";
import goggleIcon from "../../assets/signin/goggle.png";
import twitterIcon from "../../assets/signin/twitter.png";

import { whiteColor } from "../../core";
import { NavigationScreenProp } from "react-navigation";
import { MyGlobalContext } from "../../context/index";
import { dangerColor, mainBgColor } from "../../core/theme/colors";

import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';


import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface RegisterProps {
  OnUserLogin: Function;
  OnUserSignup: Function;
  OnUserSignupWithGoogle: Function;
  userReducer: object;
  navigation: NavigationScreenProp<any, any>;
  
}

const  _RegisterScreen: React.FC<RegisterProps> = ({
  OnUserSignup,
  userReducer,
  navigation,
  OnUserSignupWithGoogle
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title] = useState("Connexion");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { accountInfo, setAccountInfo } = useContext(MyGlobalContext);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '927802376017-ig2g0vdlk7k1jah08jpcefbvbvddheje.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {      
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((user) =>{
        OnUserSignupWithGoogle(user.user?.uid, user.user?.email, user.user?.displayName, user.user?.phoneNumber)        
      });

      
    }
  }, [response]);

  const onTapAuthenticate = async () => {
    setLoading(true);
    OnUserSignup(email, password)
    .then((success:any) => {
      setLoading(false);
      if(success) {
        navigation.navigate("IntroSlider");
      }
    })
   
    
  };
  return (
    
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>        
            <Text style={styles.signinTitle}>Sign Up</Text>   
            <Text style={styles.signinDesc}>Sign up today using email or social media</Text>   
            <View style={styles.body}>        
              <Text style={styles.textLabel}>Email</Text>   
              <TextField
                placeholder="Adresse email"
                onTextChange={setEmail}
                isSecure={false}
                imgIcon={emainIcon}
              />
              <Text style={styles.textLabel}>Password</Text>  
              <TextField
                placeholder="Mot de passe"
                onTextChange={setPassword}
                isSecure={true}
                imgIcon={passIcon}
              />
              <ButtonWithTitle
                title={"Sign Up"}
                height={83}
                btnStyle={styles.btnStyle}
                btnTxtStyle={styles.btnTxtStyle}
                width={Dimensions.get("window").width - 50}
                onTap={onTapAuthenticate}
              />  
              {loading && <View style={styles.container}>
                  <ActivityIndicator />
                </View>
              }  
              <View style={styles.gotoSingupView}>
                <Text style={styles.gotoSignupTxt}>Sign up with your social media </Text> 
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.gotoSignUpWhiteTxt}>Sign In</Text>
                </TouchableOpacity>
              </View>      
              <View style={{ backgroundColor: dangerColor, marginTop: 20 }}>
                {message !== "" && (
                  <Text style={{ color: whiteColor, padding: 10 }}>{message}</Text>
                )}
              </View>
              <View style={styles.socialLoginBtnWrapper}>
                <TouchableOpacity style={styles.socialBtn} onPress={()=> promptAsync()}>
                  <Image source={facebookIcon} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} onPress={()=> console.log('pressed')}>
                  <Image source={goggleIcon} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn} onPress={()=> console.log('pressed')}>
                  <Image source={twitterIcon} style={styles.socialIcon} />
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
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
  },
  mainImgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  signinTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginTop: 75,
  },
  signinDesc: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 30,
    color: '#A9ABAA',
  },
  textLabel: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    paddingTop: 30,
    color: '#ffffff',
  },
  body: {
    marginTop: 20,
    marginBottom: 50,
  },
  btnStyle: {
    backgroundColor: '#FFF960',
    borderRadius: 16,
    maxHeight: 83,
    height: 83,
    marginTop: 38,
  },
  btnTxtStyle: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '700',
  },
  forgotTxt: {
    fontSize:18,
    fontWeight: '500',
    lineHeight: 21,
    color: '#A9ABAA',
    marginTop: 25,
    textAlign: 'center'
  },
  gotoSingupView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 55,
  },
  gotoSignupTxt: {
    fontSize: 17,
    fontWeight: '700',
    color: '#8B8B8D',
    lineHeight: 20,
  },
  gotoSignUpWhiteTxt: {
    color: '#ffffff',    
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },
  socialLoginBtnWrapper: {
    marginTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  socialBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#292627',
    borderRadius: 12.42,
    borderWidth: 1,
    borderColor: '#A293BE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialIcon: {
    // width: 24,
    height: 26,
    resizeMode: 'contain',
    alignItems: 'center',
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const RegisterScreen = connect(mapStateToProps, { OnUserLogin, OnUserSignup, OnUserSignupWithGoogle })(
  _RegisterScreen
);

export { RegisterScreen };
