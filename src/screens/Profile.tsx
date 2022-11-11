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
import mainBg from "../assets/mainBg.png";
import profileBg from "../assets/profile/profileBg.png";
import profileImg from "../assets/common/jojo.png"
import profileCheckIcon from "../assets/common/profileCheckIcon.png"
import ticktokIcon from "../assets/common/ticktokIcon.png"
import youtubuIcon from "../assets/common/youtubuIcon.png"
import twitterIcon from "../assets/common/twitterIcon.png"
import { connect } from "react-redux";
import {ApplicationState} from "../redux";
import { NavigationScreenProp } from "react-navigation";
import BottomNavigator from "./component/BottomNavigator";
import addIcon from '../assets/common/addIcon.png'
import { AntDesign , Entypo, MaterialIcons } from '@expo/vector-icons'; 
import cardDeck from "../assets/common/cardDeck.png";
import jojo from "../assets/common/jojo.png";
import  videoDeckImg from "../assets/common/videoDeckImg.png"
import Slider from '@react-native-community/slider';

const totalStars = 5;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'てもいいです か? Mite ',
    deckImg: cardDeck,
    profileImg: jojo,
    ratingCount: 3,
    totalCardCount: 14,
    progressCardCount: 9,
    deckType: 'Casual'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'てもいいですか?',
    deckImg: cardDeck,
    profileImg: jojo,
    ratingCount: 4,
    totalCardCount: 9,
    progressCardCount: 4,
    deckType: 'Formal'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'こんにちは私 はあなた mite',
    deckImg: cardDeck,
    profileImg: jojo,
    ratingCount: 5,
    totalCardCount: 10,
    progressCardCount: 6,
    deckType: 'Course For Agenx'
  },
];

const videDeckData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'てもいいです か? Mite ',
    deckImg: videoDeckImg,
    profileImg: jojo,
    ratingCount: 3,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'てもいいですか?',
    deckImg: videoDeckImg,
    profileImg: jojo,
    ratingCount: 4,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'こんにちは私 はあなた mite',
    deckImg: videoDeckImg,
    profileImg: jojo,
    ratingCount: 5,
  },
];

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}


