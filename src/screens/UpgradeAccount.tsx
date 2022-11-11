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
import freePlanIcon from "../assets/common/freePlanIcon.png";
import freePlanActiveIcon from "../assets/common/freePlanActiveIcon.png";
import premiumPlanIcon from "../assets/common/premiumPlanIcon.png";
import premiumPlanActiveIcon from "../assets/common/premiumPlanActiveIcon.png";
import starPlanIcon from "../assets/common/starPlanIcon.png";
import starPlanActiveIcon from "../assets/common/starPlanActiveIcon.png";
import mostPopularPlanIcon from "../assets/common/mostPopularPlanIcon.png";
import cardDeck from "../assets/common/cardDeck.png";
import jojo from "../assets/common/jojo.png";
import  listItemIcon from "../assets/common/listItemIcon.png"
import savedDeckPlayICon from "../assets/deck/savedDeckPlayICon.png"
import { NavigationScreenProp } from "react-navigation";
import { HomeOption } from "../types";
import { connect } from "react-redux";
import {ApplicationState} from "../redux";
import BottomNavigator from "./component/BottomNavigator";
import addIcon from '../assets/common/addIcon.png'
import { AntDesign , Entypo, FontAwesome  } from '@expo/vector-icons'; 
import subscribeIcon from "../assets/common/subscribeIcon.png"


interface Props {
  options: [HomeOption];
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}

