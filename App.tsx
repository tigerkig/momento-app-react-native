import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Main from "./src/navigation/";
import { store } from "./src/redux";
import { Provider } from "react-redux";
import { MyGlobalContext } from "./src/context/index";
import { AccountInfo } from "./src/types";

import { initializeApp } from 'firebase/app';
import apiKeys from './config/keys';

initializeApp(apiKeys.firebaseConfig);

export default function App() {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  return (
    <>
      <Provider store={store}>
        <MyGlobalContext.Provider value={{ accountInfo, setAccountInfo }}>
          <Main />
        </MyGlobalContext.Provider>
      </Provider>
    </>
  );
}



