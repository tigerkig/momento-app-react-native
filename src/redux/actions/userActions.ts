import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

export interface UserLoginAction{
    readonly type: 'ON_USER_LOGIN' | 'ON_USER_ERROR' | 'ON_USER_SIGN_UP' | 'ON_USER_SIGN_UP_FAILED',
    payload: object
}

export type UserAction = UserLoginAction;


export const OnUserLogin = (email: string, password: string) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {
        console.log('login')
        try {
            const auth = getAuth();
            let userData =  await signInWithEmailAndPassword(auth, email, password);

            if(userData != null) {              
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: {
                        userId: userData.user?.uid,
                        isLoggedIn: true
                    }
                })
                
                return true
            } 

            return false;
        } catch (error) {
           console.log(error)
        }
    }

}

export const OnUserSignup = (email: string, password: string) => {
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            const auth = getAuth();
            let userData =  await createUserWithEmailAndPassword(auth, email, password);

            if(userData != null) {
               const firestore = getFirestore();
               let user =  await setDoc(doc(firestore, "Users", userData.user?.uid), {
                    firstName: "plumber",
                    lastName: "red",
                    email: email
                })
                .catch((e) => {
                    dispatch({
                        type: 'ON_USER_ERROR',
                        payload: e.message
                    })    
                });
                dispatch({
                    type: 'ON_USER_SIGN_UP',
                    payload: {
                        userId: userData.user?.uid,
                        isLoggedIn: true
                    }
                    
                })
                return true
            } 
            else {
                return false
            }
        } catch (error) {
           console.log(error)
        }
    }
}

export const OnUserSignupWithGoogle = (userId: string, email: string, firstName: string, phoneNumber: string) => {
    return async ( dispatch: Dispatch<UserAction>) => {

        try {           
            const firestore = getFirestore();
            let user =  await setDoc(doc(firestore, "Users", userId), {
                firstName: firstName,
                lastName: "",
                email: email,
                phoneNumber: phoneNumber
            });
            dispatch({
                type: 'ON_USER_SIGN_UP',
                payload: {
                    userId: userId,
                    isLoggedIn: true
                }
            })
        } catch (error) {
           console.log(error)
        }
    }
}


export const userLogout = () => {
    console.log("aaaaaaaaaaaaaaaaaa")
    return async ( dispatch: Dispatch<UserAction>) => {
        console.log("&&&&&&&&&&&&")
        try {
                     
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: {
                        userId: '',
                        isLoggedIn: true
                    }
                })
                console.log("$$$$")
                return true
        } catch (error) {
           console.log(error,"$$$$$$$$$$")
        }
    }

}