const _Profile: React.FC<Props> = (props: Props) => { 
 
  const [selectedTab, setSelectedTab] = useState('savedDecks')

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
  }

 

  const renderItem = ({ item} : {item: any}) => (
    <TouchableOpacity style={styles.item} onPress={()=>{handleNavigate('deckDetail')}}>
      <ImageBackground 
        source={item.deckImg} 
        resizeMode="cover"      
        style={styles.deckItemBg}   
        imageStyle={{ borderRadius: 11, height: 141, flex: 1}} >
         
            <View style={styles.starContainer}>
              <View style={styles.starContent}>
                {
                  Array.from({length: item.ratingCount}, (x, i) => {
                  return(
                    <MaterialIcons key={i} name="star" size={16} color="#FFA000"/>
                  )
                  })
                }
                {
                  Array.from({length: totalStars-item.ratingCount}, (x, i) => {
                  return(
                    <MaterialIcons key={i} name="star-border" size={16} color="#FFA000" />
                  )
                  })
                }
              </View>
            </View>
            <View style={styles.deckcardBottomView}>
              <Image source={jojo}  style={styles.profileImg} />
              <Text style={styles.deckItemTitle}>{item.title}</Text>
            </View>   
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderVideoDeckItem = ({ item} : {item: any}) => (
    <TouchableOpacity style={styles.videoDeckitem} onPress={()=>{handleNavigate('videoDeckDetail')}}>
      <ImageBackground 
        source={item.deckImg} 
        resizeMode="cover"      
        style={styles.deckItemBg}   
        imageStyle={{ borderRadius: 20, height: 215, flex: 1}} >         
            <View style={styles.starContainer}>
              <View style={styles.starContent}>
                {
                  Array.from({length: item.ratingCount}, (x, i) => {
                  return(
                    <MaterialIcons key={i} name="star" size={28} color="#FFA000"/>
                  )
                  })
                }
                {
                  Array.from({length: totalStars-item.ratingCount}, (x, i) => {
                  return(
                    <MaterialIcons key={i} name="star-border" size={28} color="#FFA000" />
                  )
                  })
                }
              </View>
            </View>
            <View style={styles.videoDeckTitleContent}>
              <Text style={styles.videDeckTitleTxt}>Deadsquad VII - End game today</Text>
            </View>
            <View style={styles.videoDeckcardBottomView}>
              <View style={styles.leftSection}>
                <Image source={jojo}  style={styles.vieoDeckProfileImg} />
                <View style={styles.leftTextSection}>
                  <View style={styles.nameAndIcon}>
                    <Text style={styles.profileName}>Claire</Text>
                    <Image source={profileCheckIcon} style={styles.profileCheckIcon} />
                  </View>
                  <Text style={styles.flashcardCount}>500 Flashcards</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>console.log('pressed')} style={styles.profileBtn}>
                <Text style={styles.profileTxt}>{'Profile'}</Text>
              </TouchableOpacity>              
            </View>   
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderInProgressDecks = () => {
    return (
      DATA.map((item: any, index: number) => {
        return( 
          <View style={styles.inprogressItem} key={index}>
            <Image source={item.deckImg} style={styles.inprogressDeckImg} />
            <View style={styles.inprogressItemContent}>
              <View style={styles.titleAndCardsCount}>
                <Text style={styles.inprogressDeckTitle} numberOfLines={1} ellipsizeMode='tail' >{item.title}</Text>
                <Text style={styles.cardCount}>{item.progressCardCount + '/' + item.totalCardCount} Cards</Text>
              </View>
              <Text style={styles.deckType}> {item.deckType}</Text>
              <View style={styles.cardsProgressBar}>
                <Slider
                    style={styles.progressSlider}
                    minimumValue={0}
                    maximumValue={100}
                    value={item.progressCardCount*100/item.totalCardCount}                    
                    minimumTrackTintColor={'#FFF960'}
                    maximumTrackTintColor={'#465063'}
                    thumbTintColor={'#FFF96058'}
                  />
                <Text style={styles.progressPercentTxt}>{Math.round(item.progressCardCount*100/item.totalCardCount) + '%'}</Text>
              </View>
            </View>
          </View>
        )
      })         
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <ImageBackground source={profileBg} resizeMode="cover" style={styles.profileBgImg}>
            <View style={styles.titleWithBack}>
              <TouchableOpacity onPress={()=> props.navigation.goBack()}>
                <AntDesign name="arrowleft" size={31} color="white" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={styles.mainContent}>
            <View>
              <Image source={profileImg} style={styles.bigProfileImg} />
            </View>
            <View style={styles.titleContainer}>
              <View style={styles.titleWithIcon}>
                <Text style={styles.profileTitle}>Claire Green</Text>
              </View>
            </View>
            <View style={[styles.rowContent, styles.tabbtnCotainer]}>
              <TouchableOpacity 
                onPress={() => setSelectedTab('mydecks')} 
                style={[styles.rowContent, styles.tabBtn]}>
                  <Text style={[styles.tabTxt, selectedTab == 'mydecks' && styles.activeTabColor]}>My Decks</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setSelectedTab('inprogress')} 
                style={[styles.rowContent, styles.tabBtn]}>
                  <Text style={[styles.tabTxt, selectedTab == 'inprogress' && styles.activeTabColor]}>In Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setSelectedTab('savedDecks')} 
                style={[styles.rowContent, styles.tabBtn]}>
                  <Text style={[styles.tabTxt, selectedTab == 'savedDecks' && styles.activeTabColor]}>Saved Decks</Text>
              </TouchableOpacity>
            </View>
            {selectedTab == 'mydecks' &&
            <View>
              <View style={styles.deckListContent}>
                <Text style={styles.deckTitle}>Card Decks</Text>
                <View style={styles.deckList}>
                  <FlatList
                      nestedScrollEnabled 
                      data={DATA}
                      renderItem={renderItem}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      style={{height: 160}}
                    />
                </View>
              </View>
              <View style={[styles.deckListContent, styles.videoDeckListContent]}>
                <Text style={styles.deckTitle}>Video Decks</Text>
                <View style={styles.deckList}>
                    <FlatList
                      nestedScrollEnabled 
                      data={videDeckData}
                      renderItem={renderVideoDeckItem}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      style={{height: 215}}
                    />
                </View>            
              </View>
            </View>
            }
            {selectedTab == 'inprogress' && 
            <View>
              {/* <Text style={styles.deckTitle}>Card Decks</Text> */}
              {renderInProgressDecks()}
              <Text style={styles.inprogressTitle}>Videos</Text>
              {renderInProgressDecks()}
            </View>
            }
            {selectedTab =='savedDecks' && 
            <View>
              {DATA.length > 5 ?
              <View>
                <View style={styles.deckListContent}>
                  <Text style={styles.deckTitle}>Card Decks</Text>
                  <View style={styles.deckList}>
                    <FlatList
                        nestedScrollEnabled 
                        data={DATA}
                        renderItem={renderItem}
                        horizontal={true}
                        keyExtractor={item => item.id}
                        style={{height: 160}}
                      />
                  </View>
                </View>
                <View style={[styles.deckListContent, styles.videoDeckListContent]}>
                  <Text style={styles.deckTitle}>Video Decks</Text>
                  <View style={styles.deckList}>
                      <FlatList
                        nestedScrollEnabled 
                        data={videDeckData}
                        renderItem={renderVideoDeckItem}
                        horizontal={true}
                        keyExtractor={item => item.id}
                        style={{height: 215}}
                      />
                  </View>            
                </View>
              </View>
              : 
              <View style={styles.emptyDeckContent}>
                <Text style={styles.emptyDeckTitle}>
                  You haven’t created any decks yet.
                </Text>
                <Text style={styles.emptyDeckSubTitle}>
                  It is easy to do, let’s get started.
                </Text>
              </View>
              }
            </View>
            }
          </View>
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
  },
  mainImgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleWithBack: {
    flexDirection: "row",
    alignItems: 'center'
  },
  profileBgImg: {
    height: 228,
    resizeMode: 'cover'
  },
  mainContent: {
    padding: 20,
    paddingTop: 0,
    marginTop: -50,
  },
  bigProfileImg: {
    width: 94,
    height: 94,
    resizeMode: 'contain',
    borderRadius: 60,
    borderWidth: 7,
    borderColor: '#1C152A'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  titleWithIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 18,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 35,
    color: '#ffffff',
    paddingRight: 10,
  },
  bigProfileCheckIcon: {
    width: 24,
    height: 23,
    resizeMode: 'contain'
  },
  socialBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  socialIcon: {
    width: 40, 
    height: 40,
    resizeMode: 'contain'
  },
  followersTxt: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#FFCE47'
  },
  
  deckListContent: {
    marginTop: 32,
  },
  videoDeckListContent: {
    paddingBottom: 100
  },
  deckTitle: {
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 33.5,
    color: 'white'
  },
  deckList: {
    marginTop: 24,
  },  
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    width: 122,
    height: 141,
    borderRadius: 11,
  },
  videoDeckitem: {
    marginVertical: 8,
    marginHorizontal: 16,
    width: 279,
    height: 215,
    borderRadius: 11,
  },
  title: {
    fontSize: 32,
  },
  starContainer: {
    justifyContent: 'flex-end',
    alignItems : "flex-end",
    alignSelf: 'flex-end',
    paddingTop: 8,
    paddingRight: 4,
  },
  starContent: {
    flexDirection : "row",    
    backgroundColor: '#131215BF',
    paddingRight: 3,
    paddingLeft: 3,
    borderRadius: 24,
  },
  deckcardBottomView: {
    flexDirection: 'row',
    backgroundColor: '#482C7E66',
    padding: 4,
    alignItems:'center',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  videoDeckcardBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#392364',
    justifyContent: 'space-between',
    padding: 17,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  vieoDeckProfileImg: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  deckItemTitle: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: 'white',
    width: 78,
    marginLeft: 4,
  },
  deckItemBg: {
    flex:1,
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection:'row',
    alignItems: 'center'
  },
  leftTextSection: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '600',
    marginRight: 5,
    color: 'white'
  },
  profileCheckIcon: {
    width: 19,
    height: 18,
    resizeMode: 'contain'
  },
  nameAndIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flashcardCount: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
    color: '#CAC5D6'
  },
  profileBtn: {
    backgroundColor: '#38C3FF',
    borderRadius: 24,
  },
  profileTxt: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    color: '#ffffff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 17,
    paddingRight: 17,
  },  
  videoDeckTitleContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 13,
  },
  videDeckTitleTxt: {
    minHeight: 40,
    maxWidth: 140,
    marginBottom: 10,
    color: '#F1EEF8',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tabbtnCotainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 14,
    maxWidth: 332,
    marginTop: 34,
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
  inprogressItem: {
    flexDirection: 'row',
    marginTop: 18,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#1D1B21'
  },
  inprogressDeckImg: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  inprogressItemContent: {
    marginLeft: 17,
    flex: 1,
  },
  titleAndCardsCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inprogressDeckTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: 'white',
    maxWidth: 170,
  },
  cardCount: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    color: '#6B7488'
  },
  deckType: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    color: '#6B7488'
  },
  cardsProgressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 178,
  },
  progressPercentTxt: {    
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: '#FFF960'
  },
  progressSlider: {
    flex: 1,
    marginLeft: -10,
  },
  inprogressTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    color: '#ffffff',
    marginTop: 18,
  },
  emptyDeckContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyDeckTitle: {
    marginTop: 74,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '600',
    textAlign: 'center',
    color: '#F4F4F4'
  },
  emptyDeckSubTitle: {
    marginTop: 21,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#968FA4',
    maxWidth: 247,
    marginBottom: 80
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const Profile = connect(mapStateToProps, { })(
  _Profile
);

export default Profile;
