import React, {useRef, useState } from "react";
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
  Animated,
} from "react-native";
import mainBg from "../../assets/mainBg.png";
import shareIcon from "../../assets/common/shareIcon.png";
import spotifyIcon from "../../assets/common/spotifyIcon.png"
import cardDeck from "../../assets/common/cardDeck.png";
import jojo from "../../assets/common/jojo.png";
import  electronIcon from "../../assets/common/electronIcon.png"
import profileCheckIcon from "../../assets/common/profileCheckIcon.png"
import { NavigationScreenProp } from "react-navigation";
import { HomeOption } from "../../types";
import { MaterialIcons ,AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import playIcon from '../../assets/common/playIcon.png'
import Carousel from 'react-native-reanimated-carousel';
import { Video } from 'expo-av';

const totalStars = 5;
const deviceWidth = Dimensions.get('window').width;

interface Props {
  options: [HomeOption];
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}
const deckCardList = [
  {
    uid: 'diendienco20437dn',
    cardTxt: '1こんにちは私はあなたを救うためにここにいる?',    
  },
  {
    uid: 'diendienco20437dn4',
    cardTxt: '2こんにちは私はあなたを救うためにここにいる?',    
  },
  {
    uid: 'diendienco20437dn2',
    cardTxt: '3こんにちは私はあなたを救うためにここにいる?',    
  },
  {
    uid: 'diendienco20437dn3',
    cardTxt: '4こんにちは私はあなたを救うためにここにいる?',    
  },
]
const _VideoDeckDetail: React.FC<Props> = (props: Props) => { 
  React.useEffect(() => {  
    props.isSavePlayDeck.then((isSavePlayDeck:boolean) => {
      if(isSavePlayDeck) saveData()
    })
  });
  const [selectDescTab, setSelectDescTab] = useState(true)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const saveData = () => {
    console.log('save button clicked in homepage')
  }
  
  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <View style={[styles.spaceBetweenRow, styles.titleWithBack]}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={31} color="white" />
            </TouchableOpacity>
            <Image source={shareIcon} style={styles.shareIconStyle} />
          </View>
          <View style={styles.deckImgContent}>
            <Video
              style={styles.cardDeckImg}
              source={{
                uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}        
              useNativeControls      
              resizeMode={"cover"}
          />
          </View>
          <View style={[styles.spaceBetweenRow, styles.marginTop27]}>
              <View style={styles.rowContent}>
                <Image source={electronIcon} style={styles.electronIcon} />
                <Text style={styles.favCountTxt}>77 Cards</Text>
              </View>
              <Text style={styles.cardTypeTxt}>Music</Text>
          </View>
          <Text style={styles.deckTitleTxt}>
            The Beautiful and Largest Hawaiian Island 
          </Text>
          <View style={[styles.rowContent, styles.marginTop27]}>
            <View style={[styles.rowContent, styles.tabbtnCotainer]}>
              <TouchableOpacity 
                onPress={() => setSelectDescTab(true)} 
                style={[styles.rowContent, styles.tabBtn]}>
                  <Text style={[styles.tabTxt, selectDescTab && styles.activeTabColor]}>Description</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setSelectDescTab(false)} 
                style={[styles.rowContent, styles.tabBtn]}>
                  <Text style={[styles.tabTxt, !selectDescTab && styles.activeTabColor]}>Preview</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.spotifyContainer}>
              <TouchableOpacity 
                onPress={() => console.log('edit')} 
                >
                  <Image source={spotifyIcon} style={styles.spotifyIcon} />
              </TouchableOpacity>
            </View>
            
                       
          </View>
          <View style={styles.marginBottom80}>
            {selectDescTab ?
            <View>
              <View style={[styles.rowContent, styles.marginTop27, {justifyContent: 'space-between'}]}>
                <View style={styles.rowContent}>
                  <Image source={jojo} style={styles.userProfileImg} />
                  <Text style={styles.creatorNameTxt}>Claire Green</Text>
                </View>
                <View style={[styles.rowContent, styles.tabbtnCotainer, {justifyContent: 'flex-end'}]}>
                  <TouchableOpacity 
                    onPress={() => console.log('edit')} 
                    style={[styles.rowContent, styles.tabBtn, {alignItems: 'center', paddingLeft: 20, paddingRight: 20, marginRight: 10}]}>
                      <FontAwesome name="pencil-square-o" size={11} color="white" />
                      <Text style={[styles.tabTxt,{marginLeft: 3, color: 'white'}]}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => console.log('delete')} 
                    style={[styles.rowContent, styles.tabBtn, {paddingTop: 10, paddingBottom: 10}]}>
                      <Ionicons name="md-trash-outline" size={15} color="white" />
                  </TouchableOpacity>
                </View>     
              </View>
              <View style={styles.marginTop27}>
                <Text style={styles.deckDescTxt}>
                  The third largest Hawaiian island is home to the majority of Hawaii’s diverse population, a fusion of East and West cultures rooted in the values and traditions of the Native Hawaiian people. 

                  It’s this fundamental contrast between the ancient and the modern that makes discovering Oahu — from bustling city life to laidback surf towns — so enjoyable
                </Text>
              </View>
            </View>
            : <View style={styles.marginTop27}>
              <Carousel
                  style={{
                    width: '100%',
                    height: 270,
                    justifyContent: 'center',
                  }}
                  width={165}
                  height={250}
                  pagingEnabled={true}
                  snapEnabled={true}
                  vertical={false}
                  // mode={'horizontal-stack'}
                  loop={true}
                  autoPlay={false}
                  autoPlayReverse={false}
                  data={deckCardList}
                  onSnapToItem={(index) => setActiveCardIndex(index)}
                  // modeConfig={{
                  //     snapDirection: 'left',
                  //     stackInterval: 18,
                  // }}
                  // customConfig={() => ({ type: 'positive', viewCount: 3 })}
                  renderItem={({ item, index }) => (
                      <View
                        key={index}
                          style={[styles.sliderContentItem, index == activeCardIndex && styles.activesliderContentItem]}
                      >
                          <Text style={[styles.sliderCardTxt, index == activeCardIndex && styles.activeCardTxt]}>
                              {item.cardTxt}
                          </Text>
                      </View>
                  )}
              />
            </View>
            }
          </View>
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={playIcon}
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
  starContainer: {
    justifyContent: 'center'
  },
  starContent: {
    flexDirection : "row",   
  },  
  spaceBetweenRow: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWithBack: {
    marginTop: 30,
  },
  shareIconStyle: {
    width: 23,
    height: 23,
    resizeMode: 'contain'
  },
  deckImgContent: {

  },
  cardDeckImg: {
    width: 'auto',
    height: 203,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 42,
  },
  marginTop27: {
    marginTop: 27,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  favCountTxt: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    color: 'white',
    marginLeft: 9,
  },
  cardTypeTxt: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    color: '#FFF960'
  },
  deckTitleTxt: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 34,
    color: 'white',
    marginTop: 26,
  },
  tabBtn: {
    backgroundColor: '#26273F',
    borderColor: '#3A3B51',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  tabTxt: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.8,
    color: '#A0A0AB',
  },
  activeTabColor: {
    color: '#FFF960'
  },
  tabbtnCotainer: {
    flex: 7,
    justifyContent: 'space-between',
    paddingRight: 14,
    maxWidth: 200,
  },
  userProfileImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  creatorNameTxt: {
    marginLeft: 11,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: 'white'
  },
  deckDescTxt: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25,
    color: '#C3C3CA',    
  },
  marginBottom80: {
    marginBottom: 80,
  },
  sliderContentItem: {
    marginVertical: 30,
    // marginHorizontal: 2,
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    justifyContent: 'center',    
    width: 118,
    height: 190,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  activesliderContentItem: {
    marginVertical: 10,
    // marginHorizontal: 2,
    width: 145,
    height: 230,
  },
  sliderCardTxt: {
    fontSize: 13.7,
    fontWeight: '400',
    lineHeight: 25,
    textAlign: 'center',
  },
  activeCardTxt: {
    fontSize: 17,
  },
  spotifyIcon: {
    width: 119,
    height: 35,
    resizeMode: 'cover'
  },
  spotifyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  electronIcon: {
    width: 17,
    height: 22,
    resizeMode: 'contain'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const VideoDeckDetail = connect(mapStateToProps, { })(
  _VideoDeckDetail
);

export default VideoDeckDetail;
