import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import mainBg from "../../assets/mainBg.png";
import { NavigationScreenProp } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import backIcon from '../../assets/common/backIcon.png'
import removeIcon from '../../assets/common/removeIcon.png'
import trashIcon from '../../assets/common/trashIcon.png'
import deckCreateIcon from '../../assets/common/deckCreateIcon.png'
import createDeckBtn from '../../assets/deck/createDeckBtn.png'
import * as ImagePicker from 'expo-image-picker';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { AntDesign , Ionicons} from '@expo/vector-icons'; 

import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import CustomModal from "../component/CustomModal";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}


interface deckCardInterface  {
  cardIndex: number; 
  frontTxt: string,
  transTxt: string,
  notesTxt: string,
}

const _CreateDeckCard: React.FC<Props> = (props: Props) => {  
 

  const [cardInputType, setCardInputType] = useState('front')
  const [deckCardList, setDeckCardList] = useState<deckCardInterface[]>([])
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const [frontTxt, setFrontTxt] = useState('')
  const [transTxt, setTransTxt] = useState('')
  const [notesTxt, setNotesTxt] = useState('')
  
  const [showRemoveBtn, setShowRemoveBtn] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [createSuccessModalVisible, setCreateSuccessModalVisible] = React.useState(false)

  /////////////////////for audio and slider ////////////////////

  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const [Playing, SetPlaying] = React.useState(false);
  const [Duration, SetDuration] = React.useState(0);
  const [Value, SetValue] = React.useState(0);
  const sound = React.useRef(new Audio.Sound());
  const UpdateStatus = async (data:any) => {
    try {
      if (data.didJustFinish) {
        ResetPlayer();
      } else if (data.positionMillis) {
        if (data.durationMillis) {
          SetValue((data.positionMillis / data.durationMillis) * 100);
        }
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const ResetPlayer = async () => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        SetValue(0);
        SetPlaying(false);
        await sound.current.setPositionAsync(0);
        await sound.current.stopAsync();
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          SetPlaying(true);
        }
      }
    } catch (error) {
      SetPlaying(false);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          SetPlaying(false);
        }
      }
    } catch (error) {
      SetPlaying(true);
    }
  };

  const SeekUpdate = async (data:any) => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        const result = (data / 100) * Duration;
        await sound.current.setPositionAsync(Math.round(result));
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          { uri: 'https://www.w3schools.com/html/horse.ogg' },
          {},
          true
        );
        if (result.isLoaded === false) {
          SetLoading(false);
          SetLoaded(false);
          console.log('Error in Loading Audio');
        } else {
          sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
          SetLoading(false);
          SetLoaded(true);
          SetDuration(result.durationMillis!);
        }
      } catch (error) {
        SetLoading(false);
        SetLoaded(false);
      }
    } else {
      SetLoading(false);
      SetLoaded(true);
    }
  };

  const GetDurationFormat = (duration:any) => {
    let time = duration / 1000;
    let minutes = Math.floor(time / 60);
    let timeForSeconds = time - minutes * 60;
    let seconds = Math.floor(timeForSeconds);
    let secondsReadable = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${secondsReadable}`;
  };

  //////////////////////end for audio and slider /////////////////////////////

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };  

  const centerIconPress = () => {
    if(showRemoveBtn) {   
      setDeleteModalVisible(true)
    }
    else {
      props.navigation.goBack()
    }    
  }

  const createDeck = () => {
    setCreateSuccessModalVisible(true)
  }

  const backToLastCard = () => {
    if(activeCardIndex > 0) {
      let cardDetail = deckCardList[activeCardIndex - 1]
      setFrontTxt(cardDetail.frontTxt)
      setTransTxt(cardDetail.transTxt)
      setNotesTxt(cardDetail.notesTxt)
      setCardInputType('front')
      setActiveCardIndex(activeCardIndex - 1)
      setShowRemoveBtn(true)
    }
    else {
      setShowRemoveBtn(false)
      props.navigation.goBack()
    }
  }

  const gotoNextCard = () => {
    if(!frontTxt) return
    if(deckCardList[activeCardIndex + 1]) {
      let cardDetail = deckCardList[activeCardIndex + 1]
      setFrontTxt(cardDetail.frontTxt)
      setTransTxt(cardDetail.transTxt)
      setNotesTxt(cardDetail.notesTxt)
      setShowRemoveBtn(true)
    }
    else {
      if((activeCardIndex + 1) !== deckCardList.length) {      
        deckCardList.push({
          cardIndex: activeCardIndex,
          frontTxt: frontTxt,
          transTxt: transTxt,
          notesTxt: notesTxt,
        })
        setDeckCardList(deckCardList)
      }
      setFrontTxt('')
      setTransTxt('')
      setNotesTxt('')
      setShowRemoveBtn(false)
    }
    
    // console.log(deckCardList)    
    setActiveCardIndex(activeCardIndex + 1)
    setCardInputType('front')
    
  }

  const renderSuccessModalTxtContent = () => {
    return (
      <View style={styles.modalTxtContent}>
        <Text style={styles.modalContentTxt}>
            You have  
          <Text style={[styles.modalContentTxt, styles.successColorTxt]}> successfully </Text>
            created your own deck.
        </Text>        
      </View>
    )
  }

  const closeCreateModal = () => {
    setCreateSuccessModalVisible(false)
  }

  const gotoEditDeck = () => {
    setCreateSuccessModalVisible(false)
  }

  const rednerDeleteModalTxtContent = () => {
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

  const deleteCard = () => {
    let index = deckCardList.indexOf(deckCardList[activeCardIndex])
    if (index !== -1) {
      deckCardList.splice(index, 1);
      let cardDetail = deckCardList[activeCardIndex]
      setFrontTxt(cardDetail.frontTxt)
      setTransTxt(cardDetail.transTxt)
      setNotesTxt(cardDetail.notesTxt)
      setCardInputType('front')

      setDeckCardList(deckCardList)
    }
    setDeleteModalVisible(false)
  }

  const cancelDelete = () => {
    setDeleteModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <View style={styles.titleWithBack}>
            <TouchableOpacity onPress={()=> backToLastCard()}>
              <AntDesign name="arrowleft" size={31} color="white" />
            </TouchableOpacity>
            <Text style={styles.createTxt}>Create</Text>
          </View>
          <View style={[styles.inputStyle, styles.rowContainer]}>
            <Text style={styles.cardTxt}>Card</Text>
            <Text style={[styles.cardTxt,styles.cardNum]}>{activeCardIndex + 1}/{deckCardList.length + 1}</Text>
          </View>
          <View style={styles.cardInputTypeContainer}>
            <View style={styles.cardTypeTab}>
              <TouchableOpacity onPress={()=>setCardInputType('front')}>
                <Text style={[styles.cardTypeTxt, cardInputType == 'front' && styles.activeCardTyeTxt]}>Front</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setCardInputType('trans')}>
                <Text style={[styles.cardTypeTxt, cardInputType == 'trans' && styles.activeCardTyeTxt]}>Translation</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setCardInputType('notes')}>
                <Text style={[styles.cardTypeTxt, cardInputType == 'notes' && styles.activeCardTyeTxt]}>Notes</Text>
              </TouchableOpacity>
            </View>

            {cardInputType == 'front' && 
              <TextInput 
                placeholder="Front" 
                placeholderTextColor={'#968FA4'}              
                numberOfLines={8}
                multiline={true}
                editable
                maxLength={40}
                value={frontTxt}
                onBlur={() => LoadAudio()}
                onChangeText={(txt) => setFrontTxt(txt)}
                style={[styles.inputStyle, styles.textAreaStyle]}/>
            }

            {cardInputType == 'trans' && 
              <TextInput 
                placeholder="Translation" 
                placeholderTextColor={'#968FA4'}              
                numberOfLines={8}
                multiline={true}
                editable
                maxLength={40}
                value={transTxt}
                onChangeText={(txt) => setTransTxt(txt)}
                style={[styles.inputStyle, styles.textAreaStyle]}/>
            }

            {cardInputType == 'notes' && 
              <TextInput 
                placeholder="Notes" 
                placeholderTextColor={'#968FA4'}              
                numberOfLines={8}
                multiline={true}
                editable
                maxLength={40}
                value={notesTxt}
                onChangeText={(txt) => setNotesTxt(txt)}
                style={[styles.inputStyle, styles.textAreaStyle]}/>
            }
            
          </View>
          
          <View style={styles.audioPlayerContainer}>
            <TouchableOpacity 
              style={styles.audioPlayIcon}            
              onPress={Playing ? () => PauseAudio() : () => PlayAudio()}>
                {
                  Playing ? <Ionicons name="md-pause" size={25} color="white" />
                  : <Ionicons name="md-play" size={25} color="white" />
                }
            </TouchableOpacity>
            <Slider
              style={styles.audioSlider}
              minimumValue={0}
              maximumValue={100}
              value={Value}
              onSlidingComplete={(data) => SeekUpdate(data)}
              minimumTrackTintColor={'#FF8C22'}
              maximumTrackTintColor={'#465063'}
              thumbTintColor={'#FF8C2258'}
            />
            <Text style={styles.durationTxt}>
              {Playing
                ? GetDurationFormat((Value * Duration) / 100)
                : GetDurationFormat(Duration)}
            </Text>
          </View>
          
         
          <View style={styles.createDeckBtnContainer}>
            <TouchableOpacity style={styles.createDeckBtn} onPress={createDeck}>
              <Image source={createDeckBtn} style={styles.createDeckBtnImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.createDeckBtn} onPress={gotoNextCard}>
              <Text style={styles.nextCardTxt}>Next Card <AntDesign name="arrowright" size={18} color="#f4f4f4" /></Text>
              
            </TouchableOpacity>
          </View>
        </ScrollView>
        <CustomModal 
          modalVisible={createSuccessModalVisible} 
          modalIcon={deckCreateIcon}
          isRating={false}
          ratingVal={0}
          renderModalTxtContent={renderSuccessModalTxtContent}
          modalSubTxt={''}
          primaryBtnTxt={'Exit'}
          cancelBtnTxt={'Edit'}
          primaryAction={closeCreateModal}
          cancelAction={gotoEditDeck}
        />
        <CustomModal 
          modalVisible={deleteModalVisible} 
          modalIcon={trashIcon}
          isRating={false}
          ratingVal={0}
          renderModalTxtContent={rednerDeleteModalTxtContent}
          modalSubTxt='You can’t undo this action.'
          primaryBtnTxt={'Delete'}
          cancelBtnTxt={'Cancel'}
          primaryAction={deleteCard}
          cancelAction={cancelDelete}
        />
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={showRemoveBtn ? removeIcon : backIcon}
          centerIconPress={centerIconPress}
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
    alignItems: 'center'
  },
  createTxt: {
    flex: 1,
    fontWeight: '600',
    fontSize: 24,
    color: '#EFEBF6',
    textAlign:'center'
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#A293BE',
    height: 71,
    borderRadius: 12,
    padding: 19,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTxt: {
    fontSize: 24,
    lineHeight: 33,
    color: '#EEECF4',
    fontWeight: '700'
  },
  cardNum: {
    color: '#5ADBED',
  },
  cardInputTypeContainer: {
    marginTop: 29,
  },
  cardTypeTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardTypeTxt: {
    backgroundColor: '#26273F',
    borderRadius: 32,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    color: '#A0A0AB'
  },
  activeCardTyeTxt: {
    color: '#FFF960'
  },
  textAreaStyle: {
    height: 234,
    justifyContent: "flex-start",
    marginTop: 28,
    textAlignVertical: 'top'
  },
  createDeckBtnContainer: {
    marginTop: 7,
    marginBottom: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createDeckBtn: {
    marginTop:23,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createDeckBtnImg: {
    width: 178,
    height: 55,
    resizeMode: 'contain'
  },
  audioPlayerContainer: {
    flexDirection: 'row',
    marginTop: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A293BE',
    borderRadius: 12,
    padding: 16,
  },
  audioPlayIcon: {
    width: 25,
  },
  audioSlider: {
    flex: 1,
    //  transform: [{ scaleY: 4 }]
  },
  durationTxt: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 19,
    color: 'white',
  },
  nextCardTxt: {
    color: '#F4F4F4',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 19,
    justifyContent: 'center',
    alignItems: 'center'
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
  successColorTxt: {
    color: '#64FF86'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const CreateDeckCard = connect(mapStateToProps, { })(
  _CreateDeckCard
);

export default CreateDeckCard;
