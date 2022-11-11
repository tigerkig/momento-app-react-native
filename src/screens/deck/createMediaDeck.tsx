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

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}

const WIDTH_DEVICE = Dimensions.get("window").width;
let imageListData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/lalalayoga-3a6a2.appspot.com/o/-N4bEk6e866s27ij96CL%2FprofilePic%2Fstduiocalss1.png?alt=media&token=b256c5f2-3092-4f47-ac5d-14aebd36d907',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/lalalayoga-3a6a2.appspot.com/o/-N4bTyQlYo9muJC3X3rt%2FprofilePic%2Fstduiocalss3.png?alt=media&token=20e6f1b6-b455-48d3-bfdf-007bfbac9755',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6356',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/lalalayoga-3a6a2.appspot.com/o/-NA4l3rv1JjwJrz0cw61%2Fpreview%2Fchristopher-campbell-rDEOVtE7vOs-unsplash.jpg?alt=media&token=38a429bc-7ffa-4f6a-b52b-04d96f8bebc8',
  }
]

const _CreateMediaDeck: React.FC<Props> = (props: Props) => { 
 

  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [maleSelect, setMaleSelect] = useState(true)
  const [deckType, setDeckType] = useState('casual')
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      imageListData.unshift({
        id: 'fromPicker',
        imgUrl: result.uri
      })
      setSelectedImageUrl(result.uri)
    }
  };

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };  

  const gotoBack = () => {
    props.navigation.goBack()
  }

  const slectImg = (item:any) => {
    if(item.imgUrl == selectedImageUrl) {
      if(item.id == 'fromPicker') {
        imageListData.shift()
      }
      setSelectedImageUrl('')
    }
    else {
      setSelectedImageUrl(item.imgUrl)
    }
  }

  const renderItem = ({ item} : {item: any}) => (
    <View style={item.imgUrl == selectedImageUrl ? styles.imgListSelectedItem : styles.imgListItem}>
      <TouchableOpacity onPress={()=> slectImg(item)}>
        <Image source={{uri: item.imgUrl}} style={styles.imgListItemImg} />
      </TouchableOpacity>
      {item.imgUrl == selectedImageUrl && 
        <View style={styles.checkedIconContainer}>
          <Image source={checkedIcon}  style={styles.checkedIcon} />
        </View>
      }
    </View>
  );

  const createDeck = () => {
    handleNavigate('createDeckCard')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <Text style={styles.addPhotoTxt}>Add photo</Text>
          <View style={styles.selectImgList}>
              <TouchableOpacity onPress={pickImage} style={styles.pickBtnContainer}>
                <Image source={noImage} style={styles.pickBtnImg} />
              </TouchableOpacity>
              <View style={styles.imgListContainer}>
                <FlatList
                  nestedScrollEnabled 
                  data={imageListData}
                  renderItem={renderItem}
                  horizontal={true}
                  extraData={selectedImageUrl}
                  keyExtractor={item => item.id}
                />        
              </View>
          </View>
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
              <SelectPicker.Item label="Casual" value="casual" />
              <SelectPicker.Item label="Formal" value="formal" />
              <SelectPicker.Item label="Kids" value="kids" />
              <SelectPicker.Item label="Situational" value="situational" />
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
    marginTop: 45,
    marginBottom: 25,
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
    marginTop: 28,
    textAlignVertical: 'top'
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

const CreateMediaDeck = connect(mapStateToProps, { })(
  _CreateMediaDeck
);

export default CreateMediaDeck;
