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
import maximumTrackImage from "../../assets/common/maximumTrackImage.png"
import minimumTrackImage from "../../assets/common/minimumTrackImage.png"
import repeatActiveIcon from "../../assets/common/repeatActiveIcon.png";
import repeatDeactiveIcon from "../../assets/common/repeatDeactiveIcon.png";

import { NavigationScreenProp } from "react-navigation";
import { HomeOption } from "../../types";
import { MaterialIcons ,AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import {ApplicationState} from "../../redux";
import BottomNavigator from "../component/BottomNavigator";
import centerSaveIcon from '../../assets/common/centerSaveIcon.png'
import Carousel from 'react-native-reanimated-carousel';
import Slider from '@react-native-community/slider';

const totalStars = 5;
const deviceWidth = Dimensions.get('window').width;

interface Props {
  options: [HomeOption];
  navigation: NavigationScreenProp<any, any>;
  userReducer: object;
  isSavePlayDeck: any
}

const _DeckCardRatingSetting: React.FC<Props> = (props: Props) => { 
 
  const [isRepeat, setIsRepeat] = useState(false)

  const handleNavigate = (screen: string): void => {
    props.navigation.navigate(screen);
  };

   
  const centeralIconClicked = () => {
    handleNavigate('playDeck')
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <ScrollView style={styles.contentContainer}>  
          <View style={[styles.spaceBetweenRow, styles.titleWithBack]}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={31} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.marginBottom80}>
            <View style={styles.marginTop18}>
              <Text style={styles.titleTxt}>
                Adjust how often you see cards appear
              </Text> 
              <View style={styles.cardRateSetContent}>
                <Text style={styles.subTitle}>Frequency interval</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                      style={styles.progressSlider}
                      minimumValue={5}
                      maximumValue={25}
                      value={15}                    
                      minimumTrackTintColor={'#FFF960'}
                      maximumTrackTintColor={'#1C1F2C'}
                      trackImage={maximumTrackImage}
                      maximumTrackImage={maximumTrackImage}
                      minimumTrackImage={minimumTrackImage}
                      thumbTintColor={'#FFF96058'}
                    />
                  <Image source={happyIcon} style={styles.cardRateIcon} />
                </View>
                <View style={styles.cardRateTxtContainer}>
                  <Text style={styles.cardRateTxt}>5</Text>
                  <Text style={styles.cardRateTxt}>10</Text>
                  <Text style={styles.cardRateTxt}>15</Text>
                  <Text style={styles.cardRateTxt}>20</Text>
                  <Text style={styles.cardRateTxt}>25</Text>
                </View>
              </View>
              <View style={styles.cardRateSetContent}>
                <Text style={styles.subTitle}>Frequency interval</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                      style={styles.progressSlider}
                      minimumValue={5}
                      maximumValue={25}
                      value={15}                    
                      minimumTrackTintColor={'#FFF960'}
                      maximumTrackTintColor={'#1C1F2C'}
                      trackImage={maximumTrackImage}
                      maximumTrackImage={maximumTrackImage}
                      minimumTrackImage={minimumTrackImage}
                      thumbTintColor={'#FFF96058'}
                    />
                  <Image source={hardIcon} style={styles.cardRateIcon} />
                </View>
                <View style={styles.cardRateTxtContainer}>
                  <Text style={styles.cardRateTxt}>5</Text>
                  <Text style={styles.cardRateTxt}>10</Text>
                  <Text style={styles.cardRateTxt}>15</Text>
                  <Text style={styles.cardRateTxt}>20</Text>
                  <Text style={styles.cardRateTxt}>25</Text>
                </View>
              </View>
              <View style={styles.cardRateSetContent}>
                <Text style={styles.subTitle}>Frequency interval</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                      style={styles.progressSlider}
                      minimumValue={5}
                      maximumValue={25}
                      value={15}                    
                      minimumTrackTintColor={'#FFF960'}
                      maximumTrackTintColor={'#1C1F2C'}
                      trackImage={maximumTrackImage}
                      maximumTrackImage={maximumTrackImage}
                      minimumTrackImage={minimumTrackImage}
                      thumbTintColor={'#FFF96058'}
                    />
                  <Image source={notHappyIcon} style={styles.cardRateIcon} />
                </View>
                <View style={styles.cardRateTxtContainer}>
                  <Text style={styles.cardRateTxt}>5</Text>
                  <Text style={styles.cardRateTxt}>10</Text>
                  <Text style={styles.cardRateTxt}>15</Text>
                  <Text style={styles.cardRateTxt}>20</Text>
                  <Text style={styles.cardRateTxt}>25</Text>
                </View>
              </View> 
              <View style={styles.repeatContent}>
                <Text style={styles.repeatTxt}>Repeat : </Text>
                <TouchableOpacity onPress={()=>setIsRepeat(!isRepeat)}>
                  <Image source={isRepeat ? repeatActiveIcon :repeatDeactiveIcon} style={styles.repeatIcon} />
                </TouchableOpacity>
              </View>
              <Text style={styles.confirmTxt}>Make sure you save any changes</Text>
            </View>    
          </View>
        </ScrollView>
        <BottomNavigator 
          navigation={props.navigation} 
          centerIcon={centerSaveIcon}
          centerIconPress={centeralIconClicked}
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
  marginTop18: {
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBottom80: {
    marginBottom: 80,
  },
  titleTxt: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 39,
    color: '#F4F4F4',
    textAlign: 'center',
    maxWidth: 287,
  },
  cardRateSetContent: {
    padding: 23,
    marginTop: 15,
    backgroundColor: '#393D51',
    borderRadius: 12,
    width: deviceWidth - 50
  }, 
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    color: '#ffffff',
  }, 
  sliderContainer: {
    marginTop: 25,
    flexDirection: 'row',
    marginBottom: 15,
  },
  progressSlider: {
    flex: 1,
    marginLeft: -15
  },
  cardRateIcon: {
    width: 39,
    height: 39,
    resizeMode: 'contain'
  }, 
  cardRateTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 55,
  },
  cardRateTxt: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: '#ffffff7D',    
  },
  repeatContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 33,
    backgroundColor: 'red',
    width: deviceWidth - 50
  }, 
  repeatTxt: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    color: '#EAEBF0',    
  },
  confirmTxt: {
    marginTop: 23,
    color: '#968FA4',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
  },
  repeatIcon: {
    width: 37,
    height: 37,
    resizeMode: 'contain'
  }
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  isSavePlayDeck: state.isSavePlayDeck
});

const DeckCardRatingSetting = connect(mapStateToProps, { })(
  _DeckCardRatingSetting
);

export default DeckCardRatingSetting;
