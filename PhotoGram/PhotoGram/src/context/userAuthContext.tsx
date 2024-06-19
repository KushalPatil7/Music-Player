import { auth } from "@/firebaseConfig";
import Signup from "@/pages/signup";
import { GoogleAuthProvider, User, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { LogIn } from "lucide-react";
import { createContext } from "react";
import {useState} from "react";

interface UserAuthProviderProps{
    children: React.ReactNode;
}
type AuthContextData={
    user: User | null;
    logIn: typeof LogIn;
    signUp: typeof Signup;
    logOut:typeof logOut;
    googleSignIn: typeof googleSignIn;
}

const logIn=(email:string, password:string)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
const signUp=(email:string, password:string)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
const logOut=()=>{
    signOut(auth)
}

const googleSignIn=()=>{
    const googleAuthProvider= new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider);

}
export const userAuthContext= createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
})

export const UserAuthProvider: React.FunctionComponent<UserAuthProviderProps>=({children})=>{
    const {user,setUser}=useState<User|null>
    const value: AuthContextData={
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
    };
    return (
        <userAuthContext.Provider value={}>{children}</userAuthContext.Provider>
    )
};