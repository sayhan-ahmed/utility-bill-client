import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // 🔹 Create account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login with email & password
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login with Google
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // 🔹 Logout
  const logOut = () => {
    return signOut(auth);
  };

  // 🔹 Reset Password
  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // 🔹 Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // 🔹 Watch authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    logIn,
    googleSignIn,
    logOut,
    resetPass,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
