import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider, onAuthStateChanged,deleteUser} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signinWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    };

    const siginWithGithub = ()=>{
        signInWithPopup(auth,githubProvider);
    }
    const signoutUser = ()=>{
        signOut(auth);
    }
    const deleteAccount = async ()=>{
        deleteUser(user);
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signinWithGoogle,
            siginWithGithub,
            signoutUser,
            deleteAccount,
            }}>
            {children}
        </AuthContext.Provider>
    )
}