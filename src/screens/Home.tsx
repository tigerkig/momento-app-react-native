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
  Modal,
} from "react-native";
import mainBg from "../assets/mainBg.png";
import searchIcon from "../assets/common/searchIcon.png";
import searchSettingIcon from "../assets/common/searchSettingIcon.png"
import cardDeck from "../assets/common/cardDeck.png";
import jojo from "../assets/common/jojo.png";
import  videoDeckImg from "../assets/common/videoDeckImg.png"
import profileCheckIcon from "../assets/common/profileCheckIcon.png"
import searchItemActiveIcon from "../assets/common/searchItemActiveIcon.png"
import searchItemIcon from "../assets/common/searchItemIcon.png"
import upgradeBtnIcon from "../assets/deck/upgradeBtnIcon.png"
import searchLialogListIcon from '../assets/common/searchLialogListIcon.png'
import { NavigationScreenProp } from "react-navigation";
import { HomeOption } from "../types";
import { MaterialIcons } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import {ApplicationState} from "../redux";
import BottomNavigator from "./component/BottomNavigator";
import addIcon from '../assets/common/addIcon.png'

const totalStars = 5;

interface Props {
  options: [HomeOption];
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}

const WIDTH_DEVICE = Dimensions.get("window").width;

const _Home: React.FC<Props> = (props: Props) => { 
  React.useEffect(() => {  
    props.isSavePlayDeck.then((isSavePlayDeck:boolean) => {
      if(isSavePlayDeck) saveData()
    })
  });

  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchActiveItem, setSearchActiveItem] = useState('')
  const [selectedSearchItem, setSelectedSearchItem] = useState('')

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'てもいいです か? Mite ',
      deckImg: cardDeck,
      profileImg: jojo,
      ratingCount: 3,
      requireUpgrade: true,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'てもいいですか?',
      deckImg: cardDeck,
      profileImg: jojo,
      ratingCount: 4,
      requireUpgrade: false,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'こんにちは私 はあなた mite',
      deckImg: cardDeck,
      profileImg: jojo,
      ratingCount: 5,
      requireUpgrade: true,
    },
  ];
  
  const videDeckData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2',
      title: 'てもいいです か? Mite ',
      deckImg: videoDeckImg,
      profileImg: jojo,
      ratingCount: 3,
      requireUpgrade: true,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa9',
      title: 'てもいいですか?',
      deckImg: videoDeckImg,
      profileImg: jojo,
      ratingCount: 4,
      requireUpgrade: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-1471e29d72',
      title: 'こんにちは私 はあなた mite',
      deckImg: videoDeckImg,
      profileImg: jojo,
      ratingCount: 5,
      requireUpgrade: false,
    },
  ];

  const searchDataList = [
    {
      id: 'bd7acbea-c1b1-46c2-ad5-3a53abb28ba',
      title: 'Casual',
      deckCount: 7
    },
    {
      id: '3ac68afc-c605-4d3-a4f8-fbd91aa97f63',
      title: 'Formal',
      deckCount: 26
    },
    {
      id: '586940f-3a1-471f-bd96-145571e29d72',
      title: 'Kids',
      deckCount: 29
    },
    {
      id: '58694a0f-3da-471f-bd96-145571e2972',
      title: 'Situational',
      deckCount: 30
    },
    {
      id: '5869a0f-3da-471f-b96-145571e2d72',
      title: 'Music',
      deckCount: 57
    },
    {
      id: '5869a0f-3da1-471f-bd96-14571e9d72',
      title: 'TV Shows',
      deckCount: 22
    },
  ];

  const saveData = () => {
    console.log('save button clicked in homepage')
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
            {item.requireUpgrade && 
              <View style={styles.upgradeBtnContainer}>                
                <TouchableOpacity style={styles.upgradeBtn} onPress={()=> handleNavigate('upgradeAccount')}>
                  <Image source={upgradeBtnIcon} style={styles.upgradeBtnIcon} />
                  <Text style={styles.upgradeBtnTxt}>Upgrade</Text>
                </TouchableOpacity>
              </View>
            }
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

             {item.requireUpgrade && 
              <View style={styles.upgradeBtnContainer}>                
                <TouchableOpacity style={styles.upgradeVideoBtn} onPress={()=> handleNavigate('upgradeAccount')}>
                  <Image source={upgradeBtnIcon} style={styles.upgradeVideoBtnIcon} />
                  <Text style={styles.upgradeVideoBtnTxt}>Upgrade</Text>
                </TouchableOpacity>
              </View>
            }  
      </ImageBackground>
    </TouchableOpacity>
  );

  const gotoAddDeck = () => {
    handleNavigate('selectdeckType')
  }

  const renderSearchListContent = () => {
    return (
      searchDataList.map((item, index) => {
        return (
          <TouchableOpacity 
            onPress={() => setSelectedSearchItem(item.id)}
            style={[styles.searchListItem, selectedSearchItem == item.id && styles.selectedItem]} key={index}>
            <View style={styles.itemTextContainer}>
              <Text style={[styles.searchItemTitle, selectedSearchItem == item.id && styles.selectedItemTxt]}>{item.title}</Text>
              <Text style={[styles.searchItemDeckCount, selectedSearchItem == item.id && styles.selectedItemTxt]}>{item.deckCount} Decks</Text>
            </View>
            <View style={styles.itemImgContainer}>
              <Image source={selectedSearchItem == item.id ? searchItemActiveIcon : searchItemIcon} style={styles.searchItemIcon} />
            </View>
          </TouchableOpacity>
        )
      })
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <Text style={styles.headerTxt}>A better way to study Japanese</Text>
          <View style={styles.searchContent}>
            <TouchableOpacity onPress={()=>setShowSearchModal(true)}>
              <Image source={searchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
            <TextInput 
              placeholder="Search" 
              placeholderTextColor={'#968FA4'}
              style={styles.searchTxt}/>
              <TouchableOpacity onPress={()=>setShowSearchModal(true)}>
                <Image source={searchSettingIcon} style={styles.searchSettingIcon} />
              </TouchableOpacity>
          </View>
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
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={addIcon}
          centerIconPress={gotoAddDeck}
          />

        <Modal
            animationType="slide"
            transparent={true}
            visible={showSearchModal}
            onRequestClose={() => {
              setShowSearchModal(false);
            }}
          >
          <View style={styles.searchModalContainer}>            
            <View style={styles.searchModalContent}>
              <TouchableOpacity style={styles.closeModalContainer} onPress={()=>setShowSearchModal(false)}>
                <Image source={searchLialogListIcon} style={styles.closeDialogIcon} />
              </TouchableOpacity>
              <Text style={styles.searchModalTitle}>Find the perfect deck</Text>
              <ScrollView style={styles.container}>
                <View style={styles.searchScrollContainer}>
                  {renderSearchListContent()}
                </View>
                
              </ScrollView>
              
            </View>
          </View>
        </Modal>
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
  headerTxt: {
    marginTop: 55,
    color: 'white',
    fontSize: 30,
    lineHeight: 39,
    fontWeight: '700',
    maxWidth: 280
  },
  searchContent: {
    display: 'flex',
    borderWidth: 2,
    borderColor: '#A293BE',
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
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
    color: '#968FA4'
  },
  searchSettingIcon: {
    width: 29.6,
    height: 29.6,
    resizeMode: 'contain'
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
    position: 'relative',
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
  bottomNavbarIconContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative'
  },
  bottomNavbarIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor:'red',
    position: 'absolute',
    // bottom: -30,
    zIndex: 2222,
    marginBottom: -30
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
  upgradeBtnContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131215A6',
    padding: 4,
  },
  upgradeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#5ADBED',
    width: '100%',    
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    maxWidth: 183,
  },
  upgradeBtnIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain'
  },
  upgradeBtnTxt: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    color: 'white',
    paddingLeft: 11,
  },
  upgradeVideoBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#5ADBED',
    width: '100%',    
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 30,
    maxWidth: 183,
  },
  upgradeVideoBtnIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain'
  },
  upgradeVideoBtnTxt: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    color: 'white',
    paddingLeft: 18,
  },
  searchModalContainer: {
    flex: 1,
  },
  searchModalContent: {
    flex: 1,
    backgroundColor: '#312F36',
    padding: 25,
    paddingTop: 47,
    marginTop: 90,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
  },
  closeModalContainer: {
    alignItems: 'flex-end'
  },  
  closeDialogIcon : {
    width: 79,
    height: 67,
    resizeMode: 'cover'
  },
  searchModalTitle: {
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 31,
    color: '#ffffff',
    marginTop: 30,
  },
  searchListItem: {
    backgroundColor: '#1d1b21',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 50,
    marginTop: 37,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#FF8C22',
    backgroundColor: 'transparent'
  },
  itemTextContainer: {
    flex: 1,
    paddingLeft: 17,
    paddingRight: 10,
  },
  searchItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#FFFFFF69'
  },
  selectedItemTxt: {
    color: '#ffffff'
  },
  searchItemDeckCount: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    color: '#FFFFFF54'
  },
  itemImgContainer: {
   alignItems: 'center',
   justifyContent: 'center'
  },  
  searchItemIcon: {
    width: 30,
    height: 30,
    resizeMode: 'cover'
  },
  searchScrollContainer: {
    paddingBottom: 50,
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const Home = connect(mapStateToProps, { })(
  _Home
);

export default Home;