const _UpgradeAccount: React.FC<Props> = (props: Props) => { 
  
  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const [selectedPlan, setSelectedPlan] = useState('');  

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
              Upgrade Account
            </Text>
            <Text style={styles.subTitle}>
              Premium upgrade to unlock more decks and features.
            </Text>
            
            <View style={[styles.spaceBetweenContainer, styles.middleTitle]}>
              <Text style={styles.middleTitleTxt}>Choose Plan:</Text> 
              <View style={styles.titleWithBack}>
                <Text style={styles.curPlanTxt}>Most Popular</Text>
                <Image source={mostPopularPlanIcon}  style={styles.mostPopularPlanIcon} />
              </View>               
            </View>
            <View>
              <TouchableOpacity 
                onPress={() => setSelectedPlan('free')}
                style={[styles.savedDeckListItem, selectedPlan == 'free' && styles.selectedListItem]} >
                <Image source={selectedPlan == 'free' ? freePlanActiveIcon :freePlanIcon} style={styles.planIcon} />
                <View style={styles.savedDeckListItemTxtContainer}>
                  <View>
                    <Text style={[styles.itemTitle, selectedPlan == 'free' && styles.selectedItemTitle]} 
                          numberOfLines={1} ellipsizeMode='tail' >
                            Free
                    </Text>
                    <Text style={[styles.itemTimeTxt, selectedPlan == 'free' && styles.selectedItemTimeTxt]}>Forever</Text>
                  </View>                  
                </View>
              </TouchableOpacity>
              {selectedPlan == 'free' &&
              <View style={styles.featureContainer}>
                <Text style={styles.featureTxt}>Features:</Text>
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Access Free Decks</Text>
                </View>
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Create Your Own Decks</Text>
                </View> 
                <View style={styles.continueBtnContainer}>                  
                  <TouchableOpacity onPress={()=>console.log('pressed')} style={styles.continueBtn} >
                    <Image source={subscribeIcon} style={styles.subscribeIcon} />
                    <Text style={styles.continueBtnTxt}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
              }
              <TouchableOpacity 
                onPress={() => setSelectedPlan('star')}
                style={[styles.savedDeckListItem, selectedPlan == 'star' && styles.selectedListItem]} >
                <Image source={selectedPlan == 'star' ? starPlanActiveIcon : starPlanIcon} style={styles.planIcon} />
                <View style={styles.savedDeckListItemTxtContainer}>
                  <View>
                    <Text style={[styles.itemTitle, selectedPlan == 'star' && styles.selectedItemTitle]} 
                          numberOfLines={1} ellipsizeMode='tail' >
                            Star
                    </Text>
                    <Text style={[styles.itemTimeTxt, selectedPlan == 'star' && styles.selectedItemTimeTxt]}>Monthly</Text>
                  </View>
                  <Text style={[styles.priceTxt, selectedPlan == 'star' && styles.selectedItemTitle]}>$50</Text>
                </View>
              </TouchableOpacity>
              {selectedPlan == 'star' &&
              <View style={styles.featureContainer}>
                <Text style={styles.featureTxt}>Features:</Text>
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>No Ads</Text>
                </View>
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Full Access to all Decks</Text>
                </View> 
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Offline Mode</Text>
                </View> 
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Unlock Premium Features</Text>
                </View> 
                <View style={styles.continueBtnContainer}>                  
                  <TouchableOpacity onPress={()=>console.log('pressed')} style={styles.continueBtn} >
                    <Image source={subscribeIcon} style={styles.subscribeIcon} />
                    <Text style={styles.continueBtnTxt}>Subscribe</Text>
                  </TouchableOpacity>
                </View>
              </View>
              }
              <TouchableOpacity 
                onPress={() => setSelectedPlan('premium')}
                style={[styles.savedDeckListItem, selectedPlan == 'premium' && styles.selectedListItem]} >
                {selectedPlan == 'premium' &&<Text style={styles.discountTxt}>-72%</Text> }
                <Image source={selectedPlan == 'premium' ? premiumPlanActiveIcon : premiumPlanIcon} style={styles.planIcon} />
                <View style={styles.savedDeckListItemTxtContainer}>
                  <View>
                    <Text style={[styles.itemTitle, selectedPlan == 'premium' && styles.selectedItemTitle]} 
                          numberOfLines={1} ellipsizeMode='tail' >
                            Premium
                    </Text>
                    <Text style={[styles.itemTimeTxt, selectedPlan == 'premium' && styles.selectedItemTimeTxt]}>Yearly</Text>
                  </View>
                  <Text style={[styles.priceTxt, selectedPlan == 'premium' && styles.selectedItemTitle]}>$100</Text>
                </View>
              </TouchableOpacity>
              {selectedPlan == 'premium' &&
              <View style={styles.featureContainer}>
                <Text style={styles.featureTxt}>Features:</Text>
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>No Ads</Text>
                </View>
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Full Access to all Decks</Text>
                </View> 
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Offline Mode</Text>
                </View> 
                <View style={styles.featureItem}>
                  <Image source={listItemIcon} style={styles.listItemIcon} />
                  <Text style={styles.listItemTxt}>Unlock Premium Features</Text>
                </View> 
                <View style={styles.continueBtnContainer}>                  
                  <TouchableOpacity onPress={()=>console.log('pressed')} style={styles.continueBtn} >
                    <Image source={subscribeIcon} style={styles.subscribeIcon} />
                    <Text style={styles.continueBtnTxt}>Subscribe</Text>
                  </TouchableOpacity>
                </View>
              </View>
              }
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
  spaceBetweenContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',    
  },
  middleTitleTxt: {
    fontSize: 20,
    fontWeight: '700'  ,
    lineHeight: 33,
    color: '#EEECF4'
  },
  middleTitle: {
    marginTop: 46,
  },
  savedDeckListItem: {
    padding: 15,
    backgroundColor: '#1D1B21',
    borderRadius: 12,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  discountTxt: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    position: 'absolute',
    top: -12,
    right: 40,
    backgroundColor: '#FD5828',
    borderRadius: 20
  },
  selectedListItem: {
    backgroundColor: '#FF8718'
  },
  selectedItemTitle: {
    color: 'white',
  },
  savedDeckListItemTxtContainer: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
    color: '#47454A',
    maxWidth: 200,
  },
  itemTimeTxt: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 24,
    color: '#47454A'
  },
  selectedItemTimeTxt: {
    color: '#FFE3B9'
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
  },
  subTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
    color: '#AEADAF',
    marginTop: 24,
  }, 
  curPlanTxt: {
    fontSize: 20,
    lineHeight: 33,
    fontWeight: '700',
    color: '#FFF960',
    marginLeft: 10,
    marginRight: 10,
  },
  mostPopularPlanIcon: {
    width: 34,
    height: 29,
    resizeMode: 'contain'
  },
  planIcon: {
    width: 65,
    height: 65,
    resizeMode: 'cover'
  },
  priceTxt: {
    fontSize: 27,
    fontWeight: '700',
    color: '#47454A',
  },
  featureContainer: {
    marginTop: 53,
  },
  featureTxt: {
    fontSize: 20,
    lineHeight: 33,
    fontWeight: '700',
    color: '#EEECF4',
    marginBottom: 28,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemIcon: {
    width: 14,
    height: 14,
    resizeMode: 'cover'
  },
  listItemTxt: {
    fontSize: 18,
    lineHeight: 33,
    fontWeight: '600',
    color: '#959598',
    marginLeft: 19,
  },
  continueBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtn: {
    marginTop: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 183,
    height: 55,
    padding: 9,
    borderRadius: 30,
    backgroundColor: '#FF8C22'
  },
  subscribeIcon: {
    width: 34,
    height: 34,
    resizeMode: 'cover'
  },
  continueBtnTxt: {
    flex: 1,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const UpgradeAccount = connect(mapStateToProps, { })(
  _UpgradeAccount
);

export default UpgradeAccount;

