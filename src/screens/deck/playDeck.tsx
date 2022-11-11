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
import cardSettingIcon from "../../assets/deck/cardSettingIcon.png";
import notHappyIcon from "../../assets/deck/notHappyIcon.png"
import hardIcon from "../../assets/deck/hardIcon.png"
import happyIcon from "../../assets/deck/happyIcon.png";
import notHappyEmptyIcon from "../../assets/deck/notHappyEmptyIcon.png"
import hardEmptyIcon from "../../assets/deck/hardEmptyIcon.png"
import happyEmptyIcon from "../../assets/deck/happyEmptyIcon.png";
import transIcon from "../../assets/deck/transIcon.png";
import transActiveIcon from "../../assets/deck/transActiveIcon.png";
import notesActiveIcon from "../../assets/deck/notesActiveIcon.png";
import notesIcon from "../../assets/deck/notesIcon.png";

import { NavigationScreenProp } from "react-navigation";
import { HomeOption } from "../../types";
import { MaterialIcons ,AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import soundIcon from '../../assets/common/soundIcon.png'
import Carousel from 'react-native-reanimated-carousel';
import CustomModal from "../component/CustomModal";

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
    noteTxt: '1noteTxt here'
  },
  {
    uid: 'diendienco20437dn4',
    cardTxt: '2こんにちは私はあなたを救うためにここにいる?',        
    noteTxt: '2noteTxt here'
  },
  {
    uid: 'diendienco20437dn2',
    cardTxt: '3こんにちは私はあなたを救うためにここにいる?',       
    noteTxt: '3noteTxt here' 
  },
  {
    uid: 'diendienco20437dn3',
    cardTxt: '4こんにちは私はあなたを救うためにここにいる?',        
    noteTxt: '4noteTxt here'
  },
]
const _PlayDeck: React.FC<Props> = (props: Props) => { 
 
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isHaveRateVal, setIsHaveRateVal] = useState(true)
  const [transActive, setTransActive] = useState(true)
  const [isFinishCard, setIsFinishCard] = useState(true)
  const [ratingCount, setRatingCount] = useState(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

   
  const centeralIconClicked = () => {
    handleNavigate('playDeck')
  }
  const ratingClicked = (ratingVal: number) => {
    setRatingCount(ratingVal)
    setShowConfirmDialog(true)
  }
  const replayDeck = () => {
    setShowConfirmDialog(false)
  }
  const exitModal = () => {
    setShowConfirmDialog(false)
  }

  const renderSuccessModalTxtContent = () => {
    return (
      <View style={styles.modalTxtContent}>
        <Text style={styles.modalContentTxt}>
            Thank you for  
          <Text style={[styles.modalContentTxt, styles.successColorTxt]}> rating </Text>
            this deck
        </Text>        
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <View style={[styles.spaceBetweenRow, styles.titleWithBack]}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={31} color="white" />
            </TouchableOpacity>
            {!isFinishCard &&
            <TouchableOpacity onPress={() => handleNavigate('deckCardRateSetting')} >
              <Image source={cardSettingIcon} style={styles.shareIconStyle} />
            </TouchableOpacity>
            }
          </View>
          {!isFinishCard ?
          <View style={styles.marginBottom80}>
            <View style={styles.marginTop27}>
              <Carousel
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                  }}
                  width={314}
                  height={Dimensions.get('window').height - 320}
                  pagingEnabled={true}
                  snapEnabled={true}
                  vertical={false}
                  mode={'horizontal-stack'}
                  loop={false}
                  autoPlay={false}
                  autoPlayReverse={false}
                  data={deckCardList}
                  onSnapToItem={(index) => setActiveCardIndex(index)}
                  modeConfig={{
                      snapDirection: 'left',
                      stackInterval: 18,
                  }}
                  customConfig={() => ({ type: 'positive', viewCount: 5 })}
                  renderItem={({ item, index }) => (
                      <View
                        key={index}
                          style={[styles.sliderContentItem]}
                      >
                        <View style={styles.sliderTxtContent}> 
                          <Text style={[styles.sliderCardTxt]}>
                              {transActive ? item.cardTxt : item.noteTxt}
                          </Text>
                        </View>
                        <View style={styles.cardBtnCotainer}>
                          <TouchableOpacity style={[styles.cardBtn, styles.transBtn, transActive && styles.activeCardBtn]} onPress={()=>setTransActive(true)}>
                            <Text style={[styles.cardBtnTxt, transActive && styles.activeCardBtnTxt]}>Translate</Text>
                            <Image source={transActive ? transActiveIcon : transIcon} style={styles.transIcon} />
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.cardBtn, styles.notesBtn, !transActive && styles.activeCardBtn]} onPress={()=>setTransActive(false)}>
                            <Text style={[styles.cardBtnTxt, !transActive && styles.activeCardBtnTxt]}>Notes</Text>
                            <Image source={!transActive ? notesActiveIcon :notesIcon} style={styles.notesIcon} />
                          </TouchableOpacity>
                        </View>
                      </View>
                  )}
              />
            </View>       
            <View style={styles.cardRatesIconContainer}>
              <TouchableOpacity 
                onPress={()=> console.log('pressed')}
                style={styles.cardRateBtn} >
                  {isHaveRateVal &&
                  <Text style={styles.repeatValTxt}>+10</Text>
                  }
                  <Image source={isHaveRateVal ? notHappyIcon : notHappyEmptyIcon} style={styles.cardRateIcon} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=> console.log('pressed')}
                style={styles.cardRateBtn} >
                  {isHaveRateVal &&
                  <Text style={styles.repeatValTxt}>+15</Text>
                  }
                  <Image source={isHaveRateVal ? hardIcon : hardEmptyIcon} style={styles.cardRateIcon} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=> console.log('pressed')}
                style={styles.cardRateBtn} >
                  {isHaveRateVal &&
                  <Text style={styles.repeatValTxt}>+10</Text>
                  }
                  <Image source={isHaveRateVal ? happyIcon : happyEmptyIcon} style={styles.cardRateIcon} />
              </TouchableOpacity>
            </View>
          </View>
          : 
          <View style={styles.emptyDeckContent}>
              <View style={styles.centerContainer}>
                <Text style={styles.emptyDeckTitle}>
                  You have just completed the deck.
                </Text>
                <Text style={styles.emptyDeckSubTitle}>
                  Please take a moment to rate the deck, this will help our community.
                </Text>
                <View style={styles.starContainer}>
                  <View style={styles.starContent}>
                    {
                      Array.from({length: ratingCount}, (x, i) => {
                      return(
                        <TouchableOpacity onPress={()=>ratingClicked(i + 1 )} key={i}>
                          <MaterialIcons key={i} name="star" size={32} color="#FFA000"/>
                        </TouchableOpacity>
                        
                      )
                      })
                    }
                    {
                      Array.from({length: totalStars - ratingCount}, (x, i) => {
                      return(
                        <TouchableOpacity onPress={()=>ratingClicked(i+1 + ratingCount )} key={i}>
                          <MaterialIcons key={i} name="star-border" size={32} color="#F4F4F4" />
                        </TouchableOpacity>
                      )
                      })
                    }
                  </View>
                </View>
                <TouchableOpacity onPress={()=>handleNavigate('home')}>
                  <Text style={styles.skipTxt}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
          }
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={soundIcon}
          centerIconPress={centeralIconClicked}
          />
          
        <CustomModal 
          modalVisible={showConfirmDialog} 
          modalIcon={soundIcon}
          isRating={true}
          ratingVal={ratingCount}
          renderModalTxtContent={renderSuccessModalTxtContent}
          modalSubTxt={'Your feedback helps others in the community '}
          primaryBtnTxt={'Exit'}
          cancelBtnTxt={'Edit'}
          primaryAction={replayDeck}
          cancelAction={exitModal}
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
  spaceBetweenRow: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWithBack: {
    marginTop: 30,
  },
  shareIconStyle: {
    width: 31,
    height: 27,
    resizeMode: 'contain'
  },
  marginTop27: {
    marginTop: 27,
  },
  marginBottom80: {
    marginBottom: 80,
  },
  sliderContentItem: {
    margin: 10,
    padding: 20,
    width: 290,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    justifyContent: 'center',    
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  sliderTxtContent: {
    justifyContent: 'center',    
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  sliderCardTxt: {
    fontSize: 13.7,
    fontWeight: '400',
    lineHeight: 25,
    textAlign: 'center',
  },
  cardRatesIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardRateBtn: {
    position: 'relative',
    marginTop: 50,
  },
  repeatValTxt: {
    backgroundColor: '#38AB25',
    paddingVertical: 6,
    paddingHorizontal: 11,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    borderRadius: 20,
    color: 'white',
    position: 'absolute',
    zIndex: 22,
    right: -15,
    top: -30,
  },
  cardRateIcon: {
    width: 82,
    height: 82,
    resizeMode: 'contain'
  },
  notesTxt: {

  },
  cardBtnCotainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeCardBtn: {
    backgroundColor: '#5ADBED'
  },
  cardBtnTxt: {
    fontSize: 8,
    fontWeight: '700',
    lineHeight: 10,
    color: '#AAA9AE',
    marginBottom: 10,
  }, 
  cardBtn: {
    width: 120,
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEE'
  },
  transBtn: {
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  notesBtn: {
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },
  transIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain'
  },
  notesIcon: {
    width: 20,
    height: 15,
    resizeMode: 'contain'
  },
  activeCardBtnTxt: {
    color: 'white'
  },
  emptyDeckContent: {
    flex: 1,
    height: Dimensions.get("window").height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyDeckTitle: {
    fontSize: 26,
    lineHeight: 39,
    fontWeight: '600',
    textAlign: 'center',
    color: '#F4F4F4',
    maxWidth: 320,
  },
  emptyDeckSubTitle: {
    marginTop: 21,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '600',
    textAlign: 'center',
    color: '#968FA4',
    maxWidth: 247,
  },  
  starContainer: {
    paddingTop: 8,
    paddingRight: 4,
    marginTop: 65,
    marginBottom: 50,
  },
  starContent: {
    flexDirection : "row",    
    paddingRight: 3,
    paddingLeft: 3,
    borderRadius: 24,
  },
  skipTxt: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    color: 'white'
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
    color: '#FFF960'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const PlayDeck = connect(mapStateToProps, { })(
  _PlayDeck
);

export default PlayDeck;
