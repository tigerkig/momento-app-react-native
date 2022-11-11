import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
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
import creatorTabActiveIcon from '../../assets/common/creatorTabActiveIcon.png'
import creatorTabIcon from '../../assets/common/creatorTabIcon.png'
import freeTabActiveIcon from '../../assets/common/freeTabActiveIcon.png'
import freeTabIcon from '../../assets/common/freeTabIcon.png'
import premiumTabIcon from '../../assets/common/premiumTabIcon.png'
import premiumTabActiveIcon from '../../assets/common/premiumTabActiveIcon.png'
import starTabActiveIcon from '../../assets/common/starTabActiveIcon.png'
import starTabIcon from '../../assets/common/starTabIcon.png'
import addIcon from '../../assets/common/addIcon.png'
import { AntDesign , } from '@expo/vector-icons'; 
import cardDeck from "../../assets/common/cardDeck.png";
import jojo from "../../assets/common/jojo.png";
import Slider from '@react-native-community/slider';
import searchIcon from "../../assets/common/searchIcon.png";

const creatorList = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    role: 'Creator',
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    role: 'Creator',
    profileImg: jojo,
    name: 'Lily Monserrat',
    email: 'lilymontesrrat@gmail.com'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    role: 'Creator',
    deckImg: cardDeck,
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
];

const freeUserList = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    role: 'Free Account',
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    role: 'Free Account',
    profileImg: jojo,
    name: 'Lily Monserrat',
    email: 'lilymontesrrat@gmail.com'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    role: 'Free Account',
    deckImg: cardDeck,
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
];

const starUserList = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    role: 'Subscribed',
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    role: 'Subscribed',
    profileImg: jojo,
    name: 'Lily Monserrat',
    email: 'lilymontesrrat@gmail.com'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    role: 'Subscribed',
    deckImg: cardDeck,
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
];

const premiumUserList = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    role: 'Subscribed',
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    role: 'Subscribed',
    profileImg: jojo,
    name: 'Lily Monserrat',
    email: 'lilymontesrrat@gmail.com'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    role: 'Subscribed',
    deckImg: cardDeck,
    profileImg: jojo,
    name: 'Thomas Aquinis',
    email: 'thomas123@gmail.com'
  },
];

interface Props {
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}


const _UserManagement: React.FC<Props> = (props: Props) => { 
 
  const [activeTab, setActiveTab] = useState('free')
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
  }

  const renderCreators = () => {
    let DATA = activeTab == 'free' ? freeUserList : activeTab == 'star' ?  starUserList : activeTab == 'premium' ? premiumUserList : creatorList
    return (
      DATA.map((item: any, index: number) => {
        return( 
          <View style={styles.inprogressItem} key={index}>
            <Image source={item.profileImg} style={styles.inprogressDeckImg} />
            <View style={styles.inprogressItemContent}>
              <View style={styles.titleAndCardsCount}>
                <View>
                <Text style={[styles.userItemRoletxt, activeTab == 'creator' && styles.creatorTxt]} numberOfLines={1} ellipsizeMode='tail' >{item.name}</Text>
                  <Text style={styles.userItemNametxt} numberOfLines={1} ellipsizeMode='tail' >{item.name}</Text>
                  <Text style={styles.userItemEmailTxt} numberOfLines={1} ellipsizeMode='tail' >{item.email}</Text>
                </View>
                <View style={styles.rightContent}>
                  <Switch
                      trackColor={{ false: '#82848F36', true: '#5ADBED73' }}
                      thumbColor={isEnabled ? '#29AED8' : '#252A34'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  <Text style={styles.roleTxt}>{item.role}</Text>
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
          <View style={styles.searchContent}>
            <Image source={searchIcon} style={styles.searchIcon} />
            <TextInput 
              placeholder="Search Email" 
              placeholderTextColor={'#968FA4'}
              style={styles.searchTxt}/>
          </View>
          <View style={styles.mainContent}>   
            <View style={styles.tabList}>
              <TouchableOpacity style={[styles.tabListItem]}
                onPress={() => setActiveTab('free')} >
                  <Image source={activeTab == 'free' ? freeTabActiveIcon : freeTabIcon} style={styles.tabListIcon} />
                  <Text style={[styles.tabListTxt, activeTab == 'free' && styles.activeTxt]}>Free</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabListItem]}
                onPress={() => setActiveTab('star')} >
                  <Image source={activeTab == 'star' ? starTabActiveIcon : starTabIcon} style={styles.tabListIcon} />
                  <Text style={[styles.tabListTxt, activeTab == 'star' && styles.activeTxt]}>Star</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabListItem]}
                onPress={() => setActiveTab('premium')} >
                  <Image source={activeTab == 'premium' ? premiumTabActiveIcon : premiumTabIcon} style={styles.tabListIcon} />
                  <Text style={[styles.tabListTxt, activeTab == 'premium' && styles.activeTxt]}>Premium</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabListItem]}
                onPress={() => setActiveTab('creator')} >
                  <Image source={activeTab == 'creator' ? creatorTabActiveIcon : creatorTabIcon} style={styles.tabListIcon} />
                  <Text style={[styles.tabListTxt, activeTab == 'creator' && styles.activeCreatorTxt]}>Creator</Text>
              </TouchableOpacity>
            </View> 
           
            <View style={styles.tabContent}>
              {renderCreators()}
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
    alignItems: 'center',
    marginTop: 18,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#1D1B21'
  },
  inprogressDeckImg: {
    width: 71,
    height: 71,
    resizeMode: 'cover',
    borderRadius: 9,
  },
  inprogressItemContent: {
    marginLeft: 17,
    flex: 1,
  },
  titleAndCardsCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userItemRolTxt: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    color: 'white ',
    maxWidth: 170,
  },
  creatorTxt: {
    color: '#29AED8',
  },
  userItemRoletxt: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    color: '#FF8C22',
    maxWidth: 170,
  },
  userItemNametxt: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 19.5,
    color: '#ffffff',
    maxWidth: 170,
    marginTop:2,
    marginBottom: 4,
  },
  userItemEmailTxt: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    color: '#A4B0BE',
    maxWidth: 170,
  },
  rightContent: {
    justifyContent: 'center'
  },
  roleTxt: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
    color: '#47454A'
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
  },
  
  searchContent: {
    display: 'flex',
    borderWidth: 2,
    borderColor: '#A293BE',
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  searchIcon : {
    width: 23.5,
    height: 23.5,
    resizeMode: 'contain'
  },
  searchTxt: {
    flex: 1,
    marginLeft: 17,
    marginRight: 17,
    color: '#968FA4',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500'
  },
  tabList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tabListIcon: {
    width: 54,
    height: 54,
    resizeMode: 'cover'
  },
  tabListItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabListTxt: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#47454A',
    marginTop: 12,
  },
  tabContent: {
    marginTop: 40,
  },
  activeTxt: {
    color: '#FF8C22'
  },
  activeCreatorTxt: {
    color: '#29AED8'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const UserManagement = connect(mapStateToProps, { })(
  _UserManagement
);

export default UserManagement;
