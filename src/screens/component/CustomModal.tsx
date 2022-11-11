import React from "react";
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
  Modal,
  Alert
} from "react-native";

import { MaterialIcons} from '@expo/vector-icons'; 


const totalStars = 5;

function CustomModal({ modalVisible, modalIcon, renderModalTxtContent, modalSubTxt, primaryBtnTxt, cancelBtnTxt , 
  isRating, ratingVal,  primaryAction, cancelAction }: 
  {
    modalVisible: boolean, 
    modalIcon: object,
    renderModalTxtContent: Function,
    modalSubTxt: string,
    primaryBtnTxt: string,
    cancelBtnTxt: string,
    isRating: boolean,
    ratingVal: number,
    primaryAction: Function,
    cancelAction: Function
  }) { 
    
   const renderStarIcon = () => {
    return (
        <View style={styles.starContainer}>
          <View style={styles.starContent}>
            {
              Array.from({length: ratingVal}, (x, i) => {
              return(
                <MaterialIcons key={i} name="star" size={32} color="#FFA000"/>
                
              )
              })
            }
            {
              Array.from({length: totalStars - ratingVal}, (x, i) => {
              return(
                <MaterialIcons key={i} name="star-border" size={32} color="#F4F4F4" />
              )
              })
            }
          </View>
        </View>
      )
   }

  return (   
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {isRating ?
            renderStarIcon()
          : <Image source={modalIcon} style={styles.imgIcon} />
          }
          <View style={styles.modalTextContent}>
            {renderModalTxtContent()}
          </View>
          {modalSubTxt && 
            <Text style={styles.modalSubTxt}>{modalSubTxt}</Text>
          }
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelAction()}>
              <Text style={styles.btnTxt}>{cancelBtnTxt}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => primaryAction()}>
              <Text style={styles.btnTxt}>{primaryBtnTxt}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    maxWidth: 260,
    maxHeight: 240,
    backgroundColor: '#343434',
    borderRadius: 10,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgIcon: {
    marginTop: 10,
    height: 58,
    resizeMode: 'contain'
  },
  modalTextContent: {
    marginTop: 19,
    marginBottom: 9,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 19,
  },
  modalSubTxt: {
    fontSize:12,
    fontWeight: '500',
    color: '#ffffffE6',
    textAlign: 'center'
  },
  cancelBtn: {
    width: 112,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A293BE',
    marginRight: 10,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: 'white'
  },
  primaryBtn: {
    width: 112,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5ADBED',
    borderRadius: 5,
  },
  starContainer: {
    paddingTop: 8,
    paddingRight: 4,
    marginTop: 20,
  },
  starContent: {
    flexDirection : "row",    
    paddingRight: 3,
    paddingLeft: 3,
    borderRadius: 24,
  },
})

export default CustomModal ;