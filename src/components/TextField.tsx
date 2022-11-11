/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { bgTextInputColor, blackTextColor } from "../core/theme/colors";

interface TextFieldProps {
  placeholder: string;
  isSecure?: boolean;
  imgIcon?: object;
  onTextChange: (text: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  isSecure = false,
  imgIcon,
  onTextChange,
}) => {
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    setIsPassword(isSecure);
  }, []);

  return (
    <View style={styles.container}>
      {imgIcon && <Image source={imgIcon} style={styles.imgIconStyle}/>}
      <TextInput
        autoCapitalize="none"
        secureTextEntry={isPassword}
        onChangeText={(text) => onTextChange(text)}
        style={styles.textField}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 77,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20,
    borderWidth: 2,
    borderColor: '#FFF9601A',
    color: 'white'
  },
  textField: {
    flex: 1,
    height: 77,
    fontSize: 14,
    color: 'white',
  },
  imgIconStyle: {
    width: 25,
    // height: 29,
    resizeMode: 'contain',
    alignItems: 'center',
    margin: 20,
  }
});
