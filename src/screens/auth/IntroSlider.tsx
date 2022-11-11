import React, {useRef} from "react";
import { View, StyleSheet, Text, Image ,ScrollView , ImageBackground, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import AppIntroSlider from 'react-native-app-intro-slider';
import mainBg from "../../assets/mainBg.png";
import introsliderImg1 from "../../assets/signin/introsliderImg1.png";
import introslider2subBg from "../../assets/signin/appslider2subBg.png";
import introsliderImg3 from "../../assets/signin/introsliderImg3.png";
import indicator1 from "../../assets/signin/indicator1.png";
import indicator2 from "../../assets/signin/indicator2.png";
import indicator3 from "../../assets/signin/indicator3.png";
import { ButtonWithTitle } from "../../components/ButtonWithTittle/ButtonWithTitle";
import { primaryButtonColor, whiteColor } from "../../core";
import { color } from "react-native-reanimated";

const windowWidth = Dimensions.get('window').width;


interface IntroSliderProps {
  navigation: NavigationScreenProp<any, any>;
  ref: React.ForwardedRef<AppIntroSlider>;
}

const slides = [
  {
    key: 1,
    text1: null,
    goldText: null,
    text2: null,
    textSubdesc: null,
    title: 'Learn with Music, TV and Movies',
    image: introsliderImg1,
    titleBg: null,
    indicatorImg: indicator1,
    desc: "It's time to put down the textbooks",
    btnTxt: 'Next'
  },
  {
    key: 2,
    text1: 'Change the way you ',
    goldText: 'learn',
    text2: ' Japanese forever',
    textSubdesc: "Learn Japanese in a fun and interactive way – there's no other app like it!",
    title: 'Flashcards with a twist',
    image: null,
    titleBg: introslider2subBg,
    indicatorImg: indicator2,
    desc: ' Learn anywhere and anytime.',
    btnTxt: 'Next'
  },
  {
    key: 3,
    text1: null,
    goldText: null,
    text2: null,
    textSubdesc: null,
    title: 'Learn Japanese in a flash',
    image: introsliderImg3,
    titleBg: null,
    indicatorImg: indicator3,
    desc: "Get inspired by your favorite TV shows and music artists",
    btnTxt: 'Get Started'
  }
];

const IntroSlider: React.FC<IntroSliderProps> = ({ navigation, ref }) => {
  
  const sliderRef = useRef();

  const _renderItem = ({ item }: any) => {
    return (
      <View style={styles.slide} key={item.key}>
        {item.text1 && <ImageBackground source={item.titleBg} resizeMode="contain" >
            <Text style={styles.text1}>{item.text1} <Text style={[styles.text1, styles.goldTxt]}>{item.goldText}</Text> {item.text2}</Text>
          </ImageBackground>}
        {item.image && <Image source={item.image} style={styles.imgStyle}/>}
        {item.textSubdesc && <Text style={styles.textSubdesc}>{item.textSubdesc}</Text>}
        <Image source={item.indicatorImg} style={styles.indicatorImgStyle}/>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.descTxt}>{item.desc}</Text>
      </View>
    );
  }
  const _onDone = () => {
    navigation.navigate("Home");
  }
  const onTapAuthenticate = () => {
    console.log('on tab')
  }
 
  const _renderNextButton = () => {
    return (
      <View style={[styles.btn, styles.btnStyle]}>
        <Text style={styles.btnTxtStyle}>Next</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={[styles.btn, styles.btnStyle]}>
        <Text style={styles.btnTxtStyle}>Get Started</Text>
      </View>
    );
  };

  return (
    
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.mainImgBg}>
        <View style={styles.contentContainer}>    
          <AppIntroSlider 
            renderItem={_renderItem} 
            data={slides} 
            dotStyle={{display: 'none'}}
            activeDotStyle={{display: 'none'}}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            onDone={_onDone}/>
        </View>
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
    paddingTop: 60,
  },
  mainImgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  slide: {
    flex:1,
    paddingBottom: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 33,
    lineHeight: 44,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  textSubdesc: {
    fontSize: 20,
    lineHeight: 29,
    color: 'white',
    marginTop: 20,
  },
  descTxt: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 120,
    maxWidth: 270,
  },
  imgStyle: {
    flex: 1,
    width: (windowWidth - 50),
    maxHeight: 320,
    resizeMode: "contain",
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorImgStyle: {
    height: 6,
    resizeMode: 'contain',
    marginTop: 63,
  },
  startBtn: {
    backgroundColor: 'white',
    borderRadius: 60,
    marginTop: 30,
    marginBottom: 40,
  },
  btnTxt: {
    color: '#282c34',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 60,
    paddingVertical: 3,
  },
  desc: {
    color: '#282c34',
    textAlign: 'center' ,
    fontSize: 20,
  },
  btnStyle: {
    // backgroundColor: '#FFF960',
    borderRadius: 16,
    maxHeight: 83,
    height: 83,
    marginTop: 38,
    width: 226,
    // marginLeft: 25,
  },
  btnTxtStyle: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '700',
  },
  btn: {
    flex: 1,
    display: "flex",
    maxHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryButtonColor,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    right: (windowWidth - 316) / 2,
    bottom: 70,
  },
  text1: {
    fontSize: 50,
    lineHeight: 64,
    fontWeight: '700',
    color: '#ffffff'
  },
  goldTxt: {
    color: '#FE8E26'
  }
});

export default IntroSlider;
