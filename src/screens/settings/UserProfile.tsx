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
// import notifyMenuIcon from "../../assets/common/notifyMenuIcon.png"
import circleSearchIcon from "../../assets/common/circleSearchIcon.png";
import profileMenuIcon from "../../assets/common/profileMenuIcon.png";
import termsMenuIcon from "../../assets/common/termsMenuIcon.png"
import contentCreatorBtn from '../../assets/settings/contentCreatorBtn.png'
import customUploadImg from '../../assets/settings/customUploadImg.png'
import pencilIcon from '../../assets/common/pencilIcon.png'
import saveIcon from '../../assets/common/saveIcon.png'
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import addIcon from '../../assets/common/addIcon.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign , Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}


const _UserProfile: React.FC<Props> = (props: Props) => { 
 
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isEditFN, setIsEditFN] = useState(false);

  const [email, setEmail] = useState('');
  const [isEditEmail, setIsEditEmail] = useState(false);

  const [pass, setPass] = useState('');
  const [isEditPass, setIsEditPass] = useState(false);

  const [bio, setBio] = useState('');
  const [isEditBio, setIsEditBio] = useState(false);

  const [tiktokUrl, setTiktokUrl] = useState('');
  const [isEditTicktok, setIsEditTicktok] = useState(false);

  const [twitterUrl, setTwitterUrl] = useState('');
  const [isEditTwitterUrl, setIsEditTwitterUrl] = useState(false);

  
  const [youtubuUrl, setYoutubuUrl] = useState('');
  const [isEditYoutubuUrl, setIsEditYoutubuUrl] = useState(false);
  
  const [instagramUrl, setInstagramUrl] = useState('');
  const [isEditInstagramUrl, setIsEditInstagramUrl] = useState(false);
  
  const [patrionUrl, setPatrionUrl] = useState('');
  const [isEditPatrionUrl, setIsEditPatrionUrl] = useState(false);
  
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isEditWebsiteUrl, setIsEditWebsiteUrl] = useState(false)

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImageUrl(result.uri)
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <View style={styles.titleWithBack}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={31} color="white" />
            </TouchableOpacity>
            <Image source={contentCreatorBtn} style={styles.contentCreatorBtn} />
          </View>
          <View style={styles.dataContent}>
            <TouchableOpacity onPress={()=>pickImage()} style={styles.selectImgBtn} >
              <Image source={selectedImageUrl ? {uri: selectedImageUrl } : customUploadImg} style={styles.uplaodImgStyle} />
            </TouchableOpacity>            
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.goldBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>First Name</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={firstName}           
                  onChangeText={(txt) => setFirstName(txt)}
                  placeholder="First Name" 
                  editable={isEditFN}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditFN(!isEditFN)}>
                  <Image source={isEditFN ? saveIcon :pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.emailBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Email Address</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={email}           
                  onChangeText={(txt) => setEmail(txt)}
                  placeholder="your email" 
                  editable={isEditEmail}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditEmail(!isEditEmail)}>
                  <Image source={isEditEmail ? saveIcon : pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.passBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Password</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={pass}           
                  onChangeText={(txt) => setPass(txt)}
                  placeholder="password" 
                  editable={isEditPass}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditPass(!isEditPass)}>
                  <Image source={isEditPass ? saveIcon : pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={()=> console.log('forgotpass')}>
            <Text style={styles.forgotPassTxt}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.bioBar]} />
            <View style={styles.itemContent}>
              <View style={styles.titleWithIcon}>
                <Text style={styles.itemTitle}>Profile BIO</Text>
                <TouchableOpacity onPress={() => setIsEditBio(!isEditBio)}>
                  <Image source={isEditBio ? saveIcon : pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContent}>
                <TextInput    
                  value={bio}           
                  onChangeText={(txt) => setBio(txt)}         
                  numberOfLines={8}
                  multiline={true}
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 
                  editable={isEditBio}
                  placeholderTextColor={'#968FA4'}
                  style={[styles.inputStyle, styles.textAreaStyle]}/> 
              </View>
            </View>
          </View>
          <Text style={styles.socialLinksTxt}>Choose up to 3 links from below:</Text>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.tickTockBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Tik Tok URL</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={tiktokUrl}           
                  onChangeText={(txt) => setTiktokUrl(txt)}
                  placeholder="url" 
                  editable={isEditTicktok}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditTicktok(!isEditTicktok)}>
                  <Image source={isEditTicktok ? saveIcon:  pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.twitterBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Twitter URL</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={twitterUrl}           
                  onChangeText={(txt) => setTwitterUrl(txt)}
                  placeholder="url" 
                  editable={isEditTwitterUrl}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditTwitterUrl(!isEditTwitterUrl)}>
                  <Image source={isEditTwitterUrl ? saveIcon:  pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.youtubuBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Youtube URL</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={youtubuUrl}           
                  onChangeText={(txt) => setYoutubuUrl(txt)}
                  placeholder="url" 
                  editable={isEditYoutubuUrl}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditYoutubuUrl(!isEditYoutubuUrl)}>
                  <Image source={isEditYoutubuUrl ? saveIcon:  pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.instagramBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Instagram URL</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={instagramUrl}           
                  onChangeText={(txt) => setInstagramUrl(txt)}
                  placeholder="url" 
                  editable={isEditInstagramUrl}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditInstagramUrl(!isEditInstagramUrl)}>
                  <Image source={isEditInstagramUrl ? saveIcon:  pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.patreonBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Patreon</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={patrionUrl}           
                  onChangeText={(txt) => setPatrionUrl(txt)}
                  placeholder="url" 
                  editable={isEditPatrionUrl}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditPatrionUrl(!isEditPatrionUrl)}>
                  <Image source={isEditPatrionUrl ? saveIcon:  pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.userDataItem}>
            <View style={[styles.leftBar, styles.websiteBar]} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Website URL</Text>
              <View style={styles.inputContent}>
                <TextInput    
                  value={websiteUrl}           
                  onChangeText={(txt) => setWebsiteUrl(txt)}
                  placeholder="url" 
                  editable={isEditWebsiteUrl}
                  placeholderTextColor={'#968FA4'}
                  style={styles.inputStyle}/>
                
                <TouchableOpacity onPress={() => setIsEditWebsiteUrl(!isEditWebsiteUrl)}>
                  <Image source={isEditWebsiteUrl ? saveIcon:  pencilIcon} style={styles.pencilIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer} />
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={circleSearchIcon}
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
  },
  mainImgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleWithBack: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  contentCreatorBtn: {
    width: 177,
    height: 55,
    resizeMode: 'contain',
  },
  dataContent: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,    
    marginBottom: 26
  },
  selectImgBtn: {},
  uplaodImgStyle: {
    width: 240,
    height: 202,
    resizeMode: 'cover',
    borderRadius: 21,
  },
  userDataItem: {
    marginTop: 18,
    flex: 1,  
    flexDirection: 'row'  ,
    backgroundColor: '#252A34',
    borderRadius: 14,
    padding: 16,
  },
  leftBar: {
    width: 4,
    borderRadius: 4,
    height: 53,
  },
  goldBar: {
    backgroundColor: '#FEDD71'
  },
  emailBar: {
    backgroundColor: '#A6F3A0'
  },
  passBar: {
    backgroundColor: '#FBA4FD'
  },
  bioBar: {
    backgroundColor: '#53D6FF'
  },
  tickTockBar: {
    backgroundColor: '#FF0050'
  },
  twitterBar: {
    backgroundColor: '#00ACEE'
  },
  youtubuBar: {
    backgroundColor: '#FF0000'
  },
  instagramBar: {
    backgroundColor: '#515ED4'
  },
  patreonBar: {
    backgroundColor: '#F96854'
  },
  websiteBar: {
    backgroundColor: '#6B7488'
  },
  forgotPassTxt: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color:'white',
    marginTop: 28,
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    color: 'white'
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputStyle: {
    height: 25,
    padding: 2,
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  textAreaStyle: {
    height: 188,
  },
  socialLinksTxt: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#ffffff',
    marginTop: 42,
    marginBottom: 24,
  },
  pencilIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',    
  },
  bottomContainer: {
    height: 120,
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const UserProfile = connect(mapStateToProps, { })(
  _UserProfile
);

export default UserProfile;
