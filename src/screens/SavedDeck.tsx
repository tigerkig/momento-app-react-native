import React, { useState , useEffect} from "react";
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
import mainBg from "../assets/mainBg.png";
import soundGraph from "../assets/deck/soundGraph.png";
import soundGraphSliderThumb from "../assets/deck/soundGraphSliderThumb.png"
import cardDeck from "../assets/common/cardDeck.png";
import jojo from "../assets/common/jojo.png";
import  searchIcon from "../assets/common/searchIcon.png"
import savedDeckPlayICon from "../assets/deck/savedDeckPlayICon.png"
import { NavigationScreenProp } from "react-navigation";
import { HomeOption } from "../types";
import { connect } from "react-redux";
import {ApplicationState} from "../redux";
import BottomNavigator from "./component/BottomNavigator";
import addIcon from '../assets/common/addIcon.png'
import { AntDesign , Entypo, FontAwesome  } from '@expo/vector-icons'; 
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

interface Props {
  options: [HomeOption];
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}

const _SavedDeck: React.FC<Props> = (props: Props) => { 
  
  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const [selectedDeckId, setSelectedDeckId] = useState('');
  
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

  const savedDecklist = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'てもいいです か? Mite ',
      deckImg: cardDeck,
      profileImg: jojo,
      ratingCount: 3,
      time: '13-05-2021',
      capacity: '2 MB',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'てもいいですか?',
      deckImg: cardDeck,
      profileImg: jojo,
      ratingCount: 4,
      time: '17-04-2021',
      capacity: '6 MB',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'こんにちは私 はあなた mite',
      deckImg: cardDeck,
      profileImg: jojo,
      ratingCount: 5,
      time: '19-03-2021',
      capacity: '4 MB',
    },
  ];  
  
  const renderSavedDeckList = () => {
    return (
      savedDecklist.map((item, index) => {
        return (
          <TouchableOpacity 
            onPress={() => setSelectedDeckId(item.id)}
            style={[styles.savedDeckListItem, selectedDeckId == item.id && styles.selectedListItem]} key={index}>
            <View style={styles.savedDeckListItemTxtContainer}>
              <Text style={[styles.itemTitle, selectedDeckId == item.id && styles.selectedItemTitle]} numberOfLines={1} ellipsizeMode='tail' >{item.title}</Text>
              <Text style={styles.itemTimeTxt}>{item.time + ' ' + item.capacity}</Text>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => console.log("delete icon pressed")}>
                <FontAwesome name="trash-o" size={24} color="#58555F" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={savedDeckPlayICon} style={styles.savedDeckPlayIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )
      })
    )
  }
  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
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
          {
            savedDecklist.length > 0 ?
          <View style={styles.mainContent}>
            <Text style={styles.titleTxt}>
              こんにちは私はあなたを救うためにここにいる?
            </Text>
            <Text style={styles.subTitle}>
              11 Juni 2021 • 2,5 MB 
            </Text>
            <View style={styles.soundGraphContainer}>
              <Image source={soundGraph} style={styles.soundGraph} />
              <Slider
                  style={styles.audioSlider}
                  minimumValue={0}
                  maximumValue={100}
                  value={Value}
                  onSlidingComplete={(data) => SeekUpdate(data)}
                  minimumTrackTintColor={'transparent'}
                  maximumTrackTintColor={'transparent'}
                  thumbImage={soundGraphSliderThumb}
                />
            </View>
            
              <View style={[styles.spaceBetweenContainer, styles.timeContainer]}>
                <Text style={styles.timeTxt}>00:00</Text>
                <Text style={styles.timeTxt}>02:45</Text>
              </View>
              <View style={[styles.spaceBetweenContainer, styles.middleTitle]}>
                <Text style={styles.middleTitleTxt}>Saved</Text>
                <View style={styles.searchIconContainer}>
                  <Image source={searchIcon} style={styles.searchIcon} />
                </View>
              </View>
              <View>
                {renderSavedDeckList()}
              </View>
          </View>
          :
          <View style={styles.emptyDeckContent}>
              <View style={styles.centerContainer}>
                <Text style={styles.emptyDeckTitle}>
                  You currently have no saved cards.
                </Text>
                <Text style={styles.emptyDeckSubTitle}>
                  When you find a card you like, hit the like button and it will automatically appear here.
                </Text>
              </View>
          </View>
          }
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
  },
  mainImgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleWithBack: {
    flexDirection: "row",
    alignItems: 'center'
  },
  mainContent: {
    marginTop: 38,
    marginBottom: 80
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 33,
    color: '#EEECF4',
    maxWidth: 310,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
    color: '#6F6F71',
  },
  soundGraphContainer: {
    marginTop: 46,
    width: '100%',
    height: 97,
    overflow: 'hidden',
    backgroundColor: 'blue'
  },
  soundGraph: {
    width: 'auto',
    height: 97,
    resizeMode: 'cover'
  },
  audioSlider: {
    marginTop: -48.5,    
    marginLeft: -10,
    marginRight: -10,
  },
  spaceBetweenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
  },
  timeTxt: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26,
    color: '#B7B7B7'
  },
  middleTitleTxt: {
    fontSize: 24,
    fontWeight: '700'  ,
    lineHeight: 29,
    color: '#EEECF4'
  },
  timeContainer: {
    marginTop: 17,
  },
  middleTitle: {
    marginTop: 46,
  },
  searchIconContainer: {
    padding: 12,
    backgroundColor: '#323038',
    borderRadius: 9,
  },
  searchIcon: {      
    width: 20,
    height: 20,
  },
  savedDeckListItem: {
    padding: 15,
    backgroundColor: '#1D1B21',
    borderRadius: 12,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectedListItem: {
    borderWidth: 1,
    borderColor: '#FFF960',
  },
  selectedItemTitle: {
    color: '#FFF960',
  },
  savedDeckListItemTxtContainer: {

  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    color: '#BBBBBB',
    maxWidth: 200,
  },
  itemTimeTxt: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 26,
    color: '#817F86'
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  savedDeckPlayIcon: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 10,
    marginLeft: 25
  },
  emptyDeckContent: {
    flex: 1,
    height: Dimensions.get("window").height - 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyDeckTitle: {
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '600',
    textAlign: 'center',
    color: '#F4F4F4',
    maxWidth: 320,
  },
  emptyDeckSubTitle: {
    marginTop: 21,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#968FA4',
    maxWidth: 247,
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const SavedDeck = connect(mapStateToProps, { })(
  _SavedDeck
);

export default SavedDeck;

