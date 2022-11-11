import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {  Home ,SelectDeckType, LoginScreen} from "../screens/";
import CreateMediaDeck from "../screens/deck/createMediaDeck";
import CreateVideoDeck from "../screens/deck/createVideoDeck";
import CreateDeckCard from "../screens/deck/createDeckCard";
import Settings from "../screens/settings/Settings";
import UserProfile from "../screens/settings/UserProfile";
import Profile from "../screens/Profile";
import DeckDetail from "../screens/deck/deckDetail";
import VideoDeckDetail from "../screens/deck/videoDeckDetail";
import ContentCreatorProfile from "../screens/contentCreatorProfile";
import SavedDeck from "../screens/SavedDeck";
import PlayDeck from "../screens/deck/playDeck";
import DeckCardRatingSetting from "../screens/deck/DeckCardRateSetting";
import Downloads from "../screens/settings/Downloads";
import TermsAndConditions from "../screens/settings/TermsAndConditions";
import Privacy from "../screens/settings/Privacy";
import UpgradeAccount from "../screens/UpgradeAccount";
import UploadImages from "../screens/settings/UploadImages";
import UserManagement from "../screens/settings/UserManagement";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="selectdeckType"
        component={SelectDeckType}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createMediaDeck"
        component={CreateMediaDeck}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createVideoDeck"
        component={CreateVideoDeck}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createDeckCard"
        component={CreateDeckCard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="deckDetail"
        component={DeckDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="videoDeckDetail"
        component={VideoDeckDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="downloads"
        component={Downloads}
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen
        name="termsAndConditions"
        component={TermsAndConditions}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="privaty"
        component={Privacy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="uploadImg"
        component={UploadImages}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userManagement"
        component={UserManagement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contentCreatorProfile"
        component={ContentCreatorProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="savedDecks"
        component={SavedDeck}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="playDeck"
        component={PlayDeck}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="deckCardRateSetting"
        component={DeckCardRatingSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="upgradeAccount"
        component={UpgradeAccount}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
