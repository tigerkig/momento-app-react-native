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
import { NavigationScreenProp } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import backIcon from '../../assets/common/backIcon.png'
import noImage from '../../assets/deck/noImage.png'
import checkedIcon from '../../assets/deck/checkedIcon.png'
import radioSelect from '../../assets/deck/radioSelect.png'
import radioUnselect from '../../assets/deck/radioUnselect.png'
import createDeckBtn from '../../assets/deck/createDeckBtn.png'
import * as ImagePicker from 'expo-image-picker';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";
import { Video } from 'expo-av';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}

const _CreateVideoDeck: React.FC<Props> = (props: Props) => { 
 

  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [maleSelect, setMaleSelect] = useState(true)
  const [deckType, setDeckType] = useState('music')
  const [videoUrl, setVideoUrl] = useState('')

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };  

  const gotoBack = () => {
    props.navigation.goBack()
  }

  const createDeck = () => {
    handleNavigate('createDeckCard')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          
          {videoUrl !=='' ? 
            <Video
              style={styles.videoPreviewContainer}
              source={{
                uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}              
              resizeMode={"cover"}
          />
          : 
          <View style={styles.videoPreviewContainer} />
          }
          <Text style={styles.descriptionTxt}>Video URL</Text>
          <TextInput    
              value={videoUrl}           
              onChangeText={(txt) => setVideoUrl(txt)}
              placeholder="url" 
              placeholderTextColor={'#968FA4'}
              style={styles.inputStyle}/>
              
          <Text style={styles.descriptionTxt}>Description</Text>
          <TextInput 
              placeholder="Title" 
              placeholderTextColor={'#968FA4'}
              style={styles.inputStyle}/>
          <TextInput 
              placeholder="Description" 
              placeholderTextColor={'#968FA4'}              
              numberOfLines={8}
              multiline={true}
              editable
              maxLength={40}
              style={[styles.inputStyle, styles.textAreaStyle]}/>
          <Text style={styles.descriptionTxt}>Spotify Link</Text>
          <TextInput 
              placeholder="url" 
              placeholderTextColor={'#968FA4'}
              style={styles.inputStyle}/>
          <Text style={styles.voiceTxt}>Voice</Text>
          <View style={styles.maleSelectContainer}>
            <Text style={styles.maleTxt}>Male</Text>
            <TouchableOpacity onPress={()=> setMaleSelect(true)}>
              <Image source={maleSelect ? radioSelect :radioUnselect} style={styles.radioBtnImg} />
            </TouchableOpacity>
            <Text style={styles.maleTxt}>Female</Text>
            <TouchableOpacity onPress={()=> setMaleSelect(false)}>
              <Image source={maleSelect ? radioUnselect : radioSelect} style={styles.radioBtnImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContainer}>
            <SelectPicker
              selectedValue={deckType}
              style={styles.selectStyle}
              itemStyle={styles.selectItemStyle}
              dropdownIconColor={"#968FA4"}
              onValueChange={(itemValue, itemIndex) =>
                setDeckType(itemValue)
              }>
              <SelectPicker.Item label="Music" value="music" />
              <SelectPicker.Item label="Movie" value="movie" />
              <SelectPicker.Item label="TV Show" value="tvshow" />
              <SelectPicker.Item label="Interviews" value="interviews" />
              <SelectPicker.Item label="Kids" value="kids" />
              <SelectPicker.Item label="Documentary" value="Documentary" />
              <SelectPicker.Item label="Anime" value="anime" />
            </SelectPicker>
          </View>
          <View style={styles.createDeckBtnContainer}>
            <TouchableOpacity style={styles.createDeckBtn} onPress={createDeck}>
              <Image source={createDeckBtn} style={styles.createDeckBtnImg} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={backIcon}
          centerIconPress={gotoBack}
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
  videoPreviewContainer: {
    height: 203,
    flex:1,
    backgroundColor: '#292627',
    borderRadius: 21,
    borderStyle: 'dashed',
    marginTop: 60,
    borderWidth: 1,
    borderColor: '#fece26CE'
  },
  addPhotoTxt: {
    color: '#ffffff',
    fontSize: 23,
    lineHeight:33,
    fontWeight: '700',
    marginTop: 60,
    marginBottom: 20,
  },
  selectImgList: {
    flexDirection: 'row',
    flex: 1
  },
  pickBtnContainer: {
    height: 145,
    width: 122,
    borderRadius:11,
    margin: 2,
  },
  pickBtnImg: {
    height: 141,
    width: 122,
    resizeMode: 'contain'
  },
  imgListContainer: {
    flex: 1,
    height: 145,
    width: 120,
  },
  imgListItem: {
    borderRadius: 11,
    marginLeft: 20,  
    backgroundColor: 'transparent',
    padding: 2,
    position: 'relative',   
    height: 145,
  },
  imgListSelectedItem: {
    borderRadius: 11,
    marginLeft: 20, 
    position: 'relative',   
    backgroundColor: 'white',
    padding: 2,
    height: 145,
  },
  imgListItemImg: {    
    height: 141,
    width: 122,
    resizeMode: 'cover',
    borderRadius: 11,
  },
  checkedIconContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'white'
  },
  checkedIcon: {    
    width: 12,
    resizeMode: 'contain',
  },
  descriptionTxt: {
    fontSize: 23,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 24,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#A293BE',
    height: 65,
    borderRadius: 14,
    padding: 19,
    color: 'white',
  },
  textAreaStyle: {
    height: 234,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
    marginTop: 24,
  },
  voiceTxt: {
    fontSize: 23,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 38,
    marginBottom: 15,
  },
  maleSelectContainer: {
    flexDirection: 'row',
    marginBottom: 50,
    alignContent: 'center',
    alignItems: 'center',
  },
  maleTxt: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: 'white',
    marginRight: 15,
  },
  radioBtnImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 30,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#A293BE',
    height: 65,
    borderRadius: 14,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: "hidden"
  },
  selectStyle: {
    height: 65,
    color: '#968FA4',
  },
  selectItemStyle: {
  },
  createDeckBtnContainer: {
    marginTop: 30,
    marginBottom: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createDeckBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  createDeckBtnImg: {
    width: 178,
    height: 55,
    resizeMode: 'contain'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const CreateVideoDeck = connect(mapStateToProps, { })(
  _CreateVideoDeck
);

export default CreateVideoDeck;
