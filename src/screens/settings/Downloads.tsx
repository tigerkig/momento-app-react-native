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
import downloadListIcon from "../../assets/deck/downloadListIcon.png";
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import { NavigationScreenProp } from "react-navigation";
import BottomNavigator from "../component/BottomNavigator";
import addIcon from '../../assets/common/addIcon.png'
import { AntDesign , } from '@expo/vector-icons'; 
import cardDeck from "../../assets/common/cardDeck.png";
import jojo from "../../assets/common/jojo.png";
import Slider from '@react-native-community/slider';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'てもいいです か? Mite ',
    deckImg: cardDeck,
    profileImg: jojo,
    ratingCount: 3,
    totalCardCount: 14,
    progressCardCount: 14,
    deckType: 'Casual'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'てもいいですか?',
    deckImg: cardDeck,
    profileImg: jojo,
    ratingCount: 4,
    totalCardCount: 9,
    progressCardCount: 9,
    deckType: 'Formal'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'こんにちは私 はあなた mite',
    deckImg: cardDeck,
    profileImg: jojo,
    ratingCount: 5,
    totalCardCount: 10,
    progressCardCount: 10,
    deckType: 'Course For Agenx'
  },
];

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}


const _Downloads: React.FC<Props> = (props: Props) => { 
 

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
  }

  const renderInProgressDecks = () => {
    return (
      DATA.map((item: any, index: number) => {
        return( 
          <View style={styles.inprogressItem} key={index}>
            <Image source={item.deckImg} style={styles.inprogressDeckImg} />
            <View style={styles.inprogressItemContent}>
              <View style={styles.titleAndCardsCount}>
                <Text style={styles.inprogressDeckTitle} numberOfLines={1} ellipsizeMode='tail' >{item.title}</Text>
                <Text style={styles.cardCount}>{item.totalCardCount} Cards</Text>
              </View>
              <View style={styles.titleAndCardsCount}>
                <View style={styles.container}>
                  <Text style={styles.deckType}> {item.deckType}</Text>
                  <View style={styles.cardsProgressBar}>
                    <Slider
                        style={styles.progressSlider}
                        minimumValue={0}
                        maximumValue={100}
                        value={item.progressCardCount*100/item.totalCardCount}                    
                        minimumTrackTintColor={'5ADBED '}
                        maximumTrackTintColor={'#465063'}
                        thumbTintColor={'#5ADBED58'}
                      />
                    <Text style={styles.progressPercentTxt}>{Math.round(item.progressCardCount*100/item.totalCardCount) + '%'}</Text>
                  </View>
                </View>
                <View>
                  <Image source={downloadListIcon} style={styles.downloadListIcon} />
                </View>
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
          <View style={styles.titleWithBack}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={31} color="white" />
            </TouchableOpacity>
            <Text style={styles.pgTitleTxt}>Downloads</Text>
          </View>
          <View style={styles.mainContent}>          
           
            <View>
              {renderInProgressDecks()}
              <Text style={styles.inprogressTitle}>Videos</Text>
              {renderInProgressDecks()}
            </View>
          
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
    padding: 20,
  },
  mainImgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleWithBack: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 10
  },
  pgTitleTxt: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 35,
    textAlign: 'center',
    color: '#EFEBF6',
    flex: 1,
  },
  mainContent: {    
    paddingTop: 0,
    marginTop: 50,
    marginBottom: 80,
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
    color: '#5ADBED'
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
  },
  downloadListIcon: {
    width: 20,
    height: 23,
    resizeMode: 'contain',
    marginRight: 15,
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const Downloads = connect(mapStateToProps, { })(
  _Downloads
);

export default Downloads;
