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
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import backIcon from '../../assets/common/backIcon.png'
import noImage from '../../assets/deck/noImage.png'
import checkedIcon from '../../assets/deck/checkedIcon.png'
import removeIcon from '../../assets/common/removeIcon.png'
import radioUnselect from '../../assets/deck/radioUnselect.png'
import createDeckBtn from '../../assets/deck/createDeckBtn.png'
import customUploadImg from '../../assets/settings/customUploadImg.png'
import { AntDesign  } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import CustomModal from "../component/CustomModal";
import trashIcon from '../../assets/common/trashIcon.png'

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

const _UploadImages: React.FC<Props> = (props: Props) => { 
 

  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [localImgUrl, setLocalImgUrl] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
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
      setLocalImgUrl(result.uri)
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
        <Image source={{uri: item.imgUrl}} style={item.imgUrl == selectedImageUrl ? styles.imgListItemSelectedImg : styles.imgListItemImg} />
      </TouchableOpacity>     
    </View>
  );

  const renderDeleteImgTxt = () => {
    return (
      <View style={styles.modalTxtContent}>
        <Text style={styles.modalContentTxt}>
          Are you sure you want to permanently 
          <Text style={[styles.modalContentTxt, styles.delColorTxt]}> delete </Text>
          this card?
        </Text>        
      </View>
    )
  }

  const removeImg = () => {
    setShowDeleteDialog(true)
  }

  const deleteImg = () => {
    setShowDeleteDialog(false)
  }

  const cancelDialog = () => {
    setShowDeleteDialog(false)
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
          <View style={styles.dataContent}>
            <TouchableOpacity onPress={()=>pickImage()} style={styles.selectImgBtn} >
              <Image source={localImgUrl ? {uri: localImgUrl } : customUploadImg} style={styles.uplaodImgStyle} />
            </TouchableOpacity>            
          </View>
          <Text style={styles.addPhotoTxt}>Images</Text>
          <View style={styles.selectImgList}>             
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
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={removeIcon}
          centerIconPress={removeImg}
          />
        <CustomModal 
          modalVisible={showDeleteDialog} 
          modalIcon={trashIcon}
          isRating={false}
          ratingVal={0}
          renderModalTxtContent={renderDeleteImgTxt}
          modalSubTxt={'You can’t undo this action.'}
          primaryBtnTxt={'Delete'}
          cancelBtnTxt={'Cancel'}
          primaryAction={deleteImg}
          cancelAction={cancelDialog}
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
    borderWidth: 2,
    borderColor: '#ffffff'
  },
  imgListItemImg: {    
    height: 141,
    width: 122,
    resizeMode: 'cover',
    borderRadius: 11,
  },
  imgListItemSelectedImg: {
    height: 137,
    width: 118,
    resizeMode: 'cover',
    borderRadius: 11,
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
  titleWithBack: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  modalTxtContent: {
    justifyContent: 'center',
    maxWidth: 200,
  },
  modalContentTxt: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,    
    color: 'white',
    textAlign: 'center'
  },
  delColorTxt: {
    color: '#FF517B'
  },
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const UploadImages = connect(mapStateToProps, { })(
  _UploadImages
);

export default UploadImages;
