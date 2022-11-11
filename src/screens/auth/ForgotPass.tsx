import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
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
} from "../../redux";

import mainBg from "../../assets/mainBg.png";
import emainIcon from "../../assets/signin/emainIcon.png";
import { whiteColor } from "../../core";
import { NavigationScreenProp } from "react-navigation";
import { Login } from "../../ApiClient";
import { MyGlobalContext } from "../../context/index";
import { dangerColor, mainBgColor } from "../../core/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ForgotPassProps {
  OnUserLogin: Function;
  OnUserSignup: Function;
  userReducer: object;
  navigation: NavigationScreenProp<any, any>;
}

const _ForgotPassScreen: React.FC<ForgotPassProps> = ({
  OnUserLogin,
  OnUserSignup,
  userReducer,
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title] = useState("Connexion");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { accountInfo, setAccountInfo } = useContext(MyGlobalContext);

  const onTapAuthenticate = async () => {
    setLoading(true);
    const response = await Login(email, password);
    if (response?.success) {
      if (accountInfo?.schoolId.toString() !== response.user.id.toString()) {
        setAccountInfo({
          schoolId: '1',
          teachearId: '1',
          fName: 'fname',
          lName: 'LName',
          mName: 'MName',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
          token: 'token',
        });
        AsyncStorage.setItem("currentUser", JSON.stringify({
          schoolId: '1',
          teachearId: '1',
          fName: 'fname',
          lName: 'LName',
          mName: 'MName',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
          token: 'token',
        }))
          .then(() => {
            setLoading(false);
            navigation.navigate("IntroSlider");
          })
          .catch((error) => {
            console.log(error);
          });
        // setMessage("Cette ecole ne reconnait pas votre compte");
        setLoading(false);
      } else {
        setAccountInfo({
          schoolId: response?.user.SchoolId,
          teachearId: response?.user.id,
          fName: response?.user.FName,
          lName: response?.user.LName,
          mName: response?.user.MName,
          email: response?.user.Email,
          phone: response?.user.Phone,
          address: response?.user.Address,
          token: response?.token,
        });
        AsyncStorage.setItem("currentUser", JSON.stringify({
          schoolId: response?.user.SchoolId,
          teachearId: response?.user.id,
          fName: response?.user.FName,
          lName: response?.user.LName,
          mName: response?.user.MName,
          email: response?.user.Email,
          phone: response?.user.Phone,
          address: response?.user.Address,
          token: response?.token,
        }))
          .then(() => {
            setLoading(false);
            navigation.navigate("IntroSlider");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setAccountInfo({
        schoolId: '1',
        teachearId: '1',
        fName: 'fname',
        lName: 'LName',
        mName: 'MName',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        token: 'token',
      });
      AsyncStorage.setItem("currentUser", JSON.stringify({
        schoolId: '1',
        teachearId: '1',
        fName: 'fname',
        lName: 'LName',
        mName: 'MName',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        token: 'token',
      }))
        .then(() => {
          setLoading(false);
          setEmail("");
          setPassword("");
          navigation.navigate("IntroSlider");
        })
        .catch((error) => {
          console.log(error);
          setMessage("Email ou mot de passe incorrect, veuillez reessayer");
          setLoading(false);
        });     
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>
            <Text style={styles.signinTitle}>Forgot Password</Text>   
            <Text style={styles.signinDesc}>Enter the email address associated with your account</Text>   
            {emailSent ? 
              <View style={styles.betweenBody}>
                <View >
                  <Text style={styles.emailSentTitle}>Email Sent</Text>
                  <Text style={styles.emailSentSubTitle}>Instructions on how to reset your password have been sent to your registered email account</Text>
                </View>
                <ButtonWithTitle
                  title={"Login"}
                  height={83}
                  btnStyle={styles.btnStyle}
                  btnTxtStyle={styles.btnTxtStyle}
                  width={Dimensions.get("window").width - 50}
                  onTap={onTapAuthenticate}
                />            
              </View>
              :
              <View style={styles.body}>
                <Text style={styles.textLabel}>Email</Text>   
                <TextField
                  placeholder="Adresse email"
                  onTextChange={setEmail}
                  isSecure={false}
                  imgIcon={emainIcon}
                />
                <ButtonWithTitle
                  title={"Reset"}
                  height={83}
                  btnStyle={styles.btnStyle}
                  btnTxtStyle={styles.btnTxtStyle}
                  width={Dimensions.get("window").width - 50}
                  onTap={onTapAuthenticate}
                />
                <View style={styles.gotoSingupView}> 
                  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.gotoSignUpWhiteTxt}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: dangerColor, marginTop: 20 }}>
                  {message !== "" && (
                    <Text style={{ color: whiteColor, padding: 10 }}>{message}</Text>
                  )}
                </View>
              </View>
            }
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
    marginTop: 100,
    marginBottom: 50,
  },
  betweenBody: {
    marginTop: 100,
    marginBottom: 50,
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 300,
  },
  emailSentTitle: {
    fontSize: 26,
    lineHeight: 39,
    color: '#f4f4f4',
    marginBottom: 11,
    textAlign: 'center'
  },
  emailSentSubTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: '#968FA4',
    textAlign: 'center'
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
  gotoSingupView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 55,
  },
  gotoSignUpWhiteTxt: {
    color: '#ffffff',    
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
  },
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const ForgotPassScreen = connect(mapStateToProps, { OnUserLogin, OnUserSignup })(
  _ForgotPassScreen
);

export { ForgotPassScreen };
