import { UserAction } from "../actions";
import { UserModel, UserState } from "../models";
import AsyncStorage from "@react-native-async-storage/async-storage";

let currentUser = {
  userId: '',
  isLoggedIn: false
}
let initialState: object = currentUser ;

const UserReducer = async (state: object  = initialState, action: UserAction) => {

  // const curUser = await AsyncStorage.getItem('user')  

  const { type, payload } = action;
  switch (type) {
    case "ON_USER_LOGIN":
      AsyncStorage.setItem('user', JSON.stringify(payload))      
      return payload
    case "ON_USER_SIGN_UP":
      AsyncStorage.setItem('user', JSON.stringify(payload));
      return payload
    default:
      // return curUser? curUser : state;
    return state
  }
};

export { UserReducer };
